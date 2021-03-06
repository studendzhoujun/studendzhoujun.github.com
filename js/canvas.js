/**
  *  by zhoujun
  *   
  **/
  class Wind{
    constructor(obj,pointNum){
     this.obj=obj;
     this.gc=obj.getContext('2d');
     this.oH=document.documentElement.clientHeight;
     this.oW=document.documentElement.clientWidth;
     this.pointNum=pointNum;
     this.arrPoint=[];
     this.oldPoint=[];
     this.init();
   }
   init(){
    this.obj.width=this.oW;
    this.obj.height=this.oH;
    this.obj.style.background='#111';
    this.addPoint();
  }
        /*
        *[{x:num,y:num,speedX:num,speedY:num},.......]
        */
        addPoint(){
          var num=this.pointNum;
          var _this=this;
          for(var i=0;i<num;i++){
            _this.arrPoint.push({
              x:_this.rnd(0,_this.oW),
              y:_this.rnd(0,_this.oH),
              speedX:_this.rnd(-10,10),
              speedY:_this.rnd(-10,10)
            });
          }
        }
        rnd(n,m){
          return n+parseInt(Math.random()*(m-n));
        }
        draw(){
          var gc=this.gc;
          gc.clearRect(0,0,this.oW,this.oH);
          gc.font="50px Verdana";
          // 创建渐变
          var gradient=gc.createLinearGradient(0,0,500,0);
          gradient.addColorStop("0","magenta");
          gradient.addColorStop("0.5","blue");
          gradient.addColorStop("1.0","red");
         // 用渐变填色
         gc.fillStyle=gradient;
         gc.fillText('studentzhoujun',10,50);
         this.arrPoint.forEach(function(item,index){
          gc.fillRect(item.x,item.y,0,0);
        });
       }
       move(){
        var _this=this;
        var arr=[];
        this.arrPoint.forEach(function(item,index){
          item.x+=item.speedX;
          item.y+=item.speedY;
          if(item.x<0){
            item.x=0;
            item.speedX*=-1;
          }else if(item.x>_this.oW){
            item.x=_this.oW;
            item.speedX*=-1;
          }
          if(item.y<0){
            item.y=0;
            item.speedY*=-1;
          }else if(item.y>_this.oH){
            item.y=_this.oH;
            item.speedY*=-1;
          }
          arr.push({
            x:item.x,
            y:item.y
          })
        });
        this.oldPoint.push(arr);
        while(this.oldPoint.length>40){
          this.oldPoint.shift();
        }
      }
      connectLine(){
        var gc=this.gc;
        var _this=this;
        var points=this.arrPoint;
        gc.beginPath();
        gc.moveTo(points[0].x,points[0].y);
        points.forEach(function(point){
          gc.lineTo(point.x,point.y);
        });
        gc.closePath();
        gc.stroke();
      }
      connectSame(gc,points){
        points.forEach(function(item,index){
          gc.lineTo(item.x,item.y);
        })
      }
      connetOld(){
        var gc=this.gc;
        var _this=this;
        var oldPoint=this.oldPoint;
        oldPoint.forEach(function(item,index){
         var opacity=(index+1)/(oldPoint.length+1);
         gc.beginPath();
         gc.strokeStyle=`rgba(232,179,17,${opacity})`;
         gc.moveTo(item[0].x,item[0].y);
         _this.connectSame(gc,item);
         gc.closePath();
         gc.stroke();
       });
      }

    }
    