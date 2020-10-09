# install
```
npm install hexabase-sdk
```

# Sample
## node.js
```
const { Hexabase, HexabaseSdkOptions, HexabaseSdkError } = require('hexabase-sdk');

const options = {
  host: 'localhost',
  port: 7575,
  path: '/api/v0'
};
const hexa = new Hexabase(options);
hexa.login('hexauser1@example.com', 'password').then((res) => {
  console.info(`token:${res}`);
}).catch((e) => {
  if (e instanceof HexabaseSdkError) {
    console.error(`hexabase sdk error:${e}`);
  } else {
    console.error(`error:${e}`);
  }
})
```

## vue.js
```
import { Hexabase } from 'hexabase-sdk'
const options = {
  path: '/linker-api/api/v0'
}
const hexa = new Hexabase(options)
hexa.login('hexauser1@example.com', 'password').then((res) => {
  console.info(`token:${res}`)
}).catch((e) => {
  if (e instanceof HexabaseSdkError) {
    console.error(`hexabase sdk error:${e}`)
  } else {
    console.error(`error:${e}`)
  }
})
```

set proxy
```
module.exports = {
  dev: {
    proxyTable: {
      "/linker-api/": {
        target: "http://localhost:7575",
        pathRewrite: {
          "^/linker-api": ""
        },
        logLevel: "debug"
      }
    }
  }
}
```
