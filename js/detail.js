
$(function () {
    /*通过搜索到商品传过来的id
    用到商品详情的ajax当中
    
    
    
    */
    var id = location.href.split("=")[1]
    // console.log(id);
    $.ajax({
        url: "/product/queryProductDetail",
        type: "get",
        data: {
            id,
        },
        success: function (res) {
            console.log(res);
            let html = template("productTpl", res)
            // console.log(html);

            $(".productBox").html(html)
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })

    $(".productBox").on("tap",".size span",function(){
        // console.log(1);
        $(this).addClass("active").siblings("span").removeClass("active")
        
    })

})