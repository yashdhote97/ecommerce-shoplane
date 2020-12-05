$(document).ready(function(){
    function updateCheckout(itemArray){
        let totalCount=0;
        for(let i=0;i<itemArray.length;i++){
            totalCount+=itemArray[i].count*itemArray[i].price;
        }
        $('#cartTotal').text(`RS ${totalCount}`);
        $('#cartTotalWithTaxes').text(`RS ${totalCount}`);
    };
    let productArray=JSON.parse(localStorage.getItem("productList"));
    function cartList(item){
        let itemList=$('<div>').addClass('itemList');
        itemList.append($('<div>').addClass('itemImageDiv').append($('<img>').attr('src',item.preview)));
        let itemDetails=$('<div>').addClass('itemDetails');
        itemDetails.append($('<span>').addClass('itemBrand').text(item.brand));
        itemDetails.append($('<span>').addClass('itemName').text(item.name));
        itemDetails.append($('<div>').addClass('removeItem').attr('id',`removebtn${item.id}`).append(($('<span>').addClass('iconify').attr('data-icon','typcn:delete-outline').attr('data-inline','false'))));
        let itemSizeMenu=$('<div>').addClass('itemCountSize');
        itemSizeMenu.append($('<label>').attr('for',`item${item.id}`).addClass('labelSize').text('Size:'));
        let sizeMenuItems=$('<select>').attr('id',`item${item.id}`).addClass('sizeValues');
        for(let j=0;j<item.size.length;j++){
            if(j==0 && item.size[j]==1){
                sizeMenuItems.append($('<option>').attr('value','S').text('S'));
            }
            else if(j==1 && item.size[j]==1){
                sizeMenuItems.append($('<option>').attr('value','M').text('M'));
            }
            else if(j==2 && item.size[j]==1){
                sizeMenuItems.append($('<option>').attr('value','L').text('L'));
            }
            else if(j==3 && item.size[j]==1){
                sizeMenuItems.append($('<option>').attr('value','XL').text('XL'));
            }
            else if(j==4 && item.size[j]==1){
                sizeMenuItems.append($('<option>').attr('value','XXL').text('XXL'));
            }
        }
        itemSizeMenu.append(sizeMenuItems);
        itemSizeMenu.append($('<span>').addClass('labelQty').text('Qty:'));
        let itemQty=$('<div>').addClass('itemQuantity');
        itemQty.append($('<div>').attr('id',`lessbtn${item.id}`).addClass('qtyDecrease').append($('<span>').addClass('iconify').attr('data-icon','ic:round-remove').attr('data-inline','false')));
        itemQty.append($('<span>').attr('id',`countShow${item.id}`).addClass('quantity').text(item.count));
        itemQty.append($('<div>').attr('id',`addbtn${item.id}`).addClass('qtyIncrease').append($('<span>').addClass('iconify').attr('data-icon','ic:baseline-add').attr('data-inline','false')));
        itemSizeMenu.append(itemQty);
        itemDetails.append(itemSizeMenu);
        itemDetails.append($('<h5>').addClass('itemPrice').text(`RS ${item.price}`));
        itemList.append(itemDetails);
        $('#itemListWrapper').append(itemList);

        let itmcount=JSON.parse(localStorage.getItem("cartCount"));
        $('#cartItemsCount').text(`${itmcount} Items`);
        let cartCnt=JSON.parse(localStorage.getItem("cartCount"));
        $('#count').text(cartCnt);

        $(`#lessbtn${item.id}`).click(function(){
            if(item.count > 1){
                for(let i=0;i<productArray.length;i++){
                    if(item.id==productArray[i].id){
                        productArray[i].count=productArray[i].count-1;
                        localStorage.setItem("productList", JSON.stringify(productArray));
                        $(`#countShow${item.id}`).text(productArray[i].count);
                        let cartCount=JSON.parse(localStorage.getItem("cartCount"));
                        cartCount=cartCount-1;
                        localStorage.setItem("cartCount", JSON.stringify(cartCount));
                        updateCheckout(productArray);
                    }
                }
            }
            window.location.reload();
        });
        $(`#addbtn${item.id}`).click(function(){
            if(item.count >= 1){
                for(let i=0;i<productArray.length;i++){
                    if(item.id==productArray[i].id){
                        productArray[i].count=productArray[i].count+1;
                        localStorage.setItem("productList", JSON.stringify(productArray));
                        $(`#countShow${item.id}`).text(productArray[i].count);
                        let cartCount=JSON.parse(localStorage.getItem("cartCount"));
                        cartCount=cartCount+1;
                        localStorage.setItem("cartCount", JSON.stringify(cartCount));
                        updateCheckout(productArray);
                    }
                }
            }
            window.location.reload();
        });
        $(`#removebtn${item.id}`).click(function(){
            for(let i=0;i<productArray.length;i++){
                if(item.id==productArray[i].id){
                    let productCount=productArray[i].count;
                    productArray.splice(i,1);
                    localStorage.setItem("productList", JSON.stringify(productArray));
                    let cartCount=JSON.parse(localStorage.getItem("cartCount"));
                    cartCount=cartCount-productCount;
                    localStorage.setItem("cartCount", JSON.stringify(cartCount));
                    $('#cartItemsCount').text(`${cartCount} Items`);
                    $('#count').text(cartCount);
                    updateCheckout(productArray);
                }
            }
            $(this).parents()[1].remove();
        });
        updateCheckout(productArray);
    };
    $('#checkoutBtn').click(function(){
        let cartCount=JSON.parse(localStorage.getItem("cartCount"));
        let prodArray=JSON.parse(localStorage.getItem("productList"));
        if(cartCount > 0){
        $.ajax({
            method: "POST",
            url: "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
            data: JSON.stringify(prodArray)
          })
            .done(function( msg ) {
                console.log('Request send successfully');
            })
            .always(function( msg ) {
                localStorage.removeItem('cartCount');
                localStorage.removeItem('productList');
                window.location.href="./orderplaced.html";
            })
        }
        else{
            alert("There are no items in the cart");
        }
    });
    $('#clothsSelect').click(function(){
        window.location.href="./homepage.html";
    });
    $('#gadgetSelect').click(function(){
        window.history.back();
    });
    for(let i=0;i<productArray.length;i++){
        cartList(productArray[i]);
    }
});