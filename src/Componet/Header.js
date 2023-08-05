import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './Product.css';
import { AiFillStar, AiOutlineStar, AiOutlineBars, AiOutlineSearch } from 'react-icons/ai';
import { BsCart } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Header = () => {
  const [bars, setBars] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState();
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    return (
        <div>
            <div className='container5'>
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

                    <BsCart className='fs-5'></BsCart>
                </div>
            </div>
        </div>
    )
}

export default Header
