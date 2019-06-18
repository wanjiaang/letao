$(function () {
    /** 
     * 
     * 点击确认按钮修改密码
     * 获取原/新/确认验证码
     * 点击获取验证码
     * */
    $("#confiremBtn").on("tap", function () {
        var oldPassword = $("#oldPassword").val()
        var newPassword = $("#newPassword").val()
        var confirmPassword = $("#confirmPassword").val()
        var vCode = $("#vCode").val()
       $.ajax({
           url:"/user/updatePassword",
           type:"post",
           data:{
            oldPassword,
            newPassword,
            vCode
           },
           beforeSend:function(){
               if(oldPassword.trim() == ""){
                mui.alert("请输入原密码")
                return false
               }
               if(newPassword.trim() == ""){
                mui.alert("请输入新密码")
                return false
               }
               if(newPassword == oldPassword){
                mui.alert("不能与原密码相同")
                return false
               }
               if(!newPassword == confirmPassword){
                mui.alert("两次密码不一致")
                return false
               }
               if(vCode.trim() == ""){
                mui.alert("请输入验证码")
                return false
               }
           },
           success:function(res){
            console.log(res);
            mui.toast("修改成功")
            location.href = "login.html"
            
           }
       })
        
    });
    $(".getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                mui.alert(res.vCode)
            }
        })
        
    })
})