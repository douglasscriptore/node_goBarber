const path = require('path')
const crypto = require('crypto') // biblioteca propria do node
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        // o primeiro parametro do cb() é o erro, como não teve erro passo null
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
