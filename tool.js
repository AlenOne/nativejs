//!! Boolean转化
//"" +变量 转化为字符串
//+= 转化为数值




//判断素数
function IsPrime(num){
	var flage = true;
	for(var i = 2; i <= parseInt(num/2); i++){
		if( num % i == 0 ){
			flage = false;
			break;
		}
	
	}
	return flage;

}


//判断闰年
function IsLeapYear(year){
	if((year % 4 == 0&& year % 100 != 0 )|| year % 400 ==0){
		return true;
	}
	return false;
}

//计算阶乘
function Factorial(n){
	var sum = 1;
	for(var i = 1; i <= n; i++){
		sum *=i;
	
	}
	return sum;

}


//递归调用

//递归时一定要有一个分支是不用递归的，就要有一个结束值。
//否则将无限循环，就无法结束递归。
function factorial(n){
	if(n == 1){
		return 1;
	}
	var res = n*factorial(n-1);
	return res;

}

//斐波那契数列

function fabnoacci(n){
	if(n == 1 || n == 2){
		return 1;
	}
	return factorial(n - 1)+factorial(n - 2);
}


//冒泡排序
function bubbleSort(arr){
	
	var length = arr.length;
	var temp = 0;
	for(var i = 0; i < length-1; i++){
		for(var j = 0; j < length-i-1; j++){
			if(arr[j] > arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	
}


//判断某个月的天数  输入当前日期对象 返回当前月份天数


function MonthDays(date){
	var ms = date.getTime();
	date.setMonth(date.getMonth()+1);
	var temp = date.getTime() - ms;
	var day = Math.floor(temp/(24*60*60*1000));
	return day;
}


//判断那两个日期相差的天数  参数1：日期1    参数2;日期2

function DifferDays(date1,date2){
	var temp = Math.abs(date1 - date2);
	var day = Math.floor(temp/(24*60*60*1000));
	return day;
}


//判断N天以后的日期,参数1是当前日期，参数2是N 返回当地各式日期
function AfterDate(date,n){
	var day = date.getDate();
	day +=n;
	date.setDate(day);
	return date.toLocaleString();
	}
	
	
	 
//日期格式化输出   "2016-8-2"

function outputDate(date){
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var res = year+"-"+judge((month+1))+"-"+judge(day)+"&bpsp"+judge(h)+":"+judge(m)+":"+judge(s);
	
	return year+"-"+(month+1)+"-"+day;
}


//格式化月日时分秒的输出 
//两位数直接输出，一位数补0输出
function  judge(num){
	if(num < 10){
		return "0"+num;
	
	}else{return num;}
}

//通过name获取所有相同name属性的元素  ,返回数组
function getByName(name){
	var arr=[];
	var NameAll = document.getElementsByTagName("*");
	for(var i = 0; i < NameAll.length; i++){
		if(name == NameAll[i].getAttribute("name")){
			arr.push(NameAll[i]);
		}

	}
	return arr;
}

//删除节点中的所有文本节点  输入节点集合，返回元素节点集合

function getElement(nodes){
	var res = [];
	for(var i = 0; i<nodes.length;i++){
		if(nodes[i].nodeType !== 3){
			res.push(nodes[i]);
		}
	}
	return res;
}


//事件绑定的兼容性  针对IE8及其以下
//参数：元素   ， 事件名称  ，  响应函数名称
function  bindEvent(dom,eventName,func){
	if(dom.addEventListener){
		dom.addEventListener(eventName,func,false);
	}else{
		dom.attachEvent("on"+eventName,func);
	}
	
}


//元素拖拽   参数是要拖动的元素(必须是带有定位的元素，不然不能改变位置)

function drag(dom){
	
	dom.onmousedown=function(e){
	var eve = e || window.event;
	 le = eve.offsetX;
	 t = eve.offsetY;
		document.onmousemove = function(e){
			var scrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft ||document.body.scrollLeft;
			var maxleft =window.innerWidth+scrollLeft-dom.offsetWidth; 
			var maxtop = window.innerHeight+scrollTop - dom.offsetHeight;
			var eve = e || window.event;
			var left = eve.clientX+scrollLeft-le;
			var top = eve.clientY+scrollTop-t;
				if(left < 0){
					left = 0;
				}else if(left > maxleft){
					left = maxleft;
				}
				
				if(top < 0){
					top = 0;
				}else if(top > maxtop){
					top = maxtop;
				}
			
			dom.style.left=left+"px";
			dom.style.top=top+"px";
			
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			}
			//屏蔽默认响应
			return false;
		}

	}

}




//获取非行内样式
//参数1：元素对象    参数2：属性名
//返回非行内样式的属性值
function getStyle(obj,attr){    //获取非行间样式，obj是对象，attr是值
    if(obj.currentStyle){   //针对ie获取非行间样式
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];   //针对非ie
    };
};


//任意值的链式运动框架
// obj  运动对象
// element 属性名
// Target  要变成的值
// fun  函数结束时执行的函数
//  !!!!要和getStyle(获取非行内样式函数)一起使用

function startMove(obj,element,Target,fun){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//获取非行内样式值
		var cur = 0;
		
		//判断属性是否为透明度
		if(element == "opacity"){
			cur=parseInt(parseFloat(getStyle(obj,element))*100);
		}else{
			cur=parseInt(getStyle(obj,element));
		}
		
		//控制运动速度
		var speed = (Target - cur )/6;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur == Target){
			clearInterval(obj.timer);
			if(fun)fun();
			
		}else{
			//判断是否为透明度再来设置
			if(element == 'opacity'){
				obj.style.filter="alpha(opacity="+(cur+speed)+")";
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[element]=cur+speed+"px";
			}
			
		}
	},30);
}




//完美运动框架

function startMove2(obj,json,fun){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true ; //假设全部都走完了
		
		for(var attr in json){
		//获取非行内样式值
		var cur = 0;
		
		//判断属性是否为透明度
		if(attr == "opacity"){
			cur=parseFloat(getStyle(obj,attr))*100;
		}else{
			cur=parseInt(getStyle(obj,attr));
		}
		
		//控制运动速度   可以随便设置
		var speed = (json[attr] - cur )/6;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur != json[attr]){
			bStop = false;
		}
		
		
		
		//判断是否为透明度再来设置
		if(attr == 'opacity'){
			obj.style.filter="alpha(opacity="+(cur+speed)+")";
			obj.style.opacity=(cur+speed)/100;
		}else{
			obj.style[attr]=cur+speed+"px";
		}
			
		
		} 
		if(bStop){
			clearInterval(obj.timer);
			
			if(fun){
				fun();
			}
			return ;
		}
		
	},30);
}





