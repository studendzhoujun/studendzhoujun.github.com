/**
  *  by zhoujun
  *   
  **/
const oC=document.querySelector('#box');
const oContent=document.querySelector('#content');
let c=new Wind(oC,5);
let moveTimer=null;
moveTimer=setInterval(function(){
	c.draw();
	c.move();
	c.connectLine();
	c.connetOld();
},16);
setTimeout(function(){
	oC.className='zoomOut';
	clearInterval(moveTimer);
	setTimeout(function(){
	  document.body.removeChild(oC);
	  oContent.style.display='block';
	  oContent.className='content bounceInLeft';
	},1500)
},5000)
