
$(function () {
    var personal;
    $.ajax({
        url: "/address/queryAddress",
        type: "get",
        success: function (res) {
            // console.log(res);
            personal = res
            var html = template("adressListTpl", { result: res })
            $("#PIM").html(html)
        }
    })
    $("#PIM").on("tap", ".mui-btn-red", function () {
        let id = $(this).attr("data-id")
        console.log(id);
        let li = $(this).parents("li")[0]
        mui.confirm("确认删除吗?", res => {
            if (res.index) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id,
                    },
                    success: result => {
                        console.log(result);
                        if (result.success) {
                            $(this).parents("li").remove()
                        }

                    }
                })
            } else {
                mui.swipeoutClose(li)
            }

        })


    })

    $("#PIM").on("tap", ".mui-btn-blue", function () {
        // console.log(personal);
        let id = $(this).attr("data-id")
        // console.log(id);
        
        for (let i = 0; i < personal.length; i++) {
            if(personal[i].id == id){
                // console.log(personal[i].id);
                localStorage.setItem("adressPIM",JSON.stringify(personal[i]))
                break;
            }
        }

        location.href = "./addressAdd.html?id=1"
    })
})