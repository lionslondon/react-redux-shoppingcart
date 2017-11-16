"use strict"
//Books reducers
//STEP 3 Create reducers
export function booksReducers(state={
    books:[]
}, action){
    switch(action.type){
        case "POST_BOOK" :
       // let books = state.books.concat(action.payload)
        return {books:[...state.books, ...action.payload]};
        break;

        case "DELETE_BOOK" :
        //create a copy of the current array
        const currentBookToDelete = [...state.books]
        //determine at which index book to be deleted
        const indexToDelete = currentBookToDelete.findIndex
            ((book) =>{return book._id.toString() === action.payload}
            )

        return {books: [...currentBookToDelete.slice(0,indexToDelete),
            ...currentBookToDelete.slice(indexToDelete+1)]}
        break;

        case "UPDATE_BOOK" :
        //create a copy of the current array
        const currentBookToUpdate = [...state.books]
        //determine at which index book to be deleted
        const indexToUpdate = currentBookToUpdate.findIndex
            ((book) =>{return book._id === action.payload._id}
            //return {books:[...state.books, ...action.payload]}
            )
        const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
            title: action.payload.title}

        console.log("What is it newBookToUpdate", newBookToUpdate);

        return {books: [...currentBookToUpdate.slice(0,indexToUpdate)
            , newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]}
        break;

        case "GET_BOOKS" :
       // let books = state.books.concat(action.payload)
        return {...state, books:[...action.payload]};
        break;
    }
    return state;
}
