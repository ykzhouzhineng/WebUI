
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
document.body.style.height = UI.appHeight - baseFont * 4 + "px";
if (window.innerWidth < 1000) {
    $("aid").style.display = 'none';
}
$("aid").style.width = window.innerWidth - UI.appWidth - baseFont * 3 + 'px';
$("aid").style.height = UI.appHeight - baseFont * 3 + 'px';

//尝试对鼠标设计UI控制
var mouse = {};
mouse.isDown = false;
mouse.x = 0;
mouse.y = 0;
mouse.deltaX = 0;
$("bookface").addEventListener("mousedown", function (ev) {
    mouse.isDown = true;
    mouse.x = ev.pageX;
    mouse.y = ev.pageY;
    console.log("mouseDown at x: " + "(" + mouse.x + "," + mouse.y + ")");
    $("bookface").textContent = "鼠标按下，坐标：" + "(" + mouse.x + "," + mouse.y + ")";
});
$("bookface").addEventListener("mouseup", function (ev) {
    mouse.isDown = false;

    $("bookface").textContent = "鼠标松开!";
    if (Math.abs(mouse.deltaX) > 100) {
        $("bookface").textContent += "，这是有效拖动！";
    } else {
        $("bookface").textContent += " 本次算无效拖动！";
        $("bookface").style.left = '7%';
    }

});
$("bookface").addEventListener("mouseout", function (ev) {
    ev.preventDefault();
    mouse.isDown = false;

    $("bookface").textContent = "鼠标松开!";
    if (Math.abs(mouse.deltaX) > 100) {
        $("bookface").textContent += " 这次是有效拖动！";
    } else {
        $("bookface").textContent += " 本次算无效拖动！";
        $("bookface").style.left = '7%';
    }

});
$("bookface").addEventListener("mousemove", function (ev) {
    ev.preventDefault();
    if (mouse.isDown) {
        console.log("mouse isDown and moving");
        mouse.deltaX = parseInt(ev.pageX - mouse.x);
        $("bookface").textContent = "正在拖动鼠标，距离：" + mouse.deltaX + "px 。";
        $('bookface').style.left = mouse.deltaX + 'px';
    }

});
$("body").addEventListener("keypress", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    let s1 = "按键是：";
    let s2 = "编码是："
    $("keyboard").textContent = s1 + k + ";" + s2 + c;
});


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

