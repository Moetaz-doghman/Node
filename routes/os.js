var express = require('express');
var router = express.Router();
const os = require('os');


/* GET home page. */
router.get('/',function(req,res,next)  {
    const osInfo = {
        hostname : os.hostname(),
        platform : os.platform(),
        type : os.type(),
        release : os.release(),
        cpu : os.cpus(),
        interfaces : os.networkInterfaces()
    }
    res.json(osInfo);
})

router.get('/cpus', function (req,res,next) {
    res.json({
        cpus : os.cpus(),
    })
})

router.get('/cpus/:id',function (req,res,next) {
    const cpuId = req.params.id;
    const cpu = os.cpus()[cpuId];
  

    if(!cpu){
        res.status(404).json({ error:'Processor not found'})
    }

    res.json({
        id : cpuId,
        model : cpu.model,
        speed : cpu.speed,
        times : cpu.times

    })
})




module.exports = router;
