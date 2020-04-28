//菜单栏点击高亮效果

$(function () {
    $(".gy_nav_c li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
})

// 浏览器不兼容提示
//提示低版本的浏览器
$(function () {
    var isIE = $.support.leadingWhitespace
    if (isIE) {
        $(".low-version_ie").show();
    }
});


// 文件上传

//当点击添加更多时，增加一个DIV
//先增加两个input

function addFile() {
    var fragment = document.createDocumentFragment();
    var divNode = document.getElementById("container");

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "file");
    fragment.appendChild(newDiv);

    var label = document.createElement("label");
    label.setAttribute("for", "choosefile");
    label.setAttribute("class", "choosefile");

    var newInput = document.createElement("input");
    newInput.setAttribute("type", "file");
    newInput.setAttribute("name", "选择文件");
    newInput.setAttribute("accept", "image/png,image/jpeg,image/bmp,image/jpg");

    label.appendChild(newInput);
    newDiv.appendChild(label);

    var newInput = document.createElement("a");
    newInput.setAttribute("href", "javascript:void(0)");
    newInput.setAttribute("onclick", "delFile()");
    newInput.setAttribute("class", "deletefiles");
    newDiv.appendChild(newInput);

    divNode.appendChild(fragment);
}

function delFile() {
    var parentNode = this.event.target.parentNode;
    if (parentNode != null)
        parentNode.parentNode.removeChild(parentNode);
}


//获取验证码
$(function () {
    //获取短信验证码效果
    var validCode = true;
    $(".msgs").click(function () {
        var time = 30;
        var code = $(this);
        if (validCode) {
            validCode = false;
            code.addClass("msgs1");
            var t = setInterval(function () {
                time--;
                code.html(time + "秒后重新发送");
                if (time == 0) {
                    clearInterval(t);
                    code.html("重新获取");
                    validCode = true;
                    code.removeClass("msgs1");

                }
            }, 1000)
        }
    })
})

