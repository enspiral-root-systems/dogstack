const { join, basename } = require('path')
const { assign } = Object

module.exports = {
  command: 'api',
  description: 'start api server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createDb = require('../createDb')
    const createApiServer = require('../createApiServer')

    const { cwd } = argv
    const dbConfigPath = join(cwd, 'db/index.js')
    const appPath = join(cwd, 'server.js')

    require('babel-register')
    const dbConfig = require(dbConfigPath)
    const db = createDb(dbConfig)

    const serverOptions = getDefaultExport(require(appPath))
    const server = createApiServer(assign({ db }, serverOptions))
    const close = server()
  }
}

// interop when using babel
function getDefaultExport (obj) { return obj && obj.__esModule ? obj.default : obj }
