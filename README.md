

# tinder-api-promise
### Please note, that this is still a work in progress so it only has a handful of features
A tinder api wrapper with promises.

Works in Node and in browser.

## Installation
`npm install tinder-api-promise`

## Example
```javascript
const TinderAPI = require('tinder-api-promise')
const client = new TinderAPI()

client.auth('<facebook_token>', '<facebook_id>')
  .then(() => {
    client.getRecommended()
      .then(res => {
        let { results } = res.data

        results.map(result => {
          client.like(result.user._id)
            .then(() => console.log('Liked a user'))
        })
      })
  })
```
or if you already have tinder auth token
```javascript
const TinderAPI = require('tinder-api-promise')
const client = new TinderAPI({
  xAuthToken: '<tinder-auth-token>'
})

client.getRecommended()
  .then(res => {
    let { results } = res.data

    results.map(result => {
      client.like(result.user._id)
        .then(() => console.log('Liked a user'))
    })
  })

```
## API
- #### Creating instance

  `TinderAPI( { options } )`

  Use default one
    ```javascript
  const client = new TinderAPI()

  ```

  or specify options object

  ```javascript
  const client = new TinderAPI({
    // If for whatever reason tinder decides to change their api url and I don't update the package
    baseURL: 'https://api.gotinder.com/',
    // Set custom headers or override default ones
    headers: {
      'User-agent': 'Tinder Android Version 4.5.5',
      'os_version': 23,
      'platform': 'android',
      'app-version': 1637,
      'Accept-Language': 'en',
      'Content-Type': 'application/json'
    },
    // This is set once the user is authorized.
    // You may also set this if you already have a tinder token
    xAuthToken: undefined,
    // Default request timeout
    timeout: 10000,
    // Used when getting updates
    lastActivityDate: moment().toISOString()
  })

  ```
- #### Authorizing
    `client.auth('<facebook_token>', '<facebook_id>')`

    Since, the old Facebook app method doesn't work, you can get Facebook token and id following [this link](https://www.google.com), opening devtools and look for `confirm?dpr=1` in the network tab. And then traverse the object till you find access token. ([Credits to Paul Xu](https://medium.com/@paulxuca/tinder-tales-or-the-search-for-tinders-new-api-4d3a36e2542#.kz8l8buqn))

    Or use tools like [tinderauth](https://github.com/tinderjs/tinderauth) or [tindercred](https://github.com/tinderjs/tindercred)

    ##### Example
    ```javascript
    const client = new TinderAPI()

    client.auth('<facebook_token>', '<facebook_id>')
      .then(res => {
        // Do stuff
      }).catch(e => console.log(e))
    ```

    If you already have tinder token, then you can skip authorizing and just specify X-Auth-Token in constructor.

    ##### Example
    ```javascript
  const client = new TinderAPI({ xAuthToken: '<tinder-token>' })

  // Do stuff
    ```

- #### Get recommended
    `client.getRecommended()`

    Gets a list of recommended people

    ##### Example
    ```javascript
    const client = new TinderAPI()

    client.auth('<facebook_token>', '<facebook_id>')
      .then(() => {
        client.getRecommended()
          .then(res => {
            // Do stuff
          })
      }).catch(e => console.log(e))
    ```

    #### More coming soon
