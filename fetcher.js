const request = require('request');
const fs = require('fs')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`URL: `, (url) => {
  rl.question(`File Path: `, (path) => {
    request(url, (error, response, body, output) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      fs.writeFile(path, body, err => {
        if (err) {
          console.error(`ERROR: `, err)
          return
        }else{
          callback(path, body);
        }
      })
    });
    rl.close()
  });
});

const callback = function(path, body) {
  console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
};