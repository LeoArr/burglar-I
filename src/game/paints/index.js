const fs = require('fs');
module.exports = fs.readdirSync('./src/game/paints').filter((file) => file !== 'index.js')