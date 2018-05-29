
var express = require('express');
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

var Router = express.Router();

Router.route('/rank_list').post(function (request, response) {

  var start = 0;
  var end = 10;
  var step = 10;

  var body = request.body;

  var content = fs
    .readFileSync(path.resolve('./documents/ListForm.docx'), 'binary');

  for (var index = 0; index < body.date.length; index++) {

    for (var second = 0; second < body.comissions.length; second++) {
      var zip = new JSZip(content);
      var doc = new Docxtemplater();
      doc.loadZip(zip);
      for (var i = 0; i < body.comissions[second].students.slice(start, end).length; i++) {
        body.comissions[second].students[start + i].index = i + 1;
      }
      doc.setData({
        group: body.group,
        dir_code: body.direction_code,
        dir_name: body.direction_name,
        faculty: body.faculty,
        date: body.date[index],
        fio: body.comissions[second].fio,
        students: body.comissions[second].students.slice(start, end)
      });
      try {
        doc.render()
      }
      catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
      }
      var buf = doc.getZip()
        .generate({type: 'nodebuffer'});
      var filename = body.date[index] + ' ' + body.comissions[second].fio;
      var dir = path.resolve('./documents/Exam');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.resolve(dir + '/List');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.resolve(dir + '/' + body.group);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(path.resolve(dir, filename + '.docx'), buf);
    }
    start += step;
    end += step;
  }

  response.json({body: body, status: true});
});

// Generate protocol
Router.route('/protocol').post(function (request, response) {

  var start = 0;
  var end = 10;
  var step = 10;

  var body = request.body;

  var content = fs
    .readFileSync(path.resolve('./documents/ProtocolForm.docx'), 'binary');

  for (var index = 0; index < body.date.length; index++) {

    for (var i = 0; i < body.students.slice(start, end).length; i++) {
      var zip = new JSZip(content);
      var doc = new Docxtemplater();
      doc.loadZip(zip);
      doc.setData({
        protocol: body.students[i].protocol,
        program: body.program,
        dir_code: body.direction_code,
        dir_name: body.direction_name,
        prof_name: body.profile,
        day: body.date[index].day,
        month: body.date[index].month,
        year: body.date[index].year,
        hour_end: body.hour[index].hour,
        min_end: body.hour[index].minute,
        pred: body.pred,
        comissia: body.comissia,
        order_date: body.order_date,
        order_num: body.order_num,
        fio: body.students[i].fio,
        first: body.students[i].first,
        second: body.students[i].second,
        third: body.students[i].third,
        characteristic: body.students[i].characteristic,
        rate: body.students[i].rate,
        disadvantege: body.students[i].disadvantege,
        secretary: body.secretary
      });
      try {
        doc.render()
      }
      catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
      }
      var buf = doc.getZip()
        .generate({type: 'nodebuffer'});
      var filename = body.students[i].protocol + '. ' + body.students[i].fio;
      var dir = path.resolve('./documents/Exam');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.resolve(dir + '/Protocol');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.resolve(dir + '/' + body.group);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(path.resolve(dir, filename + '.docx'), buf);
    }
    start += step;
    end += step;
  }

  response.json({body: body, status: true});
});

module.exports = Router;
