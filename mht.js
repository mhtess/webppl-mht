var fs = require('fs');
var babyparse = require('babyparse');
var present = require('present');


var erpWriter = function(erp, filename, header) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
 fs.writeSync(csvFile,header + ',Probability\n')
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
};

var writeERP = function(erp,handle) {
   var supp = erp.support([]);
   supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), handle);})
};

function getTime(){
  return present()
};

function isNumeric(num){
  return !isNaN(num);
};

var supportWriter = function(s, p, handle) {
 var sLst = _.pairs(s);
 var l = sLst.length;

 for (var i = 0; i < l; i++) {
   fs.writeSync(handle, sLst[i].join(',')+','+p+'\n');
 }
};

function readCSV(filename){
  return babyparse.parse(fs.readFileSync(filename, 'utf8'));
};

function writeCSV(jsonCSV, filename){
  fs.writeFileSync(filename, babyparse.unparse(jsonCSV) + "\n");
};

function wpParseFloat(x){
  return parseFloat(x);
};

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
};

var openFile = function(filename) {
 var csvFile = fs.openSync(filename, 'w');
 return csvFile
};

var closeFile = function(handle){
 fs.closeSync(handle);
};

var writeLine = function(handle, line){
  fs.writeSync(handle, line+'\n');
};

var saveERP = function(erp, file) {
   var handle = openFile(file);
   var supp = erp.support([]);
   supp.forEach(function(s) {writeLine(handle, [s, Math.exp(erp.score([], s))]);})
   closeFile(handle)
};

module.exports = {
  readCSV: readCSV,
  wpParseFloat: wpParseFloat,
  isNumeric: isNumeric,
  erpWriter:erpWriter,
  getTime:getTime,
  fillArray: fillArray,
  openFile: openFile,
  closeFile: closeFile,
  writeLine: writeLine,
  writeERP:writeERP,
  saveERP:saveERP
};
