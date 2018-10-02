const Server = require('./PM2Server');
const generator = require('./generatorJson');
const fileHandler = require('../FileHandler');

const app = new Server();

const startApp = async ()=>{
    try{
        await app.init();
        setInterval(()=>{
            broadcastToWorkers();
        },3000);
    } catch(err) {
        console.log(err);
    }
};

const createData = async ()=>{
    return await fileHandler.write('./storage/storage.txt', generator({}));
}

const broadcastToWorkers = async ()=>{
    const payload = await createData();
    const ids = await app.getWorkerIdsByName('worker');
    return await app.broadcastWorker(ids, payload);
}

startApp();

