      //扑克数组
     	var poker=[];
      //花色数组
     	var arr=["hongtao","heitao","meihua","fangkuai"];
      //牌值数组
     	var numarr=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
      //权重数组
      var weightarr=[12,13,1,2,3,4,5,6,7,8,9,10,11]
      //生成一副扑克牌
     	function createPoker(){
     	   var r=[];
     	   var obj={};
            while(r.length!=52){
             var huase=arr[Math.floor(Math.random()*4)];
             var num=Math.floor(Math.random()*13);
             var shuzi=numarr[num];
             var weight=weightarr[num]
             if(!obj[huase+shuzi]){
                r.push({h:huase,s:shuzi,n:weight})
                obj[huase+shuzi]=true;
             }
            }
      var randomNum=Math.floor(Math.random()*52)
 		  var randomNum2=Math.floor(Math.random()*52)
     	r.splice(randomNum,0,{h:'joker',s:'',n:100});
     	r.splice(randomNum2,0,{h:'JOKER',s:'',n:101});
           return r;
     	}
     	poker=createPoker()
      //在页面中生成扑克
     	function setPoker(){
           $.each(poker,function(index,value){
              $("<div></div>")
              .addClass("poker")
              .appendTo(".container")
              .delay(index*30+500)
              .data("msg",{
              	h:value.h,
              	s:value.s,
              	n:value.n
              })
              .animate({opacity:1,top:0})
              .queue(function(){
              	 if(index==poker.length-1){
              	 	$(".start").click(fapai)
              	 }
              	 $(this).dequeue();
              })
           }) 
     	}
     	setPoker()
     	var pokers=$(".container").children();
      var holeCards=pokers.slice(-3)
      pokers.length-=3;
      //发牌函数
     	function fapai(){
           pokers.each(function(index,ele){
              var target,fn;
              var startTop=-125;
              var startLeft=-150;
              if(index%3==0){
              	target=$(".left");
              	fn={left:-260,opacity:0,top:(startTop+=15*index/3)}
              }else if(index%3==1){
              	target=$(".right");
              	fn={left:260,opacity:0,top:(startTop+=15*parseInt(index/3))}
              }else if(index%3==2){
              	target=$(".bottom");
              	fn={top:285,opacity:0,left:(startLeft+=20*parseInt(index/3))}
              }
              $(this)
              .delay(index*30)
              .animate(fn,400)
              .queue(function(){
              	if(!target.is(".bottom")){
              	$(this).appendTo(target).css({
              		left:0,
              		top:"+=125",
              		opacity:1
              	}).dequeue()
               }else{
               	$(this).appendTo(target).css({
              		left:"+=150",
              		top:0,
              		opacity:1
              	}).addClass($(this).data("msg").h).text($(this).data("msg").s).dequeue()
               }
               if(index==pokers.length-1){
                    $(".start").fadeOut(300)
                    $(".container").css("border","0")
                    order()
                    holeCards.each(function(index){
                    $(this).animate({
                     left:index*110-110
                    })
                    })
                    qiangdizhu()    
                }
              })
           }) 
     	}
      //排序函数
     	function order(){
          $(".con").each(function(){
          	 var children=$(this).children();
             var msgarr=children.map(function(){
               return $(this).data("msg")
             })
             msgarr.sort(function(a,b){
               return a.n<b.n;
             })
             var arr=$([]).pushStack(children.toArray().sort(function(a,b){
        return $(a).data("msg").n<$(b).data("msg").n; 
             }))
              arr.each(function(index){
                $(this).data("msg",msgarr[index]);
              })
              arr.appendTo($(this))
             var children=$(this).children();
              if(!$(this).is(".bottom")){
              arr.each(function(index){
          	 	$(this).animate({
                top:index*15
          	 	}).css({zIndex:index+1})
          	  })
              }else{
              arr.each(function(index){
              $(this).animate({
              left:index*20
              }).css({zIndex:index+1})
              }) 
              }
          })
     	}
      //抢地主函数
         function qiangdizhu(){
          $(".pass,.call").css("display","inline-block");
          $(".pass").click(function(){
            $(".pass,.call").hide()
          })
          $(".call").click(function(){
             holeCards.each(function(index){
              $(this)
                .addClass($(this).data("msg").h)
                .text($(this).data("msg").s)
                .delay(1000)
                .animate({top:285,opacity:0})
                .queue(function(){
                  $(this).appendTo(".bottom").css({top:0,opacity:1,left:0});
                  $(this).dequeue();
                })
              $(this)
              .clone(false,true)
              .appendTo(".holecards")
              .css({
                position:"static"
              })   
              $(".pass,.call").hide()
             })
             setTimeout(function(){
              order();
              chupai();
             },1500)
          })
         }
/*游戏准备阶段结束 进入出牌阶段*/     
        //出牌函数
         function chupai(){
           $(".dapai").css("display","inline-block");
              $(".bottom").on("click",".poker",function(e){
              e.preventDefault();
              $(this).toggleClass("chupai");
              if(!$(this).is("chupai")){
                 $(this).removeClass("wrong")
              }
           })
         }
        //打牌函数
        function dapai(){
          var weight=0;
          $(".showarea>.poker").each(function(){
               weight+=$(this).data("msg").n;
          })
          var arr=$(".chupai").map(function(){
              return $(this).data("msg").n;
          })

          if(reg(arr)){
             if(arr.length<=3){
               $(".showarea").empty()
               $(".chupai").appendTo(".showarea").css("position","static").removeClass("chupai").removeClass("wrong")
             }else{
               $(".showarea").empty()
               $(".chupai").appendTo(".showarea").each(function(index){
                  $(this).css({
                    left:index*15
                  })
               }).removeClass("chupai").removeClass("wrong")
             }
             order()
             //circle()
              aidaipai(".right",1000)
              aidaipai(".left",2000)
          }else{
            $(".chupai").addClass("wrong")
          }
          
        }
        $(".dapai").on("click",dapai)
        //选出所有可以出的组合 用于ai出牌
        function zuhe(pos,num){
             var arr=$(pos).find(".poker")
             var obj=[]
             //选出所有能打的一张牌
             if(num==1){
                $(arr).each(function(){
                  obj.unshift($(this))
                })
             }
             return obj;
        }      
        //ai打牌函数
        function aidaipai(pos,time){
         setTimeout(function(){
          var weight=0;
          $(".showarea>.poker").each(function(){
               weight+=$(this).data("msg").n;
          })
           if($(".showarea").find(".poker").length==1){
             var obj=zuhe(pos,1);
             var nowweight=0;
             var nowindex=0;
             var flag=true;
             $(obj).each(function(index,value){
               nowweight=$(this).data("msg").n;
               if(nowweight>weight&&flag==true){
                  flag=false;
                  nowindex=index;
               }   
             })
             if(flag){
             }else{
               $(".showarea").empty()
  obj[nowindex].appendTo(".showarea").css("position","static").addClass(obj[nowindex].data("msg").h).text(obj[nowindex].data("msg").s)
      order()
         }
         }
          
       },time)
        }    
     