var fs = require('fs');
var util = require('util');
var events = require('events');
var cp = require('child_process')
var tmp = require('tmp');

var spawn = cp.spawn;
var spawnSync = cp.spawnSyncn
var exec = cp.exec
var execSync = cp.execSync

var isRoot = (process.getuid && process.getuid() === 0)

function Spy() {
  this.isSpawned = false;
  this.proc = null;
}

util.inherits(Spy, events.EventEmitter);

Spy.prototype.start = function() {

  // if called sudo directly
  if (isRoot) {
    this.proc = spawn(__dirname + '/bin/globalkeypress-daemon');

    next.bind(this)()

  // otherwise prompt for sudo password
  } else {
    var tmpobj = tmp.fileSync()
    var outfile = tmpobj.name

    var fd = fs.openSync(outfile, 'w')

    this.proc = spawn('tail', ['-f', outfile])

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
  if (isRoot) {
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
