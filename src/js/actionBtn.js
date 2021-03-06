

actionBtn = ev => {
    let products = JSON.parse( sessionStorage.getItem('tji-products') ) ?? [];
    if( products.indexOf( $(".brief-wrap dl dd").eq(0).text() ) != -1 ) {
        alert('The product has already been added'); 
        return;
    }
    
    
    let getAttributes = _=> {
        let items = {};
        let childItems = jQuery('table.qprice-chart th');
        for( let i = 2; i < childItems.length; i++ ) {
            if( childItems.eq(i).find('input').prop('checked') ){
                let text = childItems.eq(i).text();
                if ( text == 'Price' ) break;
                items[ text.replaceAll(' ', '') ] =  (_=> {
                    let items = [];
                    let childItems = $('table .child-item');
                    for( let f = 0; f < childItems.length; f++ ) {
                        if( childItems.eq(f).find('td').eq(0).find('input').prop('checked') ){
                            items.push(
                                childItems.eq(f).children().eq(i).text()
                            );
                        }
                    }
                    return items.filter( (element, index) => items.indexOf( element ) == index );
                })()

            }
        }        
        return items;
    }
    
    let product = {
        title: $(".brief-wrap h3").text().replaceAll( ",", " \," ),
        url: $(".prod-container .prod-subdetail .prod-subimg-wrap .loaded-img img").attr('src'),
        itemNumber: $(".brief-wrap dl dd").eq(0).text(),
        material: $(".brief-wrap dl dd").eq(1).text(),
        plating: $(".brief-wrap dl dd").eq(2).text(),
        stoneMaterial: $(".brief-wrap dl dd").eq(3).text(),
        soldBy: $(".brief-wrap dl dd").eq(4).text(),
        description: $(".description-wrap .description").text().replaceAll( ",", "\," ),
        variationsName: getAttributes(),
        variations: (_=> {
            let items = [];
            let childItems = $('table .child-item');
            for( let i = 0; i < childItems.length; i++ ) {
                if( childItems.eq(i).find('td').eq(0).find('input').prop('checked') ){
                    let variation = {
                        code: childItems.eq(i).children().eq(1).text()
                    };
                    let keys = Object.keys( getAttributes() )
                    let k = 1;
                    keys.forEach( key => {
                        variation[key] = childItems.eq(i).children().eq(k).text()
                        k++
                    })
                    items.push(variation);
                }
            }
            return items;
        })()
    };
    products.push( $(".brief-wrap dl dd").eq(0).text() );
    sessionStorage.setItem('tji-products', JSON.stringify( products ));
    window.port.postMessage({
        action: 'add',
        product: product
    });
    //alert('Agregado '+product.title);

}


