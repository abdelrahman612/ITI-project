window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

     var x = [195,150,160,195,160];
     var y = [149,170,170,149,145];
     var mous = 0.8;
     var score = 0;
     var xbarir=1300;
     var ybarir=500;
     
     

    var myScore=document.getElementById("printScore");
    var c = document.getElementById('mycanvas'),
		ctx = c.getContext('2d'),
		cw = c.width = window.innerWidth,
		ch = c.height = window.innerHeight,
		pi2 = Math.PI * 2,
		rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);},
		things = [],
		thingCount = 100,

		Thing = function(i){
		this.vx = -(rand(10, 10000)/1000);
		this.vy = 0;
		this.x = rand(0, cw);
		this.y = ch/2 - Math.abs(this.vx)*8; 
		this.radius = Math.abs(this.vx*3);
		this.hue = 0;
		this.saturation = 0;
		this.lightness = 100;
		this.alpha = 0.65;
	}
	var heightBarrierup = Math.random()*250+100;;
    var heightBarrierdown = Math.random()*250+100;

function barir(varx,vary)
	{if (xbarir<=0)
		{xbarir=1300;
		 heightBarrierup = Math.random()*250+80;
		  heightBarrierdown = Math.random()*250+80;
		}
	 if (x[1]==xbarir)
		 {
			 if (y[1]<=heightBarrierup)
				 {
					 window.alert("  Game Over and your score is "+ score);
					 score=0;
				 }
			 else if (y[1]>=c.height-heightBarrierdown-50)
				 {
					 
					 window.alert("  Game Over and your score is "+ score);
					 score=0;
                 }

		 }
        ctx.fillStyle = "black";
	    ctx.fillRect(varx,vary,50,heightBarrierup-50);
	    ctx.fillRect(varx,c.height-heightBarrierdown,50,heightBarrierdown);
		xbarir-=5;
	}
  
	window.setInterval(function(){
		score++;
		myScore.value = score;
		if (mous==0.8)
		{mous=-1.9;}
		else
		{mous=0.8;}},250);

function whenprres(e)
{
   if (e.keyCode==37)
	   {
            console.log("left");
		   if (x[1]>50){
		   for (var i=0;i<x.length;i++)
			   {
				   x[i]-=20;
			   }
		   }
	   }
	else if (e.keyCode==38)
		{
			console.log("up");
			if (y[1]>50)
			{
			 for (var i=0;i<y.length;i++)
			   {
				   y[i]-=20;
			   }
		}
	}
	else if (e.keyCode==39)
		{
			console.log("right");
			if (x[1]<1300){
			for (var i=0;i<x.length;i++)
			   {
				   x[i]+=20;
			   }}
		}
	else if (e.keyCode==40)
		{
		    console.log("down");
			if (y[1]<610){
			 for (var i=0;i<y.length;i++)
			   {
				   y[i]+=20;
			   }
		}
			
		}
}
 function buildBackman(ctx){
	 
ctx.fillStyle = "rgb(255, 255, 0)";
ctx.strokeStyle = "rgb(255, 200, 0)";

ctx.beginPath();
ctx.moveTo(x[0], y[0]);
ctx.arc(x[1], y[1],50, 5.8, mous, true);
ctx.lineTo(x[2], y[2]);
ctx.lineTo(x[3], y[3]);
ctx.fill();
ctx.stroke();

ctx.fillStyle = "rgb(200, 150, 0)";

ctx.beginPath();
ctx.arc(x[4], y[4], 10, 0, Math.PI*2, true);
ctx.fill();

ctx.fillStyle = "rgba(0, 150, 0, 0.2)";
ctx.strokeStyle = "rgb(0, 150, 0)";
	 
 }

Thing.prototype = {
  update: function(){ 
    this.x += this.vx;
    this.y += this.vy;
	document.addEventListener("keydown",whenprres,true);
	
    if(this.x - this.radius > cw){ this.x = -this.radius; }
    if(this.y - this.radius > ch){ this.y = -this.radius; }
    if(this.x + this.radius < 0){ this.x = cw + this.radius; }
    if(this.y + this.radius < 0){ this.y = ch + this.radius; }
		   
  },
  render: function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, pi2, false);  
    ctx.fillStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    ctx.fill(); 
	  
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(1, 0.25);
    ctx.beginPath();
    ctx.arc(0, -this.vx*50, this.radius, 0, pi2, false);  
    ctx.fillStyle = 'hsla('+this.hue+', '+this.saturation+'%, 0%, '+this.alpha/8+')';
    ctx.fill();
    ctx.restore();  
	  
  }
}
  
var updateThings = function(){
	var i = things.length;
  while(i--){
  	things[i].update(); 
  }
}
      
var renderThings = function(){
  var i = things.length;
  while(i--){
  	things[i].render(); 
  } 
}
var topress = function(){
  var i = things.length;
  while(i--){
  	things[i].press(); 
  } 
}

var loop = function(){
  requestAnimFrame(loop, c);
  ctx.clearRect(0, 0, cw, ch);
  updateThings();
  renderThings();
  buildBackman(ctx);
  barir(xbarir,0);
}
    
for(var i = 0; i < thingCount; i++){
  things.push(new Thing(i));    
}    

document.body.appendChild(c);
loop();
/****************************obj***************************/
