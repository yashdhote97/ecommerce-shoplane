$(document).ready(function(){
    function createItemPage(item){
        $('#preview').append($('<img>').addClass('previewImage').attr('src',item.preview));
        $('#contents').append($('<span>').addClass('itemBrand').text(item.brand));
        $('#contents').append($('<span>').addClass('itemName').text(item.name));
        $('#contents').append($('<span>').addClass('itemPrice').text(`RS ${item.price}`));
        $('#contents').append($('<span>').append($('<strong>').addClass('descriptionTitle').text('Description:').append($('<br>'))).addClass('itemDescription').text(item.description));
        $('#contents').append($('<span>').addClass('productPreview').text('Product Preview'));
        var previewSlider=$('<div>').addClass('previewSlider');
        $.each(item.photos,function(index,responseImage){
            previewSlider.append($('<img>').attr('src',responseImage).css('border-radius','5px').addClass('sliderPreviewImage').attr('id',`img${index}`).click(function(){
                $('#preview img').attr('src',responseImage);
                $.each($('.sliderPreviewImage'),function(index,images){
                    $(images).css('border','none');
                });
                $(this).css('border','1.5px solid #333033');
              }));
        });
        $('#contents').append(previewSlider);
        $('#contents').append($('<div>').addClass('btn').text('Add To Cart').prepend($('<span>').addClass('iconify').attr('data-icon','clarity:shopping-cart-line').attr('data-inline','false')));
        $('.sliderPreviewImage').eq(0).css('border','1.5px solid #333033');
        $('.btn').click(function(){
            let productArray=JSON.parse(localStorage.getItem("productList"));
            let count=1;
            let totalCount=0;
            for(let i=0;i<productArray.length;i++){
                if(productArray[i].hasOwnProperty('count')){
                    totalCount+=productArray[i].count;
                }
                if(productArray[i].id==item.id){
                    count+=productArray[i].count;
                    productArray.splice(i,1);
                }
            }
            item['count']=count;
            productArray.push(item);
            localStorage.setItem("cartCount", JSON.stringify(totalCount+1));
            $('#count').text(totalCount+1);
            localStorage.setItem("productList", JSON.stringify(productArray));
        });
    }
    $('#clothsSelect').click(function(){
        window.location.href="./homepage.html";
    });
    $('#gadgetSelect').click(function(){
        window.history.back();
    });
    let id=location.search.replace('?id=','');
    if(!(localStorage.getItem("productList") && localStorage.getItem("cartCount"))){
        let productList=[];
        let count=0;
        localStorage.setItem("productList", JSON.stringify(productList));
        localStorage.setItem("cartCount", JSON.stringify(count));
    }
    else{
    let cartCount=JSON.parse(localStorage.getItem("cartCount"));
    $('#count').text(cartCount);
    }
    $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`,function(response){
        createItemPage(response);
    }).fail(function(err){
        alert(err.status);
    })
});