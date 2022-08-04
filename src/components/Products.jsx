import React, { useContext } from 'react';
import Product from './Product';
import '../styles/components/Products.css';
import AppContext from '../context/AppContext';

const Products = () => {
  const { products, addToCart } = useContext(AppContext);
  

  const handleAddToCart  = (product) => () => {
    addToCart(product);
  };

  return (
    // console.log(products)
     <div className="Products">
       <div className="Products-items">
          {products.map(product => (
           <Product key={product.uid} product={product} handleAddToCart={ handleAddToCart }/>
         ))} 
       </div>
     </div>
  );
}

export default Products;