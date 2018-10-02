module.exports = {
    apps : [{
        name: 'master', 
        script: './appMaster/master.js',
        exec_mode : 'fork',
        instances : 1,
      },{
        name: 'worker', 
        script: './appWorker/worker.js',
        exec_mode : 'fork',
        instances : 2 
    }
    ]
  }
