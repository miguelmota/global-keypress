var {spawn, spawnSync, exec, execSync} = require('child_process')
var fs = require('fs');
var util = require('util');
var events = require('events');
var isRoot = require('is-root');
var Tail = require('tail').Tail;

function Spy() {
  this.isSpawned = false;
  this.proc = null;
}

util.inherits(Spy, events.EventEmitter);

Spy.prototype.start = function() {

  // if called sudo directly
  if (isRoot()) {
    this.proc = spawn(__dirname + '/bin/globalkeypress-daemon');

    next.bind(this)()

  // otherwise prompt for sudo password
  } else {
    var outfile = 'events.log'
    fs.openSync(outfile, 'w')

    this.proc = spawn('tail', ['-f', 'events.log'])

    next.bind(this)()

    var cmd = '/usr/bin/osascript -e \'do shell script "' + __dirname + '/bin/globalkeypress-daemon > ' + outfile + ' &" with administrator privileges\'';

    var proc = exec(cmd)
  }


  function next() {
    this.isSpawned = true;

    this.proc.stdout.on('data', function(data) {
      var code = parseInt(data.toString(), 10)

      if (!isNaN(code)) {
        this.emit('press', {
          code: code
        })
      }
    }.bind(this));

    this.proc.stderr.on('data', function(data) {
      this.emit('error', data.toString());
    }.bind(this));

    this.proc.on('close', function(code) {
      this.emit('close', code);
    }.bind(this));
  }
}

Spy.prototype.stop = function() {

  if (!this.proc) {
    return;
  }

  this.proc.kill();
  this.isSpawned = false;
  killAll()
}

Spy.prototype.isRunning = function() {
  return this.isSpawned;
}

function killAll() {
  if (isRoot()) {
    exec('ps aux | grep global-keypress | awk \'{print $2}\' | xargs sudo kill')
  } else {
    var cmd = `/usr/bin/osascript -e "do shell script \\\"/bin/ps aux | grep global-keypress | awk '{print $2}' | xargs sudo kill\\\" with administrator privileges"`
    //var proc = execSync(cmd)
  }
}

process
.on('SIGINT', function() {
  killAll()
})
.on('uncaughtException', function() {
  killAll()
})

module.exports = Spy;
