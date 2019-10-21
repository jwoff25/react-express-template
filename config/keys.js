// Switch between dev/prod keys.
if (process.env.NODE_ENV === "production") {
    module.exports = require('./prod.js');
} else {
    module.exports = require('./dev.js');
}