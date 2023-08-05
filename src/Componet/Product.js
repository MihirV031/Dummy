import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './Product.css';
import { AiFillStar, AiOutlineStar, AiOutlineBars, AiOutlineSearch } from 'react-icons/ai';
import { BsCart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem } from '../app/redex/counterSlice';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
  const [bars, setBars] = useState([]);
  const [show, setShow] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // const [cartItems, setCartItems] = useState(0); 
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then(function (response) {
        setProducts(response.data.products);
        // console.log(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  

  axios
    .get('https://dummyjson.com/products/categories')
    .then(function (response) {
      // console.log(response.data)
      setBars(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

  const categary = (c) => {
    axios.get(`https://dummyjson.com/products/category/${c}`)
      .then(response => {
        // console.log(response.data);
        setProducts(response.data.products);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const searchClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    axios
      .get(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  const addproduct = (product) => {
    dispatch(addItem(product));
  };


  return (
    <div>
      <div className='container1'>
        <div className='d-flex align-items-center justify-content-between m-4'>
          <Button onClick={handleShow} className=''>
            <AiOutlineBars className='bars' >
            </AiOutlineBars>
          </Button>

          <Offcanvas show={show} onHide={handleClose}  >
            <Offcanvas.Header closeButton className='bg'>
              <Offcanvas.Title >Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='manecate'>
              <div className='ms-4 '>
                {bars.map((c, ind) => {
                  return (
                    <h4 key={ind} onClick={() => categary(c)}>{c} </h4>
                  )
                })}
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          {isSearchVisible ? (
            <input
              className='w-50 text-center'
              placeholder='Search'
              type='search'
              value={search}
              onChange={handleSearch}
            />
          ) : (
            <AiOutlineSearch className='search-icon' onClick={searchClick} />
          )}

         <Link to='./Addcard'> <BsCart className='fs-5'> cart ({cart.length}) </BsCart> </Link>
        </div>
      </div>

        {/* <Header/> */}
      <div className='container1'>
        <div className="main-box1">
          {products.map((product, index) => (
            <div className="box1" key={index}>
              <Link to={`/Productsingal/${product.id}`} className='text-decoration-none'>
                <div className="box-items1">
                  <div className="box-image1">
                    <img src={product.thumbnail} alt="" />
                  </div>
                  <div className="box-items1">
                    <h2>{product.title}</h2>
                    {/* <div className="description">{product.description}</div> */}
                    <span className="price">${product.price}</span>
                    <span className="discount">{product.discountPercentage}</span>
                    <div>
                      <span className="stars">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                      </span>
                      <span className="rating">{product.rating}</span> <br/>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;