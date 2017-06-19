var fs = require('fs')
var util = require('util')
var events = require('events')
var cp = require('child_process')
var mkdirp = require('mkdirp')

var spawn = cp.spawn
var spawnSync = cp.spawnSyncn
var exec = cp.exec
var execSync = cp.execSync

var platform = process.platform
var isMac = /darwin/gi.test(platform)
var isLinux = /linux/gi.test(platform)
var isRoot = (process.getuid && process.getuid() === 0)

function KeyLogger() {
  this.isSpawned = false
  this.proc = null
}

util.inherits(KeyLogger, events.EventEmitter)

KeyLogger.prototype.start = function() {
  var binfile = __dirname + '/bin/globalkeypress'
  var logfile = '/var/log/globalkeypress.log'
  var createLogfile = 'mkdir -p /var/log; touch ' + logfile + '; chmod 777 ' + logfile + ';';

  var alreadyRunning = false

  var psaux = execSync('ps aux | grep "[g]lobalkeypress" || echo 0').toString().trim()
  var alreadyRunning = (psaux !== '0')

  if (isMac) {
    if (!alreadyRunning) {
      var cmd = createLogfile + binfile + ' > ' + logfile + ' &'

      // if called sudo directly
      if (isRoot) {
        exec('bash -c "' + cmd + '"')

      // otherwise prompt for sudo password
      } else {
        cmd = '/usr/bin/osascript -e \'do shell script "bash -c \\\"' + cmd + '\\\"" with administrator privileges\''

        exec(cmd)
      }
    }

    // tail logfile
    this.proc = spawn('tail', ['-f', logfile])
    next.bind(this)()

  } else if (isLinux) {
    if (!alreadyRunning) {
      var cmd = createLogfile + binfile
      cmd = 'bash -c "' + cmd + '"'

      // if called sudo directly
      if (isRoot) {
        exec(cmd)

        // otherwise prompt for sudo password
      } else {
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

        if (/pkexec/gi.test(bin)) {
          cmd = bin + ' --disable-internal-agent ' + cmd
        } else if (/kdesudo/gi.test(bin)) {
          cmd = bin + ' --comment "System needs administrative privileges. Please enter your password."' + cmd
        } else if (/gksudo/gi.test(bin)) {
          cmd = bin + ' --preserve-env --sudo-mode --description "System" ' + cmd
        } else {
          console.error('Supported prompt not found')
          return false
        }

        exec(cmd)
      }
    }

    // tail logfile
    this.proc = spawn('tail', ['-f', logfile])
    next.bind(this)()
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

KeyLogger.prototype.stop = function() {

  if (!this.proc) {
    return
  }

  this.proc.kill()
  this.isSpawned = false
  killAll()
}

KeyLogger.prototype.isRunning = function() {
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

module.exports = KeyLogger
