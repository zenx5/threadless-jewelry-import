

actionBtn = ev => {
    let products = JSON.parse( sessionStorage.getItem('tji-products') ) ?? [];
    if( products.indexOf( $(".brief-wrap dl dd").eq(0).text() ) != -1 ) {
        alert('El Producto ya fue agregado'); 
        return;
    }
    let product = {
        title: $(".brief-wrap h3").text(),
        itemNumber: $(".brief-wrap dl dd").eq(0).text(),
        material: $(".brief-wrap dl dd").eq(1).text(),
        plating: $(".brief-wrap dl dd").eq(2).text(),
        soldBy: $(".brief-wrap dl dd").eq(3).text(),
        description: $(".description-wrap .description").text(),
        variations: (_=> {
            let items = [];
            let childItems = $('table .child-item');
            for( let i = 0; i < childItems.length; i++ ) {
                items.push({
                    code: childItems.eq(i).children().eq(0).text(),
                    thickness: childItems.eq(i).children().eq(1).text(),
                    colorLogo: childItems.eq(i).children().eq(2).text(),
                    price: childItems.eq(i).children().eq(3).text(),
                    greaterThan3: childItems.eq(i).children().eq(4).text(),
                    greaterThan6: childItems.eq(i).children().eq(5).text(),
                    greaterThan12: childItems.eq(i).children().eq(6).text()
                });
            }
            return items;
        })()
    };
    console.log( product );
    products.push( $(".brief-wrap dl dd").eq(0).text() );
    sessionStorage.setItem('tji-products', JSON.stringify( products ));
    window.port.postMessage({
        product: product
    })
    alert('Agregado '+product.title);

}

