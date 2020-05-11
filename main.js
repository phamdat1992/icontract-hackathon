// fs = require("fs");
// var content = fs.readFileSync("data.json", { encoding: "utf8" });
// var arr = JSON.parse(content);
// console.log(arr);

const request = require("request");

var content = "";
request("https://bvquoc2003.github.io/Demo-Hackathon/data.json", function (error, response, body) {
  console.error("error:", error);
  console.log("statusCode:", response && response.statusCode);
//   console.log(body); 
  content = body;
});

setTimeout(function() { console.log(content); }, 2000);
