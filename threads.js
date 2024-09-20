const {Worker} = require('worker_threads')



function runworker(){
    return new Promise((resolve, reject)=> {
        const worker = new Worker('./worker.js');
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code)=> {
            if(code !== 0){
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}

async function start() {
    console.log('Main thread: Starting heavy computation in worker... ');
    const result = await runworker();
    console.log('Main thread: Result from worker: ', result);
}

start()

setImmediate(()=>{
   console.log('In setImmediate')
})