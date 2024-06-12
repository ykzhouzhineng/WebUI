<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width , initial-scale=1 , user-scalable=no">
    <link rel="stylesheet" href="../css/phase6.css">
    <title>UI的个性化键盘控制——巧妙应用keydown和keyup键盘底层事件</title>
</head>

<body>
    <header>
        <p id="book">
            《我的毕设题目》
        </p>
    </header>
    <nav>
        <button id = "prev">向前</button>
        <button id = "next">向后</button>
        <button>其他</button>
    </nav>


    <main id="main">
        <div id="bookface">
            本利代码的运行需要超过1千像素宽度的宽屏<br>
            建议使用有键盘的PC运行和调试代码<br>
            当然拖动/滑动超过100像素的UI互动依然有效！
        </div>
    </main>

    <footer>

        CopyRight 周志能 江西科技师范大学 2024--2025

    </footer>
    <div id="aid">
        用户键盘响应区
        <p id="typeText"></p>
        <p id="keyStatus"></p>
    </div>
    <script src="../js/phase6.js"></script>

</body>

</html>
