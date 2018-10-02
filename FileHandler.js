const fs = require('fs');

class FileHandler {

    static write(path, data) {
        return new Promise((resolve, reject)=>{
            const buffer = Buffer.from(data);
            fs.open(path, 'a', (err, fd)=>{
                if(err) reject(err);
                else fs.write(fd, buffer, 0, buffer.length, null, (err)=>{
                    if(err) reject(err);
                    else fs.close(fd, ()=>{
                        console.log('File written');
                        resolve({
                            path: path,
                            length: buffer.length
                        });
                    })
                });
            });
        });
    }

    static read(path, position, bufferSize){
        return new Promise((resolve, reject)=>{
            const buffer = Buffer.alloc(bufferSize);
            fs.open(path, 'r', (err, fd)=>{
                fs.read(fd, buffer, 0, buffer.length, position, (err, size, data)=>{
                    if(err) reject(err);
                    else fs.close(fd,()=>{
                        resolve(data.toString())
                    });
                });
            });
        });
    }
}

module.exports = FileHandler;