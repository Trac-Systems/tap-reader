# Trac Core Tap-Reader

## Instructions

```bash
// channel pubkey parameter is optional, uses config/default.json 
npm start 
// or
node src/index.mjs [channel]
```

> Channel "53d2e64fa7a09e9dc74fc52ee9e9feb9d59b3e2cff4a25dfb543ec3b0bf4b281" is the currently active one for TAP Protocol.

## Note

Installing with `npm i` triggers the postinstall script, which patches hypercore library.

```js
"scripts": {
    "postinstall": "patch-package"
},
```
