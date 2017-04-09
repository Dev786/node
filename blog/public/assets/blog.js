$(document).ready(function(){
    $('li').on('click',function(){
        var item = $(this).children("p").text().replace(/ /g,"-");
        console.log(item);
        $.ajax({
            type:'GET',
            url:'/blogContent/'+item
        });
    });
});