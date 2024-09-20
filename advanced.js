const cluster = require('cluster');
const http = require('http');
const os = require('os');


const numCPUs = os.cpus().length
console.log(numCPUs);


