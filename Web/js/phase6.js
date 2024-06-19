var UI = {};
if (window.innerWidth > 600) {
    UI.appWidth = 600;
} else {
    UI.appWidth = window.innerWidth;
}


UI.appHeight = window.innerHeight;

let baseFont = UI.appWidth / 20;
//通过改变body对象的字体大小，这个属性可以影响其后代
document.body.style.fontSize = baseFont + "px";
//通过把body的高度设置为设备屏幕的高度，从而实现纵向全屏
//通过CSS对子对象百分比（纵向）的配合，从而达到我们响应式设计的目标
document.body.style.width = UI.appWidth - baseFont + "px";
document.body.style.height = UI.appHeight - baseFont * 5 + "px";
if (window.innerWidth < 1000) {
    $("aid").style.display = 'none';
}
$("aid").style.width = window.innerWidth - UI.appWidth - baseFont * 3 + 'px';
$("aid").style.height = UI.appHeight - baseFont * 3 + 'px';

//尝试对鼠标和触屏设计一套代码实现UI控制
var Pointer = {};
Pointer.isDown = false;
Pointer.x = 0;
Pointer.deltaX = 0;
{ //Code Block Begin
    let handleBegin = function (ev) {
        Pointer.isDown = true;

        if (ev.touches) {
            console.log("touches1" + ev.touches);
            Pointer.x = ev.touches[0].pageX;
            Pointer.y = ev.touches[0].pageY;
            console.log("Touch begin : " + "(" + Pointer.x + "," + Pointer.y + ")");
            $("bookface").textContent = "触屏事件开始，坐标：" + "(" + Pointer.x + "," + Pointer.y + ")";
        } else {
            Pointer.x = ev.pageX;
            Pointer.y = ev.pageY;
            console.log("PointerDown at x: " + "(" + Pointer.x + "," + Pointer.y + ")");
            $("bookface").textContent = "鼠标按下，坐标：" + "(" + Pointer.x + "," + Pointer.y + ")";
        }
    };
    let handleEnd = function (ev) {
        Pointer.isDown = false;
        ev.preventDefault()
        //console.log(ev.touches)
        if (ev.touches) {
            $("bookface").textContent = "触屏事件结束!";
            if (Math.abs(Pointer.deltaX) > 100) {
                $("bookface").textContent += "，这是有效触屏滑动！";
            } else {
                $("bookface").textContent += " 本次算无效触屏滑动！";
                $("bookface").style.left = '7%';
            }
        } else {

            $("bookface").textContent = "鼠标松开!";
            if (Math.abs(Pointer.deltaX) > 100) {
                $("bookface").textContent += "，这是有效拖动！";
            } else {
                $("bookface").textContent += " 本次算无效拖动！";
                $("bookface").style.left = '7%';
            }
        }
    };
    let handleMoving = function (ev) {
        ev.preventDefault();
        if (ev.touches) {
            if (Pointer.isDown) {
                console.log("Touch is moving");
                Pointer.deltaX = parseInt(ev.touches[0].pageX - Pointer.x);
                $("bookface").textContent = "正在滑动触屏，滑动距离：" + Pointer.deltaX + "px 。";
                $('bookface').style.left = Pointer.deltaX + 'px';
            }
        } else {
            if (Pointer.isDown) {
                console.log("Pointer isDown and moving");
                Pointer.deltaX = parseInt(ev.pageX - Pointer.x);
                $("bookface").textContent = "正在拖动鼠标，距离：" + Pointer.deltaX + "px 。";
                $('bookface').style.left = Pointer.deltaX + 'px';
            }
        }
    };

    $("bookface").addEventListener("mousedown", handleBegin);
    $("bookface").addEventListener("touchstart", handleBegin);
    $("bookface").addEventListener("mouseup", handleEnd);
    $("bookface").addEventListener("touchend", handleEnd);
    $("bookface").addEventListener("mouseout", handleEnd);
    $("bookface").addEventListener("mousemove", handleMoving);
    $("bookface").addEventListener("touchmove", handleMoving);


    //提出问题：研究利用"keydown"和"keyup"2个底层事件，实现同时输出按键状态和文本内容
    $("body").addEventListener("keydown", function (ev) {
        ev.preventDefault(); //增加“阻止事件对象的默认事件后”，不仅 keypress 事件将不再响应，而且系统的热键, 如“F5刷新页面/Ctrl+R ”、“F12打开开发者面板”等也不再被响应
        let k = ev.key;
        let c = ev.keyCode;
        $("keyStatus").textContent = "按下键 ：" + k + " ，" + "编码 ：" + c;
    });
    $("body").addEventListener("keyup", function (ev) {
        ev.preventDefault();
        let key = ev.key;
        $("keyStatus").textContent = key + " 键已弹起";
        if (printLetter(key)) {
            $("typeText").textContent += key;
        }
        function printLetter(k) {
            if (k.length > 1) { //学生须研究这个逻辑的作用
                return false;
            }
            let puncs = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', ',', '.', ';', ';', '<', '>', '?', '/', ' ', '\'', '\"'];
            if ((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9')) {
                console.log("letters");
                //字母或数字
                return true;
            }
            for (let p of puncs) {
                if (p === k) {
                    console.log("puncs");
                    return true;
                }
            }
            return false;
            //提出更高阶的问题，如何处理连续空格和制表键tab？
        }	//function printLetter(k)
    });
} //Code Block  End
function $(ele) {
    if (typeof ele !== 'string') {
        throw ("自定义的$函数参数的数据类型错误，实参必须是字符串！");
        return
    }
    let dom = document.getElementById(ele);
    if (dom) {
        return dom;
    } else {
        dom = document.querySelector(ele);
        if (dom) {
            return dom;
        } else {
            throw ("执行$函数未能在页面上获取任何元素，请自查问题！");
            return;
        }
    }
} //end of $

var myDiv = document.getElementById('bookface');
var images = [
    "../imgs/CSS.jpg",
    "../imgs/CS.jpg",
    "../imgs/CT.jpg",
    "../imgs/Git.jpg",
    "../imgs/internet.jpg",
    "../imgs/javaScript.jpg",
    "../imgs/learnCSS.jpg",
    "../imgs/linuxCMD.jpg",
    "../imgs/STEM.jpg",
    "../imgs/ted.jpg",
    "../imgs/UML.jpg",
    "../imgs/videos.jpg",
    "../imgs/webProgramming.jpg",
];
//当前位置
var currentImageIndex = 0;

document.getElementById("next").onclick = function () {
    currentImageIndex++;
    if (currentImageIndex == images.length) currentImageIndex = 0;
    myDiv.style.backgroundImage = 'url(' + images[currentImageIndex] + ')';
};
document.getElementById("prev").onclick = function () {
    currentImageIndex--;
    if (currentImageIndex == -1) currentImageIndex = images.length - 1;
    myDiv.style.backgroundImage = 'url(' + images[currentImageIndex] + ')';

};


