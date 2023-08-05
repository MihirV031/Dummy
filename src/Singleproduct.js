/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Singleproduct.css';
import { FaRegHandPointRight } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar,AiOutlineCaretLeft} from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.css';
import * as mv from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import ReactImageMagnify from 'react-image-magnify';
import { Link } from 'react-router-dom';
 import { addItem } from '../app/redex/counterSlice';

const Singleproduct = () => {
  const [val, setVal] = useState({
    images: [],
    thumbnail: '',
    title: '',
    category: '',
    description: '',
    discountPercentage: '',
    price: '',
    brand: '',
    stock: '',
    rating: '',
  });
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const addToCart = () => {
    // Find the selected product from the products array based on the id
    const selectedProduct = products.find((product) => product.id === id);

    // Add the selected product to the cart
    setCart([...cart, selectedProduct]);
  };
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        setVal(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleImageClick = (image) => {
    setVal((prevVal) => {
      return {
        ...prevVal,
        thumbnail: image,
      };
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then(function (response) {
          setVal(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="main-loader">
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div className="text" data-text="Searching"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link to="/">
        <input type="button" className='button mt-1' value={"Back"} onClick={() => addToCart(val)} />
      </Link>
      <div className="main_info">
        <div className="bg">
          <mv.Container>
            <mv.Row>
              <mv.Col lg={6} className='img'>
                <div className="singleproduct">
                  <img src={val.images[0]} onClick={() => handleImageClick(val.images[0])} alt="" />
                  <img src={val.images[1]} onClick={() => handleImageClick(val.images[1])} alt="" />
                  <img src={val.images[2]} onClick={() => handleImageClick(val.images[2])} alt="" />
                  <img src={val.images[3]} onClick={() => handleImageClick(val.images[3])} alt="" />
                  <img src={val.images[4]} onClick={() => handleImageClick(val.images[4])} alt="" />
                </div>
                <div id="imageMagnifyre">
                    smallImage={{
                      alt: 'Wristwatch by Ted Baker London',
                      width: 500,
                      height: 500,
                      src: val.thumbnail
                    }}
                    largeImage={{
                      src: val.thumbnail,
                      width: 1800,
                      height: 2800
                    }}
                </div>
              </mv.Col>
              <mv.Col lg={6} className='deta'>
                <h2>{val.title}</h2>
                <p>{val.description}</p>
                <h5><span><FaRegHandPointRight /></span>Brand: {val.brand}</h5>
                <h3><span><FaRegHandPointRight /></span>Price: ${val.price}</h3>
                <h5><span><FaRegHandPointRight /></span>Stock: {val.stock}</h5>
                <h6><span><FaRegHandPointRight /></span>Rating: {val.rating}</h6>
                <span className="stars">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </span>
                <div className="buy mt-3">
                  <input type="button" className='button' value="Buy Now" />
                  <Link to={`/Addtocart`}>
                    <input type="button" className='button' value="Add To Cart" onClick={() => addToCart(val)} />
                  </Link>
                </div>
              </mv.Col>
            </mv.Row>
          </mv.Container>
        </div>
      </div>
    </>
  );
};

export default Singleproduct;
