import React from 'react'
import { Navbar, Container, FormControl, Dropdown, Badge, Button, InputGroup, DropdownButton } from 'react-bootstrap';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { CartState } from '../../context/Context';
import logo from '../../images/amazon_PNG11.png';
import style from './Header.module.css';

const Header = () => {

  const { state: { cart }, dispatch } = CartState();

  return (
    <div className='headerContainer'>
      <Navbar className={`${style.nav}`}>
        <Container>
          <Navbar.Brand>
            <NavLink to='/'>
              <img className={`${style.logoImg}`} src={logo} alt="amazon" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Text className={`${style.search} mx-4`}>
            <InputGroup>
              <DropdownButton
                variant="light"
                title="All"
                id="input-group-dropdown-1"
              >

                <Dropdown.Item className='text-dark'>All Departments</Dropdown.Item>
                <Dropdown.Item className='text-dark'>Arts & Crafts</Dropdown.Item>
                <Dropdown.Item className='text-dark'>Automotive</Dropdown.Item>
                <Dropdown.Item className='text-dark'>Sports & Outdoors</Dropdown.Item>
              </DropdownButton>
              <FormControl type="search" placeholder='Search For a Product' />
              <InputGroup.Text id="basic-addon1" className="bg-warning fs-4" > <BsSearch /></InputGroup.Text>

            </InputGroup>

          </Navbar.Text>

          <Dropdown align='end'>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              <MdOutlineAddShoppingCart className='mx-1 fs-4' />
              <Badge bg='warning' text="dark">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((product) => (
                    <span className={`${style.cartItem}`} key={product.id}>
                      <img className={`${style.cartItemImg}`} src={product.image} alt={product.name} />
                      <div>
                        <span className={`${style.cartItemDetails}`}>{product.name}</span>
                        <span>{product.price.split('.')[0]} €</span>
                      </div>
                      <AiFillDelete
                        className='mx-1'
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product
                          })
                        }
                      />
                    </span>
                  ))}
                  <NavLink to='/cart'>
                    <Button className={`${style.button}`}>Go To Cart</Button>
                  </NavLink>
                </>

              ) : ( 
                <div className='d-flex align-items-center flex-column'>
                  <span className='fw-bold'>Your Cart is empty!</span>
                  <NavLink to="/">Shop today's deals</NavLink>
                </div>)}

            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header