"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';
 
class Cart extends React.Component{

    onDelete(_id){

        const currentBookToDelete = this.props.cart;
        //determine at which index cart to be deleted
       
        const indexToDelete = currentBookToDelete.findIndex
            ((cart) =>{return cart._id === _id}
            )

        let cartAfterDelete = [...currentBookToDelete.slice(0,indexToDelete),
            ...currentBookToDelete.slice(indexToDelete+1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncreament(_id){
        this.props.updateCart(_id, 1);
    }
    onDecreament(_id, quantity){
        if(quantity > 1){
            this.props.updateCart(_id, -1);
        }
    }

    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }

    }

    renderEmpty(){
        return (<div></div>)
    }

    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>      </span>
                        </Col>
                         <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>          
                         <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>  
                          <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecreament.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncreament.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <Button bsStyle="danger" bsSize="small"
                                    onClick={this.onDelete.bind(this, cartArr._id)}>DELETE</Button>

                            </ButtonGroup>
                        </Col>                                                               
                    </Row>
                </Panel>
            )
        }, this)
        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCart : updateCart
    }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps)(Cart);