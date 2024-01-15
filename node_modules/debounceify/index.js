module.exports = function debounce (worker, context = null) {
  let running = null

  return async function debounced () {
    if (running !== null) {
      try {
        await running
      } catch (_) {
        // ignore - do not fail on old errors
      }
    }

    // another "thread" beat us to it, just piggy pack on that one
    if (running !== null) return running

    running = worker.call(context)

    try {
      return await running
    } finally {
      running = null
    }
  }
}
