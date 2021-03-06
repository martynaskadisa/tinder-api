/* eslint-env node, mocha */
import expect from 'expect'
import TinderAPI from 'tinderapi'

const FACEBOOK_TOKEN = window.__env__['FACEBOOK_TOKEN']
const FACEBOOK_ID = window.__env__['FACEBOOK_ID']
const TINDER_TOKEN = window.__env__['TINDER_TOKEN']

describe('TinderAPI', () => {
  describe('auth', () => {
    it('should authorize with facebook token and id', done => {
      const client = new TinderAPI()

      client.auth(FACEBOOK_TOKEN, FACEBOOK_ID)
        .then(res => {
          expect(res.status).toBe(200)
          done()
        }).catch(e => done(e))
    })

    it('should throw error on POST with bad data', done => {
      const client = new TinderAPI()

      client.auth('Test_0', 'Test_1')
        .catch(e => {
          expect(e).toExist()
          done()
        })
    })

    it('should update xAuthToken and User on successful authorize', done => {
      const client = new TinderAPI()

      client.auth(FACEBOOK_TOKEN, FACEBOOK_ID)
        .then(res => {
          expect(client.me).toBe(res.data.user)
          expect(client.xAuthToken).toBe(res.data.token)
          done()
        }).catch(e => done(e))
    })
  })

  describe('getHistory', () => {
    it('should successfully get history', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getHistory()
        .then(res => {
          expect(res.status).toBe(200)
          done()
        }).catch(e => done(e))
    })
  })

  describe('getUpdates', () => {
    it('should successfully get updates', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getUpdates(Date.now())
        .then(res => {
          expect(res.status).toBe(200)
          done()
        }).catch(e => done(e))
    })

    it('should update last_activity_date on success', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getUpdates(Date.now())
        .then(res => {
          expect(client.lastActivityDate).toBe(res.data.last_activity_date)
          done()
        }).catch(e => done(e))
    })
  })

  describe('getRecommended', () => {
    it('should successfully get recommended', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getRecommended()
        .then(res => {
          expect(res.status).toBe(200)
          done()
        }).catch(e => done(e))
    })
  })

  describe('like', () => {
    it('should successfully like a user', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getRecommended()
        .then(res => {
          let { results } = res.data
          let id = results[0].user._id

          client.like(id)
            .then(res => {
              expect(res.status).toBe(200)
              done()
            }).catch(e => done(e))
        }).catch(e => done(e))
    })
  })

  describe('superLike', () => {
    it('should successfully superlike a user', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getRecommended()
        .then(res => {
          let { results } = res.data
          let id = results[0].user._id

          client.superLike(id)
            .then(res => {
              expect(res.status).toBe(200)
              done()
            }).catch(e => done(e))
        }).catch(e => done(e))
    })
  })

  describe('pass', () => {
    it('should successfully pass a user', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getRecommended()
        .then(res => {
          let { results } = res.data
          let id = results[0].user._id

          client.pass(id)
            .then(res => {
              expect(res.status).toBe(200)
              done()
            }).catch(e => done(e))
        }).catch(e => done(e))
    })
  })

  describe('sendMessage', () => {
    it('should successfully send a message to user', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.getHistory()
        .then(res => {
          let { matches } = res.data
          let id = matches[0]._id
          let message = 'What\'s up?'

          client.sendMessage(id, message)
            .then(res => {
              expect(res.status).toBe(200)
              done()
            }).catch(e => done(e))
        }).catch(e => done(e))
    })
  })

  describe('updateLocation', () => {
    it('should successfully update location', done => {
      const client = new TinderAPI({ xAuthToken: TINDER_TOKEN })

      client.updateLocation(54.681939, 25.273250)
        .then(res => {
          expect(res.status).toBe(200)
          done()
        }).catch(e => done(e))
    })
  })
})
