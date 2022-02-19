import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { CartState } from '../../context/Context';
import Rating from '../Rating/Rating';
import { AiFillDelete } from 'react-icons/ai';
import style from './Cart.module.css';



const Cart = () => {


  const { state: { cart }, dispatch } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((accumulator, current) => accumulator + Number(current.price) * current.qty, 0))
  }, [cart])

  //Reduce will take 2 inputs --- accumulator -- will have a default value which im gonna give [0]
  // current product.price ---> it will be string format so im gonna make it as NUMBER
  // [CART] --- THIS useState will be call every time our cart variable changes

  return (
    <div className={`${style.home}`}>
      <div className={`${style.productContianer}`}>
        <ListGroup>
          {
            cart.map((product) => (
              <ListGroup.Item key={product.id}>
                <Row>
                  <Col md={2}>
                    <Image src={product.image} alt={product.name} fluid={true} rounded />
                  </Col>
                  <Col md={2}><span>{product.name}</span></Col>
                  <Col md={2}><span>{product.price} €</span></Col>
                  <Col md={2}>
                    <Rating
                      rating={product.ratings}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={product.qty}
                      onChange={(e) => dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value
                        }
                       })
                      }>

                      {[...Array(product.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Button
                      variant='danger'
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product
                        })
                      }>
                      <AiFillDelete />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
      <div className={`${style.filters}`}>
        <span className={`${style.title}`}>Subtotal ({cart.length}) items</span>
        <span>Total: {total}  €</span>
        <Button type='button' disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div >
  )
}

export default Cart