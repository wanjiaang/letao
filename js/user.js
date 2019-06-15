var html = ""
$.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    async: false,
    success: function (res) {
        console.log(res);
        if (res.error) {
            location.href = "./login.html"
            return
        }
        html = `<li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="./images/user.jpg">
            <div class="mui-media-body">
                ${res.mobile}
                <p class='mui-ellipsis'>账号:${res.username}</p>
            </div>
        </a>
    </li>`
        
    }
})

$(function () {
    /*
    当点击退出登录返回首页

    */

    $("#logOut").on("click", function () {
        $.ajax({
            url: "/user/logout",
            type: "get",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    setTimeout(() => {
                        location.href = "index.html"
                    }, 1000);
                }
            }
        })
    })
    $("#ul").html(html)
})
