var fs = require('fs')
var util = require('util')
var events = require('events')
var cp = require('child_process')
var tmp = require('tmp')
var mkdirp = require('mkdirp')

var spawn = cp.spawn
var spawnSync = cp.spawnSyncn
var exec = cp.exec
var execSync = cp.execSync

var platform = process.platform
var isMac = /darwin/gi.test(platform)
var isLinux = /linux/gi.test(platform)
var isRoot = (process.getuid && process.getuid() === 0)

function Spy() {
  this.isSpawned = false
  this.proc = null
}

util.inherits(Spy, events.EventEmitter)

Spy.prototype.start = function() {
  var binfile = __dirname + '/bin/globalkeypress'
  var logfile = '/var/log/globalkeypress.log'
  var createLogfile = 'mkdir -p /var/log; touch ' + logfile + '; chmod 777 ' + logfile + ';';

  if (isMac) {
    var alreadyRunning = false

    var psaux = execSync('ps aux | grep "[g]lobalkeypress" || echo 0').toString().trim()
    var alreadyRunning = (psaux !== '0')

    if (!alreadyRunning) {
      // if called sudo directly
      if (isRoot) {
        exec('bash -c "' + createLogfile + binfile + ' > ' + logfile + ' &"')

      // otherwise prompt for sudo password
      } else {
        var cmd = '/usr/bin/osascript -e \'do shell script "bash -c \\\"' + createLogfile + binfile + ' > ' + logfile + ' &\\\"" with administrator privileges\''

        exec(cmd)
      }
    }

    this.proc = spawn('tail', ['-f', logfile])
    next.bind(this)()
  } else if (isLinux) {
    if (isRoot) {
      var fd = fs.openSync(outfile, 'w')

      var p = exec(binfile + ' --logfile=' + logfile)

      this.proc = spawn('tail', ['-f', logfile])

      next.bind(this)()
    } else {
      var fd = fs.openSync(logfile, 'w')

      var paths = [
        '/usr/bin/pkexec',
        '/usr/bin/kdesudo',
        '/usr/bind/gksudo'
      ]

      var pathIndex = -1;

      for (var i = 0; i < paths.length; i++) {
        try {
          if (fs.statSync(paths[i])) {
            pathIndex = i
            break
          }
        } catch(error) {

        }
      }

      var bin = paths[pathIndex]

      var cmd = __dirname + '/bin/globalkeypress --logfile=' + logfile

      if (/pkexec/gi.test(bin)) {
        cmd = bin + ' --disable-internal-agent ' + cmd
      } else if (/kdesudo/gi.test(bin)) {
        cmd = bin + ' --comment "System needs administrative privileges. Please enter your password."' + cmd
      } else if (/gksudo/gi.test(bin)) {
        cmd = bin + ' --preserve-env --sudo-mode --description "System" ' + cmd
      } else {
        return console.error('Supported prompt not found')
      }

      var p = exec(cmd)

      this.proc = spawn('tail', ['-f', logfile])

      next.bind(this)()
    }
  } else {
    console.error('No support for this platform')
  }

  function next() {
    this.isSpawned = true

    this.proc.stdout.on('data', function(data) {
      var key = data.toString().trim()

      if (key !== '') {
        this.emit('press', {
          data: key
        })
      }
    }.bind(this))

    this.proc.stderr.on('data', function(data) {
      this.emit('error', data.toString())
    }.bind(this))

    this.proc.on('close', function(code) {
      this.emit('close', code)
    }.bind(this))
  }
}

Spy.prototype.stop = function() {

  if (!this.proc) {
    return
  }

  this.proc.kill()
  this.isSpawned = false
  killAll()
}

Spy.prototype.isRunning = function() {
  return this.isSpawned
}

function killAll() {
  if (isRoot) {
    //exec('ps aux | grep global-keypress | awk \'{print $2}\' | xargs sudo kill')
  } else {
    if (isMac) {
      var cmd = `/usr/bin/osascript -e "do shell script \\\"/bin/ps aux | grep global-keypress | awk '{print $2}' | xargs sudo kill\\\" with administrator privileges"`
      //var proc = execSync(cmd)
    }
  }
}

process
.on('SIGINT', function() {
  killAll()
})
.on('uncaughtException', function() {
  killAll()
})

module.exports = Spy
