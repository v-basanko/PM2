const pm2 = require('pm2');


class PM2Server {
    
    async init() {
        await this._createServer();
        //await this._startWorker(options);
        await this._createChanel();
    }
    
    async sendMessage(workerId, payload) {
        return new Promise((resolve, reject)=>{
            pm2.sendDataToProcessId(workerId, {
                data : {
                  payload : payload,
                },
                topic: 'some topic'
              }, 
              (err, response)=>{
                if(err) reject(err);
                else resolve(response)
              });
        });
    }

    async broadcastWorker(ids, payload) {
        return Promise.all(
            ids.map(id => this.sendMessage(id, payload))
            );
    }

    getWorkerIdsByName(workerName) {
        return new Promise((resolve, reject)=>{
            pm2.list((err, processes)=>{
                if(err) reject(err);
                else resolve(
                    processes
                        .filter(process=>process.name === workerName)
                        .map(process=>process.pm_id)
                );
            });
        });
    }
    
    _createServer() {
        return new Promise((resolve, reject)=>{
            pm2.connect((err)=>{
                if(err) reject(err);
                else {
                    console.log("Server created");
                    resolve();
                }
            });
        });
    }

    _startWorker(options){
        return new Promise((resolve, reject)=>{
            pm2.start(options,(err, apps)=>{
                if(err) reject(err);
                else {
                    console.log("Worker started")
                    resolve(apps);
                }
            })
        });
    }

    _createChanel(){
        return new Promise((resolve, reject)=>{
            pm2.launchBus(function(err, bus) {
                console.log("Chanel opened");
                if(err) reject(err);
                else {
                    resolve();
                    bus.on('process:msg', (data)=>{
                    });
                }
            });
        });
    } 
}

module.exports = PM2Server;