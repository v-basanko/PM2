const fileHandler = require('../FileHandler');
let dataCounter = 0;

process.on('message', async (packet)=>{
    const data = await fileHandler.read(packet.data.payload.path, dataCounter, packet.data.payload.length);
    console.log(data);
    dataCounter+=Number(packet.data.payload.length);
    console.log(typeof packet.data.payload.path, dataCounter, typeof packet.data.payload.length);
    process.send({
        type : 'process:msg',
        data : {
         success : true
        }
    });
});