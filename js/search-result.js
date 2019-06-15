
$(function () {
    // 获取搜索关键字
    var keyWord = location.href.split("=")[1]
    // console.log(keyWord);
    var that
    var page = 1
    var html = ""
    var pricSell = 1
    var num = 1
    
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    function getData() {
        that = this
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                "page": page++,
                "pageSize": 3,
                "proName": keyWord,
                "price": pricSell,
                "num": num
            },
            success: function (res) {
                console.log(res);

                // console.log(html);
                if (res.data.length > 0) {
                    // console.log(html);
                    
                    html = template("searchResult", res)
                    // console.log(html);
                    // append方法在原来基础上追加
                    $("#resultSearchList").append(html)
                    that.endPullupToRefresh(false);
                } else {
                    that.endPullupToRefresh(true);
                }

            }


        })
    }

    /*
        给价格销量绑上轻敲事件
        判断price/num是否等于1
        重置html
        重置页数
        重置上拉加载
        重新发送Ajax请求
    */
    $("#price").on("tap", function () {
        //    console.log(111);
        pricSell = (pricSell == 1) ? 2 : 1
        page = 1;
        html = ""
        mui('#refreshContainer').pullRefresh().refresh(true);
        $("#resultSearchList").html("")
        console.log($("#resultSearchList"));
        
        
        getData.apply(that)
    })
})