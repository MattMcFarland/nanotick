var assert = require('assert')

module.exports = nanotick

// Process.nextTick() batching ulity
// null -> fn(any) -> fn(any)
function nanotick () {
  var callbacks = []
  var interval = false

  return function tick (cb) {
    assert.equal(typeof cb, 'function', 'nanotick.tick: cb should be a function')

    var isAsync = false

    executeAsync(function () { isAsync = true })

    return function wrappedTick () {
      var length = arguments.length
      var args = []
      for (var i = 0; i < length; i++) {
        args.push[arguments[i]]
      }

      if (isAsync) {
        cb.apply(cb, arguments)
      } else {
        executeAsync(function () {
          cb.apply(cb, arguments)
        })
      }
    }
  }

  function executeAsync (cb) {
    if (interval) return callbacks.push(cb)

    interval = true
    process.setTimeout(function () {
      var length = callbacks.length
      for (var i = 0; i < length; i++) {
        callbacks[i]()
      }
      interval = false
    }, 0)
  }
}
