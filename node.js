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
con.query("DELETE FROM SCHEDULE");

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
			<style>

			.classlist {
				background-color: rgb(252, 189, 189);
				color: rgb(36, 32, 32);
				cursor: pointer;
				padding: 8px;
				width: 100%;
				border: 0;
				text-align: center;
				outline: 0;
				font-size: 15px;
			}
	
			.active,
			.collapsible:hover {
				background-color: rgb(107, 105, 105);
			}
	
			.content {
				padding: 0 18px;
				max-height: 0;
				overflow: hidden;
				transition: max-height 0.2s ease-out;
				background-color: #f7e8e8;
			}
			</style>






		</style>
	
	
	</head>
	
	<body>
		<p>Stony Brook <span id="color">University </span><span id="small"> CSE Class Find</span></p>
	
		<form method="get"action="/">
		     
			<input name="search" type="text" value="Example:'cse','316'"></input>
			<select name="filter">
				<option value="allfield" selected="selected">all field</option>
				<option value="courseName">title</option>
				<option value="courseNum">class Number</option>
				<option value="day">day</option>
				<option value="time">time</option>
				<option value="instructor">Instructor</option>
			</select>
			<input type="submit" value="Submit">
			<br>
			Click to see course information
			<br>
			Click add to add course to your schedule
			<br>
			search example:"316" "M/ TU/ W/ TH/ F" "3:00" "fodor" ...

			
	
	
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
			html+=`<button type 'button' class= 'classlist' >CSE`+item.CRS+`-`+
			item.Title+`-`+item.Cmp+`- Section `+item.Sctn+`</button>`+
			
			`<div class='content'> <p>Suny at Stony Brook | Spring 2021 | </p><table border='1' cellpadding='1' cellspacing='1' style='width: 100%;'>
			<tbody><tr><td style='background-color: rgb(155, 207, 175);'>Class Details</td><td style='background-color: rgb(155, 207, 175);'></td></tr>
			<tr><td>Status:   Open</td><td>Course ID</td></tr>
			<tr><td>Class Number:   </td><td>Offer Nbr:</td></tr>
			<tr><td>Section: Full Spring Semester Session  </td><td>Career</td></tr>
			<tr><td>Units:  </td><td>Dates:`+item.MtgStartDate+`-`+item.MtgEndDate+`</td></tr>
			<tr><td>Class Components: `+item.Cmp+`</td><td>Granding:</td></tr>
			<tr><td></td><td>Building: `+item.Building+` Room: `+item.Room+`</td></tr>
			<tr><td style='background-color: rgb(155, 207, 175);'>Meeting Information</td><td style='background-color: rgb(155, 207, 175);'></td></tr>
			</tbody></table>
			<table border='1' cellpadding='1' cellspacing='1' style='width: 100%;'>
			<tbody2>
			<tr><td style='background-color: rgb(210, 226, 216);'>Days & Times</td><td style='background-color: rgb(210, 226, 216);'>Room</td><td style='background-color: rgb(210, 226, 216);'>Instructor</td><td style='background-color: rgb(210, 226, 216);'>Meeting Dates</td></tr>
			<tr><td>`+item.Days+`  `+item.StartTime+` - `+item.EndTime+`</td><td>`+item.Room+`</td><td>`+item.Instr+`</td><td>`+item.MtgStartDate+` - `+item.MtgEndDate+`</td></tr>
			<tr><td>Meeting Duration: `+item.Duration+` </td></tr></tbody2><table>
			<table border='1' cellpadding='1' cellspacing='1' style='width: 100%;'>
			<tr><td style='background-color: rgb(155, 207, 175);'>Class Availability</td><td style='background-color: rgb(155, 207, 175);'></td></tr>
			<tr><td>Class Capacity:`+item.EnrlCap+`</td><td>Wait List Capacity:`+item.WaitCap+`</td></tr>
			<tr><td>Class Mode:`+item.InstructionMode+`</td></tr>
			<tr><td>Combined Description: `+item.CmbndDescr+`</td> <td>Combined Enrollement: `+item.CmbndEnrlCap+`</td></tr>
			
			


			</tbody></table>
			<form action ="/schedule" method="get">
			<button name="add" value="`+item.id+`">Add</button></form></div>



			
			




			
			`;
		}
		html+=`<script>
        var course = document.getElementsByClassName("classlist");
        

        for (i = 0; i < course.length; i++) {
            course[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    </script>`
		res.write(html+"</body></html>");
		res.end();

	});
	
		
		
	   
}
function writeSchedule(req,res){
	let query=url.parse(req.url,true).query;
	
	let addQuery=`REPLACE INTO schedule SELECT * FROM classfind WHERE classfind.id="`+query.add+`";`
	let html=`<!DOCTYPE html>
	<html>
	
	<head>
		<h1 style="text-align: center;">My weekly class schedule</h1>
		<style type=text/css>
			table,
			tr,
			td {
				border: 1 px solid black;
				border-collapse: collapse;
				background-color: rgb(238, 240, 236);
				margin-left: auto;
				margin-right: auto;
				padding: 3px 30px 3px 30px;
			}
		</style>
	</head>
	
	<body>
	<a href="/">Return</a>
	<br><br>
		<table>
			<tr>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Sunday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Monday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Tuesday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Wednesday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Thursday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Friday</th>
				<th style="background-color: rgb(56, 54, 54); color: blanchedalmond;">Saturday</th>
	
			</tr>
			<tr>
				<td></td>
				<td>MON</td>
				<td>TUE</td>
				<td>WED</td>
				<td>THU</td>
				<td>FRI</td>
				<td></td>
			</tr>
		</table>
	
	</body>
	
	</html>`;
	con.query(addQuery,function(err,result){
		if(err) console.log(err);
		con.query(`SELECT * FROM schedule where Days LIKE '%M%' ORDER BY TimeQ;`,function(err,result){
			if(err) throw err;
			html=html.replace("<td>MON</td>",getDay(result,"MON"));
			con.query(`SELECT * FROM schedule where Days LIKE '%TU%' ORDER BY TimeQ;`,function(err,result){
				if(err) throw err;
				html=html.replace("<td>TUE</td>",getDay(result,"TUE"));
				con.query(`SELECT * FROM schedule where Days LIKE '%W%' ORDER BY TimeQ;`,function(err,result){
					if(err) throw err;
					html=html.replace("<td>WED</td>",getDay(result,"WED"));
					con.query(`SELECT * FROM schedule where Days LIKE '%TH%' ORDER BY TimeQ;`,function(err,result){
						if(err) throw err;
						html=html.replace("<td>THU</td>",getDay(result,"THU"));
						con.query(`SELECT * FROM schedule where Days LIKE '%F%' ORDER BY TimeQ;`,function(err,result){
							if(err) throw err;
							html=html.replace("<td>FRI</td>",getDay(result,"FRI"));
							res.write(html+'</body></html>');
							res.end();
						})

					})

				})
			})

			
				

				
		})
	})



}
function getDay(SQLResult,tableHeader){
	let retStr="<td style='background-color: rgb(155, 207, 175);'>";
	for(let item of SQLResult){
        retStr+="<p style='text-align: center;'><strong>"
        +item.Subj+item.CRS+" - "+item.Cmp+" - "+item.Sctn+"</strong></p>"+
        "<p style='text-align: center;'>"
        +item.Title+"</p>"+
        "<p style='text-align: center;'>"+
        item.Cmp+"</p>"+"<p style='text-align: center;'>"
        +item.StartTime+" - "+item.EndTime+"</p><br><br>"

    }
	return retStr+"</td>"
}







