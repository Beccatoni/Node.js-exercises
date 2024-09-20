const {parentPort} = require('worker_threads');

function heavyComputation() {
    let result = 0;
    for (let i = 0; i < 1e9; i++) {
       result += i;
        
    }
    return result;
}

parentPort.postMessage(heavyComputation());