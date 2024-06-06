
var	canvas = document.getElementById('game');
var	context = canvas.getContext('2d');
var left = 40;
var up = 38;
var bottom = 458;
var right = 662;
var movingCircle = null;
var point_cnt = 10;
var line_cnt = 13;
var level = 1;
var fivesec = 0;
var win = 0;
var leveltime = 0;
var moves = 0;
var hoveredCircle = null;
context.lineWidth = 3;
context.font = "bold 11pt Planarity";
var votma = new Array();
var gameover = 0;

function Point(xx,yy) {	
	this.x = xx;
	this.y = yy;
	this.hover = false;
	this.red = false;
	this.lines = 0;
}

function Line(aa,bb)
{
	this.a = aa;
	this.b = bb;
}

var startingtime = new Date().getTime();
var prevtime = startingtime;
var prevfps = 0;

var circle1 = new Image();
circle1.src="circle1.png";

var circle2 = new Image();
circle2.src="circle2.png";

var circle3 = new Image();
circle3.src="circle3.png";

var bg = new Image();
bg.src="bg.png";

loadLevel();
var timer = null;

function draw()
{
	canvas.width = canvas.width;
	now = new Date().getTime();
	var deltat = now - prevtime;
	prevtime = now;
	var fps = 0.1*1000/deltat + 0.9*prevfps;
	prevfps = fps;
	
	context.drawImage(bg,0,0);
	
	context.font = "bold 11pt Planarity";
	context.fillStyle = "silver";
	context.fillText('Level: '+level,700,45);
	context.fillText('Time: '+Math.round(leveltime/1000),700,65);
	context.fillText('Moves: '+moves,700,85);
	context.fillText('Fps: '+Math.round(fps),700,105);
	
	if(win == 0 && gameover == 0)
	{
		leveltime += deltat;
	}
	
	if(gameover == 0)
	{
		for(var i=0;i<lines.length;i++)
		{
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo(lines[i].a.x, lines[i].a.y);
			context.lineTo(lines[i].b.x, lines[i].b.y);
			context.stroke();
			context.closePath();
		}
		
		for(var i=0;i<points.length;i++)
		{
			if(points[i].hover == false)
			{			
				if(points[i].red == 1)
				{
					context.drawImage(circle3,points[i].x-7,points[i].y-7);
				}
				else
				{
					context.drawImage(circle1,points[i].x-7,points[i].y-7);
				}
			}
			else
			{
				context.drawImage(circle2,points[i].x-7,points[i].y-7);
			}
		}
		
		if(movingCircle == null && checkIntersect() == 0)
		{
			win=1;
		}
		
		if(win == 1)
		{
			hoveredCircle.hover = false;
			if(fivesec <5000)
			{
				context.font = 'bold 20pt Planarity';
				context.fillStyle = "#940000";
				context.fillText('YOU WON!',300,245);
				fivesec += deltat;
			}
			else
			{
				level++;
				fivesec = 0;
				win = 0;
				leveltime = 0;
				moves = 0;
				score = 0;
				loadLevel();
			}
		}
	}
	else
	{
		level = 10;
		context.font = 'bold 20pt Planarity';
		context.fillStyle = "#940000";
		context.fillText('You won the game!',260,245);
		clearInterval(timer);
	}
}

function loadLevel()
{
	if(timer == null && gameover == 0)
	{
		timer = window.setInterval(draw,35);
	}
	switch(level)
	{
		case 1:
			point_cnt = 6;
			break;
		case 2:
			point_cnt = 10;
			break;
		case 3:
			point_cnt = 15;
			break;
		case 4:
			point_cnt = 20;
			break;
		case 5:
			point_cnt = 25;
			break;
		case 6:
			point_cnt = 30;
			break;
		case 7:
			point_cnt = 35;
			break;
		case 8:
			point_cnt = 40;
			break;
		case 9:
			point_cnt = 45;
			break;
		case 10:
			point_cnt = 50;
			break;
		default:
			break;
	}
	votma = new Array();
	points = new Array();
	for(var i=0;i<point_cnt;i++)
	{
		var index = Math.floor(Math.random()*(point_cnt));
		var volt = true;
		while(volt == true)
		{
			volt = false;
			for(var i=0;i<votma.length;i++)
			{
				if(votma[i] == index)
				{
					if(index < point_cnt-1)
					{
						index++;
					}
					else
					{
						index = 0;
					}
					volt = true;
				}
			}
		}
		votma.push(index);
		var fi = index/point_cnt*2*3.1415;
		var x = 400+200*Math.cos(fi);
		var y = 250+200*Math.sin(fi);
		points.push(new Point(x,y));
		
	}
	
	lines = new Array();
	
	switch(level)
	{
		case 1:
			lines.push(new Line(points[0],points[5]));
			lines.push(new Line(points[4],points[5]));
			lines.push(new Line(points[0],points[1]));
			lines.push(new Line(points[2],points[3]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[1],points[2]));
			lines.push(new Line(points[5],points[2]));
			lines.push(new Line(points[2],points[4]));
			break;
		case 2:
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[2],points[5]));
			lines.push(new Line(points[1],points[2]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[0],points[0]));
			lines.push(new Line(points[9],points[0]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[6],points[9]));
			lines.push(new Line(points[2],points[9]));
			lines.push(new Line(points[7],points[9]));
			lines.push(new Line(points[0],points[2]));
			break;
		case 3:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[0],points[14]));
			lines.push(new Line(points[9],points[7]));
			lines.push(new Line(points[5],points[3]));
			lines.push(new Line(points[1],points[3]));
			lines.push(new Line(points[14],points[12]));
			lines.push(new Line(points[11],points[7]));
			lines.push(new Line(points[12],points[3]));
			lines.push(new Line(points[1],points[12]));
			lines.push(new Line(points[6],points[11]));
			lines.push(new Line(points[6],points[3]));
			lines.push(new Line(points[12],points[6]));
			lines.push(new Line(points[0],points[12]));
			lines.push(new Line(points[10],points[7]));
			break;
		case 4:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[0],points[19]));
			lines.push(new Line(points[10],points[3]));
			lines.push(new Line(points[9],points[4]));
			lines.push(new Line(points[8],points[4]));
			lines.push(new Line(points[5],points[9]));
			lines.push(new Line(points[7],points[5]));
			lines.push(new Line(points[10],points[4]));
			lines.push(new Line(points[2],points[12]));
			lines.push(new Line(points[11],points[2]));
			lines.push(new Line(points[19],points[14]));
			lines.push(new Line(points[19],points[13]));
			lines.push(new Line(points[0],points[13]));
			lines.push(new Line(points[1],points[12]));
			lines.push(new Line(points[19],points[17]));
			lines.push(new Line(points[15],points[19]));
			lines.push(new Line(points[17],points[15]));
			break;
		case 5:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[0],points[24]));
			lines.push(new Line(points[12],points[0]));
			lines.push(new Line(points[12],points[5]));
			lines.push(new Line(points[3],points[0]));
			lines.push(new Line(points[1],points[3]));
			lines.push(new Line(points[4],points[12]));
			lines.push(new Line(points[3],points[12]));
			lines.push(new Line(points[11],points[5]));
			lines.push(new Line(points[13],points[0]));
			lines.push(new Line(points[10],points[6]));
			lines.push(new Line(points[9],points[6]));
			lines.push(new Line(points[14],points[23]));
			lines.push(new Line(points[24],points[14]));
			lines.push(new Line(points[15],points[18]));
			lines.push(new Line(points[17],points[15]));
			lines.push(new Line(points[19],points[22]));
			lines.push(new Line(points[21],points[19]));
			lines.push(new Line(points[18],points[23]));
			lines.push(new Line(points[14],points[18]));
			break;
		case 6:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[25],points[24]));
			lines.push(new Line(points[26],points[25]));
			lines.push(new Line(points[27],points[26]));
			lines.push(new Line(points[28],points[27]));
			lines.push(new Line(points[29],points[28]));
			lines.push(new Line(points[0],points[29]));
			lines.push(new Line(points[15],points[2]));
			lines.push(new Line(points[15],points[28]));
			lines.push(new Line(points[18],points[16]));
			lines.push(new Line(points[19],points[28]));
			lines.push(new Line(points[18],points[28]));
			lines.push(new Line(points[27],points[20]));
			lines.push(new Line(points[21],points[26]));
			lines.push(new Line(points[23],points[26]));
			lines.push(new Line(points[25],points[23]));
			lines.push(new Line(points[29],points[2]));
			lines.push(new Line(points[1],points[29]));
			lines.push(new Line(points[14],points[3]));
			lines.push(new Line(points[12],points[3]));
			lines.push(new Line(points[12],points[6]));
			lines.push(new Line(points[3],points[12]));
			lines.push(new Line(points[3],points[12]));
			lines.push(new Line(points[5],points[3]));
			lines.push(new Line(points[6],points[11]));
			lines.push(new Line(points[10],points[7]));
			lines.push(new Line(points[8],points[10]));
			break;
		case 7:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[25],points[24]));
			lines.push(new Line(points[26],points[25]));
			lines.push(new Line(points[27],points[26]));
			lines.push(new Line(points[28],points[27]));
			lines.push(new Line(points[29],points[28]));
			lines.push(new Line(points[30],points[29]));
			lines.push(new Line(points[31],points[30]));
			lines.push(new Line(points[32],points[31]));
			lines.push(new Line(points[33],points[32]));
			lines.push(new Line(points[34],points[33]));
			lines.push(new Line(points[0],points[34]));
			lines.push(new Line(points[1],points[16]));
			lines.push(new Line(points[32],points[23]));
			lines.push(new Line(points[21],points[0]));
			lines.push(new Line(points[34],points[21]));
			lines.push(new Line(points[23],points[34]));
			lines.push(new Line(points[25],points[32]));
			lines.push(new Line(points[27],points[25]));
			lines.push(new Line(points[27],points[31]));
			lines.push(new Line(points[28],points[31]));
			lines.push(new Line(points[30],points[28]));
			lines.push(new Line(points[23],points[21]));
			lines.push(new Line(points[20],points[1]));
			lines.push(new Line(points[20],points[16]));
			lines.push(new Line(points[17],points[20]));
			lines.push(new Line(points[19],points[17]));
			lines.push(new Line(points[15],points[1]));
			lines.push(new Line(points[15],points[7]));
			lines.push(new Line(points[6],points[2]));
			lines.push(new Line(points[3],points[6]));
			lines.push(new Line(points[5],points[3]));
			lines.push(new Line(points[2],points[15]));
			lines.push(new Line(points[14],points[8]));
			lines.push(new Line(points[13],points[10]));
			lines.push(new Line(points[9],points[14]));
			lines.push(new Line(points[12],points[10]));
			lines.push(new Line(points[9],points[13]));
			break;
		case 8:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[25],points[24]));
			lines.push(new Line(points[26],points[25]));
			lines.push(new Line(points[27],points[26]));
			lines.push(new Line(points[28],points[27]));
			lines.push(new Line(points[29],points[28]));
			lines.push(new Line(points[30],points[29]));
			lines.push(new Line(points[31],points[30]));
			lines.push(new Line(points[32],points[31]));
			lines.push(new Line(points[33],points[32]));
			lines.push(new Line(points[34],points[33]));
			lines.push(new Line(points[35],points[34]));
			lines.push(new Line(points[36],points[35]));
			lines.push(new Line(points[37],points[36]));
			lines.push(new Line(points[38],points[37]));
			lines.push(new Line(points[39],points[38]));
			lines.push(new Line(points[0],points[39]));
			lines.push(new Line(points[21],points[12]));
			lines.push(new Line(points[11],points[34]));
			lines.push(new Line(points[25],points[11]));
			lines.push(new Line(points[25],points[21]));
			lines.push(new Line(points[22],points[25]));
			lines.push(new Line(points[24],points[22]));
			lines.push(new Line(points[20],points[12]));
			lines.push(new Line(points[15],points[13]));
			lines.push(new Line(points[19],points[13]));
			lines.push(new Line(points[18],points[15]));
			lines.push(new Line(points[16],points[18]));
			lines.push(new Line(points[12],points[25]));
			lines.push(new Line(points[10],points[0]));
			lines.push(new Line(points[34],points[26]));
			lines.push(new Line(points[30],points[34]));
			lines.push(new Line(points[33],points[30]));
			lines.push(new Line(points[31],points[33]));
			lines.push(new Line(points[26],points[29]));
			lines.push(new Line(points[27],points[29]));
			lines.push(new Line(points[35],points[11]));
			lines.push(new Line(points[10],points[35]));
			lines.push(new Line(points[36],points[0]));
			lines.push(new Line(points[36],points[10]));
			lines.push(new Line(points[9],points[4]));
			lines.push(new Line(points[39],points[36]));
			lines.push(new Line(points[37],points[39]));
			lines.push(new Line(points[1],points[9]));
			lines.push(new Line(points[4],points[1]));
			lines.push(new Line(points[2],points[4]));
			lines.push(new Line(points[5],points[9]));
			lines.push(new Line(points[8],points[5]));
			lines.push(new Line(points[6],points[8]));
			break;
		case 9:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[25],points[24]));
			lines.push(new Line(points[26],points[25]));
			lines.push(new Line(points[27],points[26]));
			lines.push(new Line(points[28],points[27]));
			lines.push(new Line(points[29],points[28]));
			lines.push(new Line(points[30],points[29]));
			lines.push(new Line(points[31],points[30]));
			lines.push(new Line(points[32],points[31]));
			lines.push(new Line(points[33],points[32]));
			lines.push(new Line(points[34],points[33]));
			lines.push(new Line(points[35],points[34]));
			lines.push(new Line(points[36],points[35]));
			lines.push(new Line(points[37],points[36]));
			lines.push(new Line(points[38],points[37]));
			lines.push(new Line(points[39],points[38]));
			lines.push(new Line(points[40],points[39]));
			lines.push(new Line(points[41],points[40]));
			lines.push(new Line(points[42],points[41]));
			lines.push(new Line(points[43],points[42]));
			lines.push(new Line(points[44],points[43]));
			lines.push(new Line(points[0],points[44]));
			lines.push(new Line(points[27],points[6]));
			lines.push(new Line(points[6],points[18]));
			lines.push(new Line(points[27],points[44]));
			lines.push(new Line(points[44],points[5]));
			lines.push(new Line(points[5],points[2]));
			lines.push(new Line(points[1],points[44]));
			lines.push(new Line(points[0],points[43]));
			lines.push(new Line(points[43],points[28]));
			lines.push(new Line(points[43],points[33]));
			lines.push(new Line(points[42],points[33]));
			lines.push(new Line(points[38],points[42]));
			lines.push(new Line(points[41],points[38]));
			lines.push(new Line(points[39],points[41]));
			lines.push(new Line(points[37],points[34]));
			lines.push(new Line(points[35],points[37]));
			lines.push(new Line(points[32],points[28]));
			lines.push(new Line(points[31],points[29]));
			lines.push(new Line(points[30],points[26]));
			lines.push(new Line(points[26],points[18]));
			lines.push(new Line(points[25],points[19]));
			lines.push(new Line(points[22],points[25]));
			lines.push(new Line(points[20],points[22]));
			lines.push(new Line(points[24],points[22]));
			lines.push(new Line(points[8],points[17]));
			lines.push(new Line(points[16],points[8]));
			lines.push(new Line(points[10],points[15]));
			lines.push(new Line(points[14],points[10]));
			lines.push(new Line(points[12],points[14]));
			lines.push(new Line(points[13],points[11]));
			lines.push(new Line(points[7],points[17]));
			break;
		case 10:
			lines.push(new Line(points[1],points[0]));
			lines.push(new Line(points[2],points[1]));
			lines.push(new Line(points[3],points[2]));
			lines.push(new Line(points[4],points[3]));
			lines.push(new Line(points[5],points[4]));
			lines.push(new Line(points[6],points[5]));
			lines.push(new Line(points[7],points[6]));
			lines.push(new Line(points[8],points[7]));
			lines.push(new Line(points[9],points[8]));
			lines.push(new Line(points[10],points[9]));
			lines.push(new Line(points[11],points[10]));
			lines.push(new Line(points[12],points[11]));
			lines.push(new Line(points[13],points[12]));
			lines.push(new Line(points[14],points[13]));
			lines.push(new Line(points[15],points[14]));
			lines.push(new Line(points[16],points[15]));
			lines.push(new Line(points[17],points[16]));
			lines.push(new Line(points[18],points[17]));
			lines.push(new Line(points[19],points[18]));
			lines.push(new Line(points[20],points[19]));
			lines.push(new Line(points[21],points[20]));
			lines.push(new Line(points[22],points[21]));
			lines.push(new Line(points[23],points[22]));
			lines.push(new Line(points[24],points[23]));
			lines.push(new Line(points[25],points[24]));
			lines.push(new Line(points[26],points[25]));
			lines.push(new Line(points[27],points[26]));
			lines.push(new Line(points[28],points[27]));
			lines.push(new Line(points[29],points[28]));
			lines.push(new Line(points[30],points[29]));
			lines.push(new Line(points[31],points[30]));
			lines.push(new Line(points[32],points[31]));
			lines.push(new Line(points[33],points[32]));
			lines.push(new Line(points[34],points[33]));
			lines.push(new Line(points[35],points[34]));
			lines.push(new Line(points[36],points[35]));
			lines.push(new Line(points[37],points[36]));
			lines.push(new Line(points[38],points[37]));
			lines.push(new Line(points[39],points[38]));
			lines.push(new Line(points[40],points[39]));
			lines.push(new Line(points[41],points[40]));
			lines.push(new Line(points[42],points[41]));
			lines.push(new Line(points[43],points[42]));
			lines.push(new Line(points[44],points[43]));
			lines.push(new Line(points[0],points[44]));
			lines.push(new Line(points[22],points[0]));
			lines.push(new Line(points[22],points[37]));
			lines.push(new Line(points[0],points[16]));
			lines.push(new Line(points[28],points[24]));
			lines.push(new Line(points[23],points[37]));
			lines.push(new Line(points[36],points[24]));
			lines.push(new Line(points[25],points[28]));
			lines.push(new Line(points[27],points[25]));
			lines.push(new Line(points[26],points[45]));
			lines.push(new Line(points[45],points[29]));
			lines.push(new Line(points[45],points[23]));
			lines.push(new Line(points[30],points[36]));
			lines.push(new Line(points[35],points[30]));
			lines.push(new Line(points[32],points[34]));
			lines.push(new Line(points[33],points[46]));
			lines.push(new Line(points[31],points[46]));
			lines.push(new Line(points[35],points[46]));
			lines.push(new Line(points[38],points[44]));
			lines.push(new Line(points[43],points[38]));
			lines.push(new Line(points[40],points[43]));
			lines.push(new Line(points[42],points[40]));
			lines.push(new Line(points[16],points[5]));
			lines.push(new Line(points[5],points[12]));
			lines.push(new Line(points[12],points[8]));
			lines.push(new Line(points[8],points[11]));
			lines.push(new Line(points[11],points[9]));
			lines.push(new Line(points[7],points[5]));
			lines.push(new Line(points[13],points[15]));
			lines.push(new Line(points[14],points[47]));
			lines.push(new Line(points[47],points[17]));
			lines.push(new Line(points[47],points[18]));
			lines.push(new Line(points[17],points[19]));
			lines.push(new Line(points[21],points[19]));
			lines.push(new Line(points[1],points[4]));
			lines.push(new Line(points[3],points[1]));
			lines.push(new Line(points[48],points[47]));
			lines.push(new Line(points[48],points[20]));
			lines.push(new Line(points[10],points[49]));
			lines.push(new Line(points[7],points[49]));
			lines.push(new Line(points[6],points[49]));
			lines.push(new Line(points[9],points[49]));
			break;
		case 11:
			gameover = 1;
			break;
		default:
			break;
	}
	
	if(checkIntersect() == 0)
	{
		loadLevel();
	}
	
}

function checkIntersect()
{
	var intersects = 0;
	for(var i=0;i<lines.length;i++)
	{
		for(var j=0;j<lines.length;j++)
		{
			if(i!=j && lines[i].a != lines[j].b && lines[j].a != lines[i].b && lines[j].a != lines[i].a && lines[j].b != lines[i].b)
			{
				intersects += lineIntersectLine(lines[i].a,lines[i].b,lines[j].a,lines[j].b);
			}
		}
	}
	return intersects;
}

function lineIntersectLine(A,B,E,F) {
    var ip;
    var a1;
    var a2;
    var b1;
    var b2;
    var c1;
    var c2;
 
    a1= B.y-A.y;
    b1= A.x-B.x;
    c1= B.x*A.y - A.x*B.y;
    a2= F.y-E.y;
    b2= E.x-F.x;
    c2= F.x*E.y - E.x*F.y;
 
    var denom = a1*b2 - a2*b1;
    if (denom == 0) {
        return 0;
    }
	
    //ip.x=(b1*c2 - b2*c1)/denom;
    //ip.y=(a2*c1 - a1*c2)/denom;
    //---------------------------------------------------
    //Do checks to see if intersection to endpoints
    //distance is longer than actual Segments.
    //Return null if it is with any.
    //---------------------------------------------------
    
        if(Math.pow((b1*c2 - b2*c1)/denom - B.x, 2) + Math.pow((a2*c1 - a1*c2)/denom- B.y, 2) > Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))
        {
           return 0;
        }
        if(Math.pow((b1*c2 - b2*c1)/denom - A.x, 2) + Math.pow((a2*c1 - a1*c2)/denom - A.y, 2) > Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))
        {
           return 0;
        }
 
        if(Math.pow((b1*c2 - b2*c1)/denom - F.x, 2) + Math.pow((a2*c1 - a1*c2)/denom - F.y, 2) > Math.pow(E.x - F.x, 2) + Math.pow(E.y - F.y, 2))
        {
           return 0;
        }
        if(Math.pow((b1*c2 - b2*c1)/denom - E.x, 2) + Math.pow((a2*c1 - a1*c2)/denom - E.y, 2) > Math.pow(E.x - F.x, 2) + Math.pow(E.y - F.y, 2))
        {
           return 0;
        }
    return 1;
}

document.onmousemove = function(event)
{
	event = event || window.event;
    x = event.pageX - canvas.offsetLeft,
    y = event.pageY - canvas.offsetTop;
	if(win == 0)
	{
		for(var i=0;i<points.length;i++)
		{
			if(((points[i].x-x)*(points[i].x-x) + (points[i].y-y)*(points[i].y-y)) <= 49)
			{
				if(movingCircle == null)
				{
					if(hoveredCircle != null)
					{
						hoveredCircle.hover = false;
					}
						hoveredCircle = points[i];
						points[i].hover = true;
					}
					else
					{
						movingCircle.hover = true;
					}
			}
			else
			{
				if(x>=left && x<=right && y>=up && y<=bottom)
				{
					points[i].hover = false;
				}
			}
		}
		if(movingCircle != null)
		{
			movingCircle.x = x<left?left:(x>right?right:x);
			movingCircle.y = y<up?up:(y>bottom?bottom:y);
		}
	}
}

function randomize()
{
	for(var i=0;i<points.length;i++)
	{
		fi = i/points.length*2*3.14;
		points[i].x = 400 + Math.sin(fi)*200;
		points[i].y = 250 + Math.cos(fi)*200;
	}
}

document.onclick = function(event)
{
	event = event || window.event;
    x = event.pageX - canvas.offsetLeft,
    y = event.pageY - canvas.offsetTop;

}

document.onmousedown = function(event)
{
	event = event || window.event;
    x = event.pageX - canvas.offsetLeft,
    y = event.pageY - canvas.offsetTop;
	if(win == 0)
	{
		for(var i=0;i<points.length;i++)
		{
			if(((points[i].x-x)*(points[i].x-x) + (points[i].y-y)*(points[i].y-y)) <= 49)
			{
				movingCircle = points[i];
				moves++;
			}
		}
		for(var i=0;i<lines.length;i++)
		{
			if((lines[i].a.x == movingCircle.x) && (lines[i].a.y == movingCircle.y))
			{
				lines[i].b.red = true;
			}
			
			if((lines[i].b.x == movingCircle.x) && (lines[i].b.y == movingCircle.y))
			{
				lines[i].a.red = true;
			}
		}
	}
}

document.onmouseup = function(event)
{
	event = event || window.event;
    x = event.pageX - canvas.offsetLeft,
    y = event.pageY - canvas.offsetTop;
	movingCircle.hover = false;
	movingCircle = null;
	for(var i=0;i<points.length;i++)
	{
		points[i].red = false;
	}
}