"use strict"

//ADD to Cart
export function addToCart(book){
    return{    
        type: "ADD_TO_CART",
        payload: book
    }
}

//DELETE From Cart
export function deleteCartItem(cart){
    return{    
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}

//update cart
export function updateCart(_id, unit){
    return{    
        type: "UPDATE_CART",
        _id:_id,
        unit: unit
    }
}