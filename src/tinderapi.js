const moment = require('moment')
const axios = require('axios')

const config = {
  baseURL: 'https://api.gotinder.com/',
  headers: {
    'User-agent': 'Tinder Android Version 4.5.5',
    'os_version': 23,
    'platform': 'android',
    'app-version': 1637,
    'Accept-Language': 'en',
    'Content-Type': 'application/json'
  },
  xAuthToken: undefined,
  timeout: 10000,
  lastActivityDate: moment().toISOString()
}

class TinderAPI {
  constructor (options = {}) {
    this.baseURL = options.baseURL ? options.baseURL : config.baseURL
    this.headers = options.headers ? options.headers : config.headers
    this.xAuthToken = options.xAuthToken ? options.xAuthToken : config.xAuthToken
    this.timout = options.timout ? options.timout : config.timeout
    this.lastActivityDate = options.lastActivityDate ? options.lastActivityDate : config.lastActivityDate
    this.me = undefined

    this.request = axios.create({
      baseURL: this.baseURL,
      timeout: this.timout,
      headers: this.headers
    })
  }

  auth (facebook_token, facebook_id) {
    let data = { facebook_token, facebook_id }
    return this.request.post('/auth', data)
      .then(res => {
        let { token, user } = res.data
        this.xAuthToken = token
        this.me = user

        return Promise.resolve(res)
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  }

  getHistory () {
    return this.request.post(
      '/updates',
      { last_activity_date: '' },
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    ).then(res => {
      return Promise.resolve(res)
    }).catch(e => Promise.reject(e))
  }

  getUpdates (last_activity_date = this.lastActivityDate) {
    return this.request.post(
      '/updates',
      { last_activity_date: moment(last_activity_date).toISOString() },
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    ).then(res => {
      let { last_activity_date } = res.data

      this.lastActivityDate = last_activity_date

      return Promise.resolve(res)
    }).catch(e => Promise.reject(e))
  }

  getRecommended () {
    return this.request.get(
      '/user/recs',
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  like (_id) {
    return this.request.get(
      `/like/${_id}`,
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  superLike (_id) {
    return this.request.post(
      `/like/${_id}/super`,
      undefined,
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  pass (_id) {
    return this.request.get(
      `/pass/${_id}`,
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  sendMessage (_id, message) {
    return this.request.post(
      `/user/matches/${_id}`,
      { message },
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  updateLocation (lat, lon) {
    return this.request.post(
      '/user/ping',
      { lat, lon },
      { headers: { 'X-Auth-Token': this.xAuthToken } }
    )
  }

  // TODO: reportUser,
  // TODO: updateProfile,
}

module.exports = TinderAPI
