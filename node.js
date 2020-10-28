var http=require("http");
var url=require("url");
var mysql = require("mysql");

const express =require("express");
const app=express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "FYPEX123456",
  database: "CSE316"
  
});

app.get("/search",(req,res)=>{
	res.writeHead(200,{"Content-Type": "text/html"});
	var q =url.parse(req.url,true);
	var qdata =q.query;
	res.write("<br>Month="+qdata.month);
	res.write("<br>year="+qdata.year);
	res.end();
});
port = process.env.PORT||3000;
app.listen(port,()=>{
	console.log("server started!");
});
http.createServer(function(request,response){
	response.writeHeader(200,{"Content-type":"text/html"});
	writeHTML(request,response);
}).listen(8000);
function writeHTML(request,response){
	let urlobj =url.parse(request.url,true);
	let query =urlobj.query;
	if(urlobj.pathname=="/schedule"){
		writeHTMLSchedule(response,query,add);
	}
	let search =query.search ? query.search:"";
	let filter =query.filter ?query.filter:"";



}
function getSQLCommand(search,filter,table){
	var sql="SELECT * FROM classfind"
}


