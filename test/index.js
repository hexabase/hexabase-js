const { Hexabase, HexabaseSdkOptions, HexabaseSdkError } = require('../dist/index.js');

const options = {
  host: 'localhost',
  port: 7575,
  path: '/api/v0',
  // debug: true
};
const hexa = new Hexabase(options);
console.info('call login api')
hexa.login('r.asai+hbc11@b-eee.com', 'password').then((res) => {
  console.info(`success res:${res}`)
}).catch((e) => {
  if (e instanceof HexabaseSdkError) {
    console.error(`hexabase sdk error:${e}`)
  } else {
    console.error(`error:${e}`)
  }
})
