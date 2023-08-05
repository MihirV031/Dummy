import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../app/redex/counterSlice';
import { CiCircleMinus } from "react-icons/ci";
import { BsPlusCircle } from "react-icons/bs";


const Addcard = () => {
  // const [val,setVal] =useState('')
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item));
  };

  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const handleQuantityChange = (index, newQuantity) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity > 0 ? newQuantity : 1;
    setQuantities(updatedQuantities);
  };

  const getTotal = (item, index) => {
    return item.price * quantities[index];
  };

  

  const subtotal = cart.reduce((acc, item, index) => acc + getTotal(item, index), 0);
  const shipping = 10;
  const finalTotal = subtotal + shipping;

  return (
    <div>
      <Container>
        <table className='w-100 table table-bordered text-center mb-0"'>
          <thead>
            <tr >
              <th className='bg-info'>Title</th> 
              <th className='bg-secondary'>Price</th>
              <th className='bg-info'>Quantity</th>
              <th className='bg-secondary'>Total</th>
              <th className='bg-info'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td className="align-middle cart-img text-start">
                  <img src={item.images[0]} alt={item.title} style={{ width: 50, height: 40 }} className='me-3 ms-3' />
                  {item.title}
                </td>
                <td className="align-middle ">$ {item.price}</td>
                <td className="align-middle">
                  <div className="input-group quantity mx-auto" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus  rounded-0 icon1"
                        onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                      >
                       <CiCircleMinus className='btn-outline-dark'></CiCircleMinus>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm  text-center"
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm  rounded-0 icon1" 
                        onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                      >
                        <BsPlusCircle  className='btn-outline-dark'></BsPlusCircle>
                      </button>
                    </div>
                  </div>
                </td>
                <td className="align-middle">$ {getTotal(item, index)}</td>
                <td className="align-middle">
                  <button className="btn btn-sm close btn-outline-dark rounded-0" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='final-bill '>
              <div className="card  ">
                <div className="card-header bg-secondary border-0 rounded-0">
                  <h4 className="fw-semibold m-0">Cart Summary</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <h6 className="fw-medium">Subtotal</h6>
                    <h6 className="fw-medium">$ {subtotal}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-medium">Shipping</h6>
                    <h6 className="fw-medium">$ {shipping}</h6>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between mt-2">
                    <h5 className="fw-bold">Total</h5>
                    <h5 className="fw-bold">$ {finalTotal}</h5>
                  </div>
                  <button className="btn btn-block proceed my-3 py-3 btn-outline-dark w-100 rounded-0">Proceed To Checkout</button>
                </div>
              </div>
            </div>
      </Container>
    </div>
  );
};

export default Addcard;
