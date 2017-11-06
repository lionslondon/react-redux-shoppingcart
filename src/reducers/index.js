"use strict"
import {combineReducers} from 'redux';


//Here Import Reducers to be combined
import{booksReducers} from './booksReducers';
import{cartReducers} from './cartReducers';


//Here we do combine
export default combineReducers({
    books: booksReducers,
    cart: cartReducers
});