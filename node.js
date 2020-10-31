//var http = require("http");

var mysql = require("mysql");

const express = require("express");
const app = express();
const url = require("url");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "FYPEX123456",
	database: "CSE316",
	port:3306


});

app.get("/", (req, res) => {
	writeSearch(req,res);
});
app.get("/schedule",(req,res)=>{
	writeSchedule(req,res);

})



port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server started!");
});

function writeSearch(req,res){
	res.writeHead(200,{"Content-Type":"text/html"});
	let query =url.parse(req.url,true).query;
	let search=query.search ?query.search:"";
	let filter=query.filter ? query.filter:"";

	let html=`<!DOCTYPE html>
	<html>
	
	<head>
		<title>Class System</title>
		
		<style type="text/css">
			p {
				font-size: 40px;
			}
	
			#color {
				color: red;
			}
	
			#small {
				font-size: 20px;
			}
		</style>
	
	
	</head>
	
	<body>
		<p>Stony Brook <span id="color">University </span><span id="small"> CSE Class Find</span></p>
	
		<form method="get"action="/">
			<input name="search" type="text" value=""></input>
			<select name="filter">
				<option value="allfield" selected="selected">all field</option>
				<option value="courseName">title</option>
				<option value="courseNum">class Number</option>
				<option value="day">day</option>
				<option value="time">time</option>
				<option value="instructor">Instructor</option>
			</select>
			<input type="submit" value="Submit">
			
	
	
		</form>
		
	   
	
	   
		
	
	
	`;
	let sql="SELECT * FROM classfind;";
	if(filter =="allfield")
	sql=`SELECT * FROM classfind
		WHERE Subj LIKE '%`+search+`%' OR 
		CRS LIKE '%`+search+`%' OR
		Title LIKE '%`+search+`%' OR
		Cmp LIKE '%`+search+`%' OR
		Sctn LIKE '%`+search+`%' OR
		Days LIKE '%`+search+`%' OR
		StartTime LIKE '%`+search+`%' OR
		EndTime LIKE '%`+search+`%' OR
		MtgStartDate LIKE '%`+search+`%' OR
		MtgEndDate LIKE '%`+search+`%' or
		Duration LIKE '%`+search+`%' or
		InstructionMode LIKE '%`+search +`%' or
		Building LIKE '%`+search+`%' or
		Room LIKE '%`+search +`%' or
		Instr LIKE '%`+search+`%' or
		EnrlCap LIKE '%`+search+`%' or
		WaitCap LIKE '%`+search+`%' or
		CmbndDescr LIKE '%`+search+`%' or
		CmbndEnrlCap LIKE '%`+search+`%';`;
	else if(filter=="courseNum")
	sql=`SELECT * FROM classfind
	WHERE CRS LIKE '%`+search+`%' ;`;
	else if(filter=="courseName")
	sql=`SELECT * FROM classfind
	WHERE Title LIKE '%`+search+`%' ;`;
	else if (filter=="instructor")
	sql=`SELECT * FROM classfind
	WHERE Instr LIKE '%`+search+`%' ;`;
	else if (filter=="day")
	sql=`SELECT * FROM classfind
	WHERE Days LIKE '%`+search+`%' ;`;
	else if(filter=="time")
	sql=`SELECT * FROM classfind
	Where StartTime LIKE '%`+search+`%' OR
	EndTime Like '%`+search+`%' ;`;
	con.query(sql,function(err,result){
		if(err)throw err;
		for(let item of result){
			html+=`<button type="button class"toggle>CSE`+item.CRS+`-`+
			item.Title+`-`+item.Cmp+`- Section `+item.Sctn+`</button>
			`;
		}
		res.write(html+"</body></html>");
		res.end();

	});
	
		
		
	   
}






