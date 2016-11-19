"use strict";
let Ivona = require('ivona-node');
let app = require('express')();
let bodyParser = require('body-parser');

let ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

app.use(bodyParser.json());

app.get('/speak', (req, res) => {
  if (req.query.name && req.query.phoneme) {
    ivona.createVoice(undefined, {
      body: {
        voice: {
          name: 'Salli',
          language: 'en-US',
          gender: 'Female'
        },
        Input: {
          Type: 'application/ssml+xml',
          // Data: '<phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>',
          Data: `<phoneme alphabet="ipa" ph="${req.query.phoneme}">${req.query.name}</phoneme>`,
        },
      },
    }).pipe(res);
  } else {
    res.status(400).send({error: "Please send name and phoneme keys in the body."});
  }
});

app.listen(process.env.PORT || 8001);
