
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 获取一级分类
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(res){
            console.log(res);
            
          var html = template("oneCategroyTpl",res)    
            $("#oneCategroyList").html(html)
            if(res.rows.length){
                $("#oneCategroyList").find("li").eq(0).addClass("active")
                var id = res.rows[0].id
                getSecondList(id);
                
            }   
        }
    })

    // 获取二级分类
    $("#oneCategroyList").on("click","li",function(){
        // 获取动态生成的li的id
       var id = $(this).attr("data-id");
       $(this).addClass("active").siblings().removeClass("active")
        getSecondList(id)
        
    })

})
//封装动态获取二级分类
function getSecondList(id){
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{"id":id},
        dataType:'json',
        success:function(res){
            console.log(res);
           var html = template("twoCategroyTpl",res)
            $("#twoCategroyList").html(html)
        }

    })
}