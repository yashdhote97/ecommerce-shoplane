$(document).ready(function(){
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
    $("#clothsSelect").click(function() {
        $('html,body').animate({
            scrollTop: $("#clothingTag").offset().top},
            'slow');
    });
    $("#gadgetSelect").click(function() {
        $('html,body').animate({
            scrollTop: $("#accessoriesTag").offset().top},
            'slow');
    });
    $('.bannerContainer').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        pauseOnDotsHover: true,
    });
    function createcard(cardItem){
        let card=$('<div>').addClass('card').attr('id',cardItem.id);
        card.append($('<img>').attr('src',cardItem.preview).addClass('itemImages'));
        let cardDesc=$('<div>').addClass('cardDesc');
        cardDesc.append($('<span>').addClass('itemHeading').text(cardItem.name));
        cardDesc.append($('<span>').addClass('itemBrand').text(cardItem.brand));
        cardDesc.append($('<span>').addClass('itemPrice').text(`RS ${cardItem.price}`));
        var anchor=$('<a>').attr('href',`./itempage.html?id=${cardItem.id}`).addClass('cardLink');
        card.append(cardDesc);
        anchor.append(card);
        if(cardItem.isAccessory==false){
        $('.cardContainer').first().append(anchor);
        }
        else if(cardItem.isAccessory==true){
        $('.cardContainer').eq(1).append(anchor);
        }
      }
      let cartCount=JSON.parse(localStorage.getItem("cartCount"));
      $('#count').text(cartCount);
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product',function(response){
        $.each(response,function(index,responseObj){
                createcard(responseObj);
        });
        $('.cardContainer').first().slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow:$('.next'),
            prevArrow:$('.prev'),
            responsive:[{
                breakpoint:600,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    
                }
            },
            {
                breakpoint:900,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 1,  
                }
            }]
        });
        $('.cardContainer').eq(1).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow:$('.nextAsc'),
            prevArrow:$('.prevAsc'),
            responsive:[{
                breakpoint:600,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    
                }
            },
            {
                breakpoint:900,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 1,  
                }
            }]
        });
    }).fail(function(err){
        alert(err.status);
    });
  });