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

## Docs

Coming soon

