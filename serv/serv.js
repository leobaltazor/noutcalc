const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
var firebase = require("firebase");
var config = require("../config/config.js");

// firebase.initializeApp(config.firebase);
// let user = firebase.auth();
// let db = firebase.database();
// let dbref = db.ref("cpu-nout").once("value", function(snapshot) {
//   // console.log(snapshot.val()[0]);
//   let arr = [];
//   snapshot.forEach(function(data) {
//     // console.log(data.val());
//     arr.push(data.val());
//   });
//     console.log(arr);

//   //   return arr;
// });
// console.log("dbref=" + dbref);

let arr = [];
var admin = require("firebase-admin");
var serviceAccount = require("../config/calc-nout-pc-price-firebase-adminsdk-asvca-5006542dfe.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://calc-nout-pc-price.firebaseio.com"
});
const db = admin.database();
db.ref("cpu-nout").once("value", function(snapshot) {
  // console.log(snapshot.val()[0]);
	// let arr = [];
	[].forEach.call(snapshot, function(data) {
    // console.log(data.val());
    arr.push(data.val());
  });)
  // snapshot.forEach(function(data) {
  //   // console.log(data.val());
  //   arr.push(data.val());
  // });
    // console.log(arr);

  return arr;
});
console.log("sssss" + arr);

let calcN = express();
calcN.use(express.static("public"));
calcN.use(cors());
calcN.use(bodyParser.json());

calcN.post("/cpu", function(req, res, next) {
  if (req.body && req.body.message) {
    res.send(JSON.stringify(req.body));
    return next();
    // return res.send(req.body);
  } else {
    res.send("Неправильный параметр");
  }
});

calcN.get("/cpu", function(req, res) {
  const CC = readData(_cpu);
  //   const CC = dbref;
  return res.send(JSON.stringify(CC));
});

calcN.listen(8090, function() {
  console.log("run server 8090");
});

var _cpu = [];
function readData(_cpu) {
  var t1 = "";
  fs.readFile("./config/CPU_serv.json", "utf8", (err, data) => {
    if (err) throw err;
    JSON.parse(data).forEach(element => {
      _cpu.push(element);
    });
  });
  return _cpu;
}
readData(_cpu);
function nout(CPU, RAM, HDD, SSD, VGA, diag, manufacturer, touchscreen) {
  this.CPU = CPU;
  this.RAM = RAM;
  this.HDD = HDD;
  this.SSD = SSD;
  this.VGA = VGA;
  this.diag = diag;
  this.manufacturer = manufacturer;
  this.touchscreen = touchscreen;
}

var tes = { CPU: "3310", RAM: "16" };
var _nout1 = new nout(tes.CPU, tes.RAM);
console.log(_nout1);

console.log("****************************************************************");
let cpu = [
  { value: "Atom 230 (Silverthorne)", price: "392.04" },
  { value: "Atom 330 (Diamondville)", price: "392.04" }
];
let ram = [{ value: "8", price: "500" }, { value: "16", price: "1000" }];
let hdd = [{ value: "500", price: "800" }, { value: "250", price: "400" }];
let ssd = [{ value: "250", price: "2000" }, { value: "500", price: "4000" }];
let vga = [{ value: "amd", price: "2000" }, { value: "intel", price: "4000" }];
let _nout2 = new nout("Atom 330 (Diamondville)", "16", "250", "250", "amd");
calcNew(_nout2, cpu, ram, hdd, vga, ssd);

function calcNew(
  nout,
  cpu,
  ram,
  hdd,
  vga,
  ssd,
  diag,
  manufacturer,
  touchscreen
) {
  let priceCPU = retPrice(cpu, nout.CPU);
  let priceRAM = retPrice(ram, nout.RAM);
  let priceHDD = retPrice(hdd, nout.HDD);
  let priceVGA = retPrice(vga, nout.VGA);
  let priceSSD = retPrice(ssd, nout.SSD);

  function retPrice(arr, element) {
    let text = element;
    let result = arr.filter(function(item, index, arr) {
      return item.value == text;
    });

    return parseFloat(result[0].price);
  }

  /*
  ([s_cpu]+[s_ram]+[s_hdd]+[s_vga])*  //суммируем все
  [k_diag]*1*[k_proizvoditel_n]*[k_sensor]*2+ //умножаем на кофы
  [s_ssd]+ //плюсуем SSD
  //онимаем стоимость дефектов
  IIf([fdef1]=-1;-500;0)+ //Работает только от сети / нет АКБ
  IIf([fdef2]=-1;-500;0)+ //Нет ЗУ / Оголенные провода на ЗУ
  IIf([fdef3]=-1;-1200;0)+ //Экран подлежит замене
  IIf([fdef4]=-1;-300;0)+ //Отсутствует/не работает часть кнопок
  IIf([fdef6]=-1;-200;0)+ //Не работает 1 USB порт
  IIf([fdef5]=-1;-500;0) //Незначительные дефекты матрицы
  */
  _cost = (priceCPU + priceRAM + priceHDD + priceVGA) * 2 + priceSSD;
  console.log(nout);
  console.log("цена CPU " + priceCPU);
  console.log("цена RAM " + priceRAM);
  console.log("цена HDD " + priceHDD);
  console.log("цена SSD " + priceSSD);
  console.log("цена VGA " + priceVGA);
  console.log(_cost);
  console.log(
    `********************************************* Цена нового = ${_cost}`
  );
}
