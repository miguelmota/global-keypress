# global-keypress

> Global key press event emitter

NOTE: requires sudo privileges. GUI prompt will appear asking for sudo access if not running as root.

Supports Mac OS X and Linux.

Pull Requests are welcomed : )

## Install

```shell
npm install global-keypress
```

## Development

compile native module

```bash
npm run compile
```

## Usage

```js
const GK = require('global-keypress');

// instantiate
const gk = new GK();

// launch keypress daemon process
gk.start();

// emitted events by process
gk.on('press', data => {
  console.log(data);

  // example output
  /*
  { data: 'a' }
  { data: 'b' }
  { data: '1' }
  { data: '2' }
  { data: '<RShift>' }
  { data: 'A' }
  { data: 'B' }
  { data: '!' }
  { data: '@' }
  { data: '[released <RShift>]' }
  { data: '<Enter>' }
  */
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
gk.stop();
```

## Resources

- [Receiving, Filtering, and Modifying Key Presses and Releases](http://osxbook.com/book/bonus/chapter2/alterkeys/)

- [SKeylogger](https://github.com/gsingh93/simple-key-logger)

<!--
https://bitbucket.org/cabalistic/ogredeps/src/a623a62ae85c/src/ois/src/?at=default
http://stackoverflow.com/questions/10734349/simulate-keypress-for-system-wide-hotkeys
https://github.com/depp/keycode
-->

## License

MIT
