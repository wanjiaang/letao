$(function(){
    
  
  $("#regiserBtn").on("click",function(){
    let username = $("#username").val()
    let password = $("#password").val()
    console.log(username);
    $.ajax({
        url:"/user/login",
        type:"post",
        beforeSend:function(){
            if(!username.trim()||!password.trim()){
                mui.toast("登陆失败")
                return false;
            }
        },
        data:{
            username,
            password
        },
        dataType:"json",
        success:function(res){
            console.log(res);
            setTimeout(() => {
                mui.toast("登陆成功")
                location.assign("./user.html")
            }, 2000);
        }
    })
  })
    
})