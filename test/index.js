const GK = require('../index');
//const GK = require('global-keypress');

// instantiate
const gk = new GK();

// launch keypress daemon process
gk.start();

// listen to global keypress events
gk.on('press', data => {
  console.log(data);
});

// process error
gk.on('error', error => {
  console.error(error);
});

// process closed
gk.on('close', () => {
  console.log('closed');
});

// manual stop
setTimeout(function() {
  //gk.stop();
}, 2000)
