import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../../context/Context';
import Rating from './../Rating/Rating';
import style from './SingleProduct.module.css';

const SingleProduct = ({ product }) => {

  const { state: { cart }, dispatch } = CartState();

  return (<div className={`${style.products}`}>

    <Card>
      <Card.Img variant='top' src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <span>{product.price.split('.')[0]} €</span>
          {product.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 Days to Delivery</div>
          )}

          <Rating rating={product.ratings} />
        </Card.Subtitle>
        {
          cart.some((p) => p.id === product.id) ? (
            <Button variant="danger"
              onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}>
              Remove From Cart</Button>
          ) : (
            <Button disabled={!product.inStock}
              onClick={() => dispatch({ type: "ADD_TO_CART" , payload: product })}>
              {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )
        }

      </Card.Body>
    </Card>
  </div>
  )
}

export default SingleProduct; 