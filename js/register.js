$(function () {
    // 获取验证码
    $(".getCode").on("tap",function(){
        // console.log(111); 
        $.ajax({
            url:"/user/vCode",
            success:function(res){
                console.log(res.vCode);
                
            }
        })
    })

    /*
        实现注册功能
    */ 
    $("#regiserBtn").on("tap",function(){
        var username = $("#userName").val()
        var mobile = $("#moblie").val()
        var password = $("#password").val()
        var againPassword = $("#againPassword").val()
        var vCode = $("#vCode").val()
        
        $.ajax({
            url:"/user/register",
            type:"post",
            beforeSend:function(){
                if(username.trim() == ""){
                    mui.toast("请输入用户名")
                    return false;
                }
                if(!(/^1[3456789]\d{9}$/.test(mobile))){
                    mui.toast("请输入正确的手机号码")
                    return false;
                }
                if(password.length == 0){
                    mui.toast("请输入密码")
                    return false;
                }
                if(password !=againPassword){
                    mui.toast("密码不一致")
                    return false;
                }
                if(vCode.trim() == ""){
                    mui.toast("请输入验证码")
                    return false;
                }
                
            },         
            data:{
                username,
                mobile,
                password,
                vCode
            },
            dataType:"json",
            success:function(res){
                console.log(res);
                if(res.success){
                    setTimeout(function(){
                        mui.toast("注册成功")
                        location.href = "./login.html"
                    },2000)
                    
                }else{
                    mui.toast("注册shibai")
                }
                
            }

        })
        
        
    })
})