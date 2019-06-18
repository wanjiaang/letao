
$(function () {

    /** 
     * 通过新添地址跳转后面加个id   修改地址后面加不同id
     * 通过location.href获取到地址在字符串截取地址中的id
     * 把id转换数值进行判断如果是新增地址就不通过localStroage获取本地存储的字符串渲染到页面
     * 如果是修改地址进入到本地存储中获取字符串转换为数组
     * 经过模板字符串进行拼接  渲染到页面当中
     * 
     * 
     * */ 
    let http = Number(location.href.split("=")[1])
    // console.log(http);
    if (http) {
        if (localStorage.getItem("adressPIM")) {
            var personal = JSON.parse(localStorage.getItem("adressPIM"))
               console.log(personal);

            var html = template("add", personal)
            // console.log(html);
            $("#form").html(html)
        }
    } else {
        var html = template("add", {})
        // console.log(html);
        $("#form").html(html)
    }
    // 创建3级列表
    var picker = new mui.PopPicker({ layer: 3 });
    picker.setData(cityData3);
    // 当点击详细地址时展示到详细地址表单中
    $("#address").on("tap", function () {
        picker.show(function (cityData3) {
            // console.log(cityData3);

            let html = ""
            cityData3.forEach(element => {
                html += element.text
            });
            // console.log(html);

            $("#address").val(html)

        })
    })
    /**
     * 当点击确认时获取各表单中的val值
     * 通过ajax请求添加收货地址到收货地址管理页面中
     *
     *  */ 
    $("#confirm").on("tap", function () {
        // console.log(11);
        let url
        
        let recipients = $("#recipients").val()
        let postcode = $("#postcode").val()
        let address = $("#address").val()
        let addressDetail = $("#addressDetail").val()
        let data = {
            recipients,
            postcode,
            address,
            addressDetail
        }
        if (http) {
            url = "/address/updateAddress"
            data.id = personal.id
        } else {
            url = "/address/addAddress"
        }
        $.ajax({
            url: url,
            type: "post",
            data: data,
            beforeSend: function () {
                if (recipients.trim() == "") {
                    mui.toast("请输入名字")
                    return false
                }
                if (postcode.trim() == "") {
                    mui.toast("请输入邮编")
                    return false
                }
                if (address.trim() == "") {
                    mui.toast("请输入省市区")
                    return false
                }
                if (addressDetail.trim() == "") {
                    mui.toast("请输入详细地址")
                    return false
                }

            },
            success: function (res) {
                // console.log(res);
                if(http){
                    mui.alert("修改成功")
                }else{
                    mui.alert("添加成功")
                }
                setTimeout(() => {
                    
                    location.href = "./addressList.html"
                }, 2000);

            }
        })
    })



})