
$(function () {
    //var keyArr = JSON.parse(localStorage.getItem("ltkey")) || '[]';
    var keyArr = []
    if (localStorage.getItem("ltkey")) {
        // 因为local Storage中存的是字符串 所以转换为对象
        keyArr = JSON.parse(localStorage.getItem("ltkey"))
    }

    if (keyArr.length > 0) {
        var html = ""
        keyArr.forEach(function (value) {
            html += `<li class="mui-table-view-cell">${value}</li>`
            // console.log(html);

            $("#historyList").html(html)
        })
    }
    $("#searchBtn").on("click", function () {
        var keyWord = $("#searchBtn").siblings().val()
        // console.log(keyWord);
        if (keyWord.trim().length == 0) {
            mui.alert("请输入内容")
            return
        }
        //将用户输入的值存储到浏览器(localStorage)当中
        keyArr.push(keyWord)
        //因为localStorage当中只能存储字符串格式  所以把keyArr用json.stringify方法转为字符串
        localStorage.setItem("ltkey", JSON.stringify(keyArr))

        location.href = `./search-result.html?keyWord=${keyWord}`
    })

    /* 
        清空历史记录 
        先清空页面动态渲染的结构
        在清空local Storage里存储的记录
    */
    $("#clearList").on("click", function () {
        mui.confirm("确认清除历史记录吗?",function(data){
            console.log(data);
            
            if(data.index){
                $("#historyList").html("")
                localStorage.removeItem("ltkey")
                
            }
        });
    })

})
