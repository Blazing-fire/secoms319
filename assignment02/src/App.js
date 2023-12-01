// App.js
import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { Products } from './Products';
import { Categories } from './Categories';



const render_products = (ProductsCategory, updateCart) => {
  return (
    <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Products ({ProductsCategory.length})
      </h2>
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: '800px', overflowY: 'scroll' }}
      >
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative">
            <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                  </a>
                  <p>Tag - {product.category}</p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => updateCart(product.id, 'increment')}
              >
                +
              </button>
              <input
                type="number"
                value={product.quantity || 0}
                readOnly
                className="w-10 text-center border border-gray-300 rounded-md"
              />
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={() => updateCart(product.id, 'decrement')}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};










const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products || []);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart([...ProductsCategory]);
  }, [ProductsCategory]);

  const handleClick = (tag) => {
    let filtered = Products.filter((cat) => cat.category === tag);
    setProductsCategory(filtered);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.filter((eachProduct) => {
      if (e.target.value === '') return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  const updateCart = (product, action) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);
    const updatedCart = [...cart];

    if (action === 'increment') {
      updatedCart[productIndex].quantity = (updatedCart[productIndex].quantity || 0) + 1;
    } else if (action === 'decrement' && updatedCart[productIndex].quantity > 0) {
      updatedCart[productIndex].quantity -= 1;
    }

    setCart(updatedCart);
    setProductsCategory(updatedCart);
  };

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white">Product Catalog App</h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
          </p>
          <div className="py-10">
            <input
              type="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={query}
              onChange={handleChange}
            />
            {Categories ? <p className='text-white'>Tags : </p> : ''}
            {Categories.map((tag) => (
              <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => {handleClick(tag)}}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log('Before render :', Products.length, ProductsCategory.length)}
        {render_products(ProductsCategory, updateCart)}
      </div>
    </div>
  );
};

export default App;

