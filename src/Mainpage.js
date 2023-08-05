/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SiPowerpages } from "react-icons/si";
import { BiSolidContact } from "react-icons/bi";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { AiFillStar, AiOutlineStar, AiFillHome, AiOutlineUnorderedList, AiFillShopping, AiOutlineBars } from 'react-icons/ai';
import './Mainpage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import logo_sticky from './logo_sticky.svg';
const Mainpage = () => {
  const [products, setProducts] = useState([]);
  const [Search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [dark, setDark] = useState({
    color: 'black',
    backgroundColor: '#DAEBF7',
    boxShadow:'5px 5px 5px #71777B' 
  });
  const handleToggle = () => {
    if (dark.color === 'white') {
      setDark({ 
        color: 'black',
        backgroundColor: '#DAEBF7',
        boxShadow:'5px 5px 5px #71777B'
      });
    } else if (dark.color === 'black') {
      setDark({
        color: 'white',
        backgroundColor: '#04304D',
        boxShadow:'5px 5px 5px #71777B'
      });
    }
  };
  
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const categoriesSearch = () => {
    axios
      .get('https://dummyjson.com/products/categories')
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const categoriesName = (category) => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchpro = (e) => {
    setSearch(e.target.value);
    axios
      .get(`https://dummyjson.com/products/search?q=${Search}`)
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="dark" style={dark}>
        <header style={dark}>
          <div className="container">
            <div className="menu">
              <div className="logo">
                <a href="#">
                  <img src={logo_sticky} alt="#" />
                </a>
              </div>
              <nav>
                <ul className="Main_menu">
                  <li>
                    <a href="#">Home<AiFillHome></AiFillHome></a>
                  </li>
                  <li>
                    <a href="#">listing <AiOutlineUnorderedList></AiOutlineUnorderedList></a>
                  </li>
                  <li>
                    <a href="#">other pages <SiPowerpages></SiPowerpages></a>
                  </li>
                  <li>
                    <a href="#">Buy template <AiFillShopping></AiFillShopping></a>
                  </li>
                  <li>
                    <a href="#">contacts <BiSolidContact></BiSolidContact></a>
                  </li>
                </ul>
              </nav >
            </div >
          </div >
        </header>
        <div className="button-dark" onClick={handleToggle}>
          <BsMoonStarsFill></BsMoonStarsFill>
        </div>
        <div className="search">
          <input type="search" placeholder='Search Your Product' name="" id="" onChange={searchpro} />
          <span><FaSearch></FaSearch></span>
          <div className="mobile-menu">
            <AiOutlineBars className="bars" onClick={categoriesSearch} />
            <div className="categories_menu">
              <div className="categories_div">
                {/* <span>Home</span> */}
              </div>
            </div>
            {categories.map((category, index) => (
              <div className="categories_div" key={index}>
                <span onClick={() => categoriesName(category)} style={dark}>{category}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="main-box">
          {
          products.map((product, index) => (
            <div className="box" key={index}>
              <Link to={`/Singleproduct/${product.id}`} className='link'>
                <div className="box-items">
                  <div className="box-image">
                    <img src={product.thumbnail} alt="" />
                  </div>
                  <div className="box-items">
                    <h4>{product.title}</h4>
                    <div className="description"> {product.description} </div>
                    <span className="price">${product.price}</span>
                    <span className='category'>{product.category}</span>
                    <div>
                      <span className="rating">{product.rating}</span>
                      <span className="stars">
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Mainpage;
