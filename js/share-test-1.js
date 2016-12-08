'use strict';

        //share   面向对象方式
         function Share(url,title,desc,imgsrc){
         	this.url=url;
         	this.title=title;
         	this.desc=desc;
         	this.imgsrc=imgsrc;
            this.towhere={
                tosina:'http://service.weibo.com/share/mobile.php',
                //tosina:'http://service.weibo.com/share/share.php',
                toqq:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'
            }
         }

         Share.prototype.toSina=function(){
         	this.share='?url='+encodeURIComponent(this.url)+'&title='+encodeURIComponent(this.title+'-'+this.desc)+'&pic='+encodeURIComponent(this.imgsrc)+'&appkey=&searchPic=true&t='+Math.random();
         	window.open(this.towhere.tosina+this.share,"_blank")
         };

         Share.prototype.toQQZone=function(){
         	this.share='?url='+encodeURIComponent(this.url)+'&title='+encodeURIComponent(this.title)+'&pics='+encodeURIComponent(this.imgsrc)+'&desc='+encodeURIComponent(this.desc)+'&site=&searchPic=true&t='+Math.random();
         	window.open(this.towhere.toqq+this.share,"_blank")
         };


         Share.prototype.toWeixin=function(){    //自定义微信分享  待解决？
            var _this=this;
          //1 配置
         wx.config({
        debug: true,          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '',            // 必填，公众号的唯一标识  
        timestamp:'' ,        // 必填，生成签名的时间戳  
        nonceStr: '',         // 必填，生成签名的随机串  
        signature: '',        // 必填，签名              
        jsApiList: [          //所需要的js接口
            'checkJsApi',             //判断当前客户端版本是否支持指定JS接口
            'onMenuShareTimeline',    //分享到朋友圈
            'onMenuShareAppMessage',  //分享给朋友
            'onMenuShareQQ',          //分享到QQ
            'onMenuShareWeibo',       //分享到腾讯微博
            'onMenuShareQZone'        //分享到QQ空间
        ]
      });
            //2分享到朋友圈
            wx.onMenuShareTimeline({
             title:_this.title+_this.desc, // 分享标题
             link:_this.url,               // 分享链接
             imgUrl:_this.imgsrc,          // 分享图标
             success: function () { 
                      // 用户确认分享后执行的回调函数
                      alert(1)
             },
             cancel: function () { 
                      // 用户取消分享后执行的回调函数
            }     
            });

         };



        