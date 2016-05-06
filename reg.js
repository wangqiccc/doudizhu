 //规则判断
        function reg(arr){
          arr=arr.toArray();
            if(arr.length==1){
          //单张
               return true;
            }
            else if(arr.length==2){
          //对子 王炸      
               if(arr[0]==arr[1]||(arr[0]==101&&arr[1]==100)){
                return true;
               }else{
                return false;
               }
            }
            else if(arr.length==4){
          //走四张   炸弹 三带一  
              var str=arr.join("");
              var reg=/(\d|\d{2})\1{2}/;
              if(reg.test(str)){
                return true;
              }else{
                return false;
              }
            }
          //走五张以上 顺子 双龙  四带二 飞机 
            else if(arr.length>=5){
              if(arr.length%2==0){
                //顺子 双龙
                  if((arr[0]-arr.length==arr[arr.length-1]-1)||arr[0]-arr.length/2==arr[arr.length-1]-1&&arr[0]!=13){
                    return true;
                  }else{
                    return false;
                  }
              }else{
                //顺子
                  if(arr[0]-arr.length==arr[arr.length-1]-1&&arr[0]!=13){
                    return true;
                  }else{
                    return false;
                  }
              }
              if(arr.length==6){
                //四带二
                var str=arr.join("");
                var reg=/(\d)\1{3}/;
                if(reg.test(str)){
                  return true;
                }else{
                  return false;
                }
              }
              if(arr.length==8){
               //飞机
               var str=arr.join("");
               var reg=/(\d)\1{2}(\d)\2{2}(?:(\d)\3{2})*/
               if(reg.test(str)){
                return true;
               }else{
                return false;
               }
              }
            }    
            else{
           //其他情况   
              return false;
            }
          
          }