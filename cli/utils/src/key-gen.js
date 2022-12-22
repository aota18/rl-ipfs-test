'use strict'
const crypto = require('crypto')

const appKey = crypto.randomBytes(32).toString('base64')

console.log(`App key generated. You can use this on .env`)

console.log(`APP_KEY=base64:${appKey}`)

console.log('')
console.log('')
