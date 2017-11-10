"use strict"
import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
// IMPORT COmbined reducers
import reducers from './reducers/index';
//IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
import logger from 'redux-logger';

import {Provider} from 'react-redux';


//STEP 1 create the store

const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

/*
store.subscribe(
    function(){
        console.log('current state is : ' , store.getState());
    }
);*/

import BooksList from './components/pages/booksList';
import Menu from './components/menu';
import Footer from './components/footer';

render(
    <Provider store={store} >
        <div>
           <Menu/>
           <BooksList/>
           <Footer />
        </div>
    </Provider>, document.getElementById('app'))
//STEP 2 create and distpach actions
/*
store.dispatch(postBooks([{
        id:1,
        title : 'this is the book title',
        description : 'this is desc',
        price : 20.22
    },{
        id:2,
        title : 'this is the book title2',
        description : 'this is desc2',
        price : 20.22
    }
    ]))

*/

//DELET A Book
/*
store.dispatch(deleteBooks({id:1}))
*/

/*
store.dispatch(updateBooks({id:2, title:"This is new title"}))
*/

// -->Cart Actions <<-- 
// ADD to Cart
/*
store.dispatch(addToCart(
    [{id:1}]
))
*/