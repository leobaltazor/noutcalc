const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
var firebase = require("firebase");
var config = require(__datadir + '/config/config.js')



firebase.initializeApp(config);
let user = firebase.auth();
let db = firebase.database();
let dbref = db.ref('cpu-nout').once("value", function(snapshot) {
	console.log(snapshot.val())
});
console.log(dbref);

let calcN = express();
calcN.use(bodyParser.json());
calcN.use(cors());

calcN.listen(8090, function() {
  console.log("run server 8090");
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
function readData(_cpu) {
  var t1 = "";
  fs.readFile("./config/CPU_serv.json", "utf8", (err, data) => {
    if (err) throw err;
    CPU = data;
    t1 = data;
    // console.log('длина '+JSON.stringify(JSON.parse(CPU)[800]));
    t1 = JSON.stringify(JSON.parse(CPU)[800]);
    for (let i = 0; i < JSON.parse(CPU).length; i++) {
      const element = JSON.parse(CPU).length[i];
      _cpu.push(element);
    }
  });
  return _cpu;
}
setTimeout(() => {
  console.log("итог" + readData(_cpu));
}, 2000);

console.log(CPU);
function nout(CPU, RAM, HDD, SSD, VGA, diag) {
  this.CPU = CPU;
  this.RAM = RAM;
  this.HDD = HDD;
  this.SSD = SSD;
  this.VGA = VGA;
  this.diag = diag;
}

var tes = { CPU: "3310", RAM: "2" };
var _nout1 = new nout(tes.CPU, tes.RAM);
console.log(nout());
console.log(_nout1);
console.log(_cpu.length);

function calcNewN(data) {
  console.log(_cpu);
  console.log(CPU);
}
calcNewN();
