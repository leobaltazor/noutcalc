const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");

let calcN = express();
calcN.use(bodyParser.json());
calcN.use(cors());

calcN.listen(8090, function() {
  console.log("run server 3000");
});

calcN.get("/CPU", function(req, res) {
  if (req.body && req.body.message) {
    res.send(JSON.stringify(req.body));
    res.send(req.body);
  } else {
    // res.send("Неправильный параметр");
    res.send(CPU);
    // console.log(CPU);
  }
});

var CPU = "";
var _cpu = [];
fs.readFile("./serv/CPU_serv.json", "utf8", (err, data) => {
  if (err) throw err;
  CPU = data;
  console.log(JSON.parse(CPU).length);
  for (let i = 0; i < JSON.parse(CPU).length; i++) {
	  const element = JSON.parse(CPU).length[i]
	  _cpu.push(element);
	  
  }
});
function nout(CPU, RAM, HDD, SSD, VGA, diag) {
  this.CPU = CPU;
  this.RAM = RAM;
  this.HDD = HDD;
  this.SSD = SSD;
  this.VGA = VGA;
  this.diag = diag;
}

var _nout1 = new nout(3310,2,0,200,1080,15);
console.log(nout());
console.log(_nout1);
console.log(_cpu.length);

function calcNewN(data) {
//   console.log(_cpu);
}
calcNewN();
