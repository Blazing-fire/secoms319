import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Products from "./Products.json";
import "./App.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const Store = () => {
  const [state, setState] = useState(0);
  const [name,setName] = useState(0);
  const [cardNum,setCard] = useState(0);
  const [address,setAddress] = useState(0);
  const [email,setEmail] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [cart, setCart] = useState([]);
  let total = 0;

  const Catalog = () => {
    const [catalogItems, setCatalogItems] = useState(ProductsCategory);
    const [query, setQuery] = useState("");

    const handleClick = (tag) => {
      let filtered = ProductsCategory.filter((cat) => cat.category === tag);
      setCatalogItems(filtered);
    };

    const handleChange = (e) => {
      setQuery(e.target.value);
      const results = ProductsCategory.filter((eachProduct) => {
        if (e.target.value === "") return catalogItems;
        return eachProduct.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setCatalogItems(results);
    };

    return (
      <div className="flex fixed flex-row">
        <div
          className="h-screen bg-slate-800 p-3 xl:basis-1/5"
          style={{ minWidth: "65%" }}
        >
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-5 font-bold text-white bg-slate-600 rounded p-3">
              {" "}
              Store{" "}
            </h1>
            <p className="text-gray-700 text-white bg-slate-500 rounded p-2">
              by -{" "}
              <b>Blaze Krug</b>
            </p>
            <div className="py-10">
              <p className="text-white">Search</p>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="search"
                value={query}
                onChange={handleChange}
              />
            </div>
            <div>
            <button className="text-gray-700 text-white" onClick={() => {
              setCart(ProductsCategory.filter((prod) => prod.quantity > 0));
              setProductsCategory([...ProductsCategory]);
              setState(1);
             }}
              >
              View Cart
              </button>
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log(
            "Before render :",
            ProductsCategory.length,
            catalogItems.length
          )}
          {Render_products(catalogItems, false)}
        </div>
      </div>
    );
  };

  const Render_products = (ProductsCategory, cartView) => {
    const [fresh, setFresh] = useState(false);
    function refresh() {
      setFresh(!fresh);
    }
    const EndDescription = (product, index, cartView) => {
      if (!cartView) return Counter(product, index);
      return ProductTotal(product);
    };

    const ProductTotal = (product) => {
      return (
        <div>
          Qty: {product.quantity}<br />
          Total: {"$" + (product.quantity * product.price).toFixed(2)}
        </div>
      );
    };

    const Counter = (ignore, index) => {
      const setQty = (val) => {
        ProductsCategory[index].quantity = val;
        refresh();
      };
      // item counters
      return (
        <div>
          <input
            style={{ width: "50%" }}
            id={"counterNum" + index}
            type="number"
            value={ProductsCategory[index].quantity}
            onChange={(e) => {
              var val = isNaN(parseInt(e.target.value))
                ? 0
                : Math.max(parseInt(e.target.value), 0);
              e.target.value = val;
              setQty(val);
            }}
          ></input>
        </div>
      );
    };

    return (
      <div className="category-section fixed">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>
        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
        >
          {ProductsCategory.map((product, index) => (
            <div key={index} className="group relative shadow-lg">
              <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Rating: {product.rating.rate}
                  </p>
                  <div>{EndDescription(product, index, cartView)}</div>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    
  };

  // Start of Cart Page
  const Cart = () => {
    let emailCheck = false;
    let nameCheck = false;
    let cardCheck = false;
    let dateCheck = false;
    let cvcCheck = false;
    let addressCheck = false;
    let zipCheck = false;
    let email = '';
    let address = '';
    let name = '';
    let card = '';
    function total() {
      let totalVal = 0;
      for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price * cart[i].quantity;
      }
      return "$" + totalVal.toFixed(2);
    }
    function submit() {
      if (
        cardCheck &&
        emailCheck &&
        nameCheck &&
        dateCheck &&
        cvcCheck &&
        addressCheck &&
        zipCheck
      ) {
        setName(name);
        setAddress(address);
        setEmail(email);
        setCard(card);
        console.log(name,address,email,card);
        setState(2);
      }
    }
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    const nameInput = (e) => {
      if (e.target.value.length > 0) {
        nameCheck = true;
        name = e.target.value;
      } else {
        nameCheck = false;
      }
    };
    const addressInput = (e) => {
      if (e.target.value.length > 0) {
        addressCheck = true;
        address = e.target.value;
      } else {
        addressCheck = false;
      }
    };
    const cardInput = (e) => {
      if (e.target.value.length > 18) {
        var val = "";
        for (var i = 0, nums = 0; i < 19; i++) {
          val += e.target.value[i];
        }
        e.target.value = val;
        cardCheck = true;
        card = e.target.value.substring(e.target.value.length - 4);
      } else {
        cardCheck = false;
      }
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (!isNumeric(e.target.value[i])) {
          e.target.value = e.target.value.replace(e.target.value[i], "");
        }
      }
      e.target.value = e.target.value.replace(/-/g, "");
      let newVal = "";
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (nums != 0 && nums % 4 == 0) {
          newVal += "-";
        }
        newVal += e.target.value[i];
        if (isNumeric(e.target.value[i])) {
          nums++;
        }
      }
      e.target.value = newVal;
    };
    const emailInput = (e) => {
      if (
        !e.target.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        emailCheck = false;
      } else {
        emailCheck = true;
        email = e.target.value
      }
    };
    const dateInput = (e) => {
      let newVal = "";
      if (e.target.value.length > 4) {
        var val = "";
        for (var i = 0, nums = 0; i < 5; i++) {
          val += e.target.value[i];
        }
        e.target.value = val;
        dateCheck = true;
      } else {
        dateCheck = false;
      }
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (!isNumeric(e.target.value[i])) {
          e.target.value = e.target.value.replace(e.target.value[i], "");
        }
      }
      e.target.value = e.target.value.replace(/-/g, "");
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (nums != 0 && nums % 2 == 0) {
          newVal += "/";
        }
        newVal += e.target.value[i];
        if (isNumeric(e.target.value[i])) {
          nums++;
        }
      }
      e.target.value = newVal;
    };
    const cvcInput = (e) => {
      if (e.target.value.length > 2) {
        var val = "";
        for (var i = 0, nums = 0; i < 3; i++) {
          val += e.target.value[i];
        }
        e.target.value = val;
        cvcCheck = true;
      } else {
        cvcCheck = false;
      }
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (!isNumeric(e.target.value[i])) {
          e.target.value = e.target.value.replace(e.target.value[i], "");
        }
      }
    };
    const zipInput = (e) => {
      if (e.target.value.length > 4) {
        var val = "";
        for (var i = 0, nums = 0; i < 5; i++) {
          val += e.target.value[i];
        }
        e.target.value = val;
        zipCheck = true;
      } else {
        zipCheck = false;
      }
      for (var i = 0, nums = 0; i < e.target.value.length; i++) {
        if (!isNumeric(e.target.value[i])) {
          e.target.value = e.target.value.replace(e.target.value[i], "");
        }
      }
    };
    const payment_info = () => {
      return (
        <div className="mt-10 bg-gray-50 px-4 pt-8 rounded lg:mt-0 overscroll-none">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                onChange={emailInput}
                className={
                  "w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                }
                placeholder="Email"
              />
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                onChange={nameInput}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Name"
              />
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  onChange={cardInput}
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
              </div>
              <input
                type="text"
                name="credit-expiry"
                onChange={dateInput}
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                onChange={cvcInput}
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  onChange={addressInput}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Billing Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  State
                </div>
              </div>
              <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">AL</option>
                <option value="State">AK</option>
                <option value="State">AZ</option>
                <option value="State">AR</option>
                <option value="State">CA</option>
                <option value="State">CO</option>
                <option value="State">CT</option>
                <option value="State">DE</option>
                <option value="State">DC</option>
                <option value="State">FL</option>
                <option value="State">GA</option>
                <option value="State">GU</option>
                <option value="State">Hi</option>
                <option value="State">ID</option>
                <option value="State">IL</option>
                <option value="State">IN</option>
                <option value="State">IA</option>
                <option value="State">KS</option>
                <option value="State">KY</option>
                <option value="State">LA</option>
                <option value="State">ME</option>
                <option value="State">MD</option>
                <option value="State">MA</option>
                <option value="State">MI</option>
                <option value="State">MN</option>
                <option value="State">MS</option>
                <option value="State">MO</option>
                <option value="State">MT</option>
                <option value="State">NE</option>
                <option value="State">NV</option>
                <option value="State">NH</option>
                <option value="State">NJ</option>
                <option value="State">NM</option>
                <option value="State">NY</option>
                <option value="State">NC</option>
                <option value="State">ND</option>
                <option value="State">MP</option>
                <option value="State">OH</option>
                <option value="State">OK</option>
                <option value="State">OR</option>
                <option value="State">PA</option>
                <option value="State">RI</option>
                <option value="State">SC</option>
                <option value="State">SD</option>
                <option value="State">TN</option>
                <option value="State">TX</option>
                <option value="State">UT</option>
                <option value="State">VT</option>
                <option value="State">VA</option>
                <option value="State">VI</option>
                <option value="State">WA</option>
                <option value="State">WV</option>
                <option value="State">WI</option>
                <option value="State">WY</option>
              </select>
              <input
                type="text"
                name="billing-zip"
                onChange={zipInput}
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{total()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$0.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{total()}</p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={() => {
              submit();
            }}
          >
            Place Order
          </button>
        </div>
      );
    };

    return (
      <div className="flex  flex-row overscroll-none ">
        <div
          className="h-auto bg-slate-800 p-5 xl:basis-1/5 rounded overscroll-none"
          style={{ minWidth: "30%" }}
        >
          <div className="px-6 py-4 text-xl overscroll-none">
            <button
              className="text-white"
              onClick={() => {
                setState(0);
              }}
            >
              Return to Store
            </button>
            <h1 className="text-3xl mb-5 font-bold text-white bg-slate-600 rounded p-3 overscroll-none">
              {" "}
              Your Cart{" "}
            </h1>
          </div>
          {payment_info()}
        </div>
        <div className="py-10">
          <div>
            <div>
              Order total: {total()}
              {Render_products(cart, true)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Start of the comformation page
  function Confirm() {
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [query, setQuery] = useState("");

    function handleClick(tag) {
      console.log("Step 4 : in handleClick", tag);
      let filtered = Products.filter((cat) => cat.category === tag);
      setProductsCategory(filtered);
      console.log("Step 5 : ", Products.length, ProductsCategory.length);
    }
    function calcPrice() {
      cart.map((el) => (total += el.price * el.quantity));
      total = total.toFixed(2);
    }
    calcPrice();
    return (
      <div className="flex  flex-row overflow-scroll ">
        <div
          className="h-auto bg-slate-800 p-5 w-screen rounded"
          style={{ minWidth: "65%" }}
        >
          <div className="px-6 py-4">
          <button
                  className="text-white"
                  onClick={() => {
                    setState(0);
                    for(var i = 0; i < ProductsCategory.length; i++) {
                      ProductsCategory[i].quantity = 0;
                    }
                  }}
                >
                  Return to store
                </button>
            <h1 className="text-3xl mb-5 font-bold text-white bg-slate-600 rounded p-3">
              {" "}
              Order confirmation{" "}
            </h1>
            <div className="py-10 overflow-scroll content-center">
              <h2 className="text-gray-700 text-white">Order Summary:</h2>
              <div className=" grid grid-cols-2 gap-x-5 gap-y-5 content-center overflow-scroll">
                <div>
                  {cart.map((el) => (
                    <div className=" grid grid-cols-2 gap-x-5 gap-y-5 content-center overflow-scroll">
                      <div className="flex">
                        <img
                          className="img-fluid rounded"
                          src={el.image}
                          width={40}
                        />
                        <p className="text-gray-700 text-white ">
                          {el.quantity}x {el.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-white ">${el.price}</p>
                      </div>
                      <p>
                        <hr />
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                <p className="text-gray-700 text-white text-xl over:text-sky-400">
                  {" "}
                  Email: {email}
                </p>
                <p className="text-gray-700 text-white text-xl over:text-sky-400">
                  {" "}
                  Full Name: {name}
                </p>
                <p className="text-gray-700 text-white text-xl over:text-sky-400">
                  {" "}
                  Address: {address}
                </p>
                <p className="text-gray-700 text-white text-xl over:text-sky-400">
                  {" "}
                  Card Number: XXXX-XXXX-XXXX-{cardNum}
                </p>
                <p className="text-gray-700 text-white text-xl over:text-sky-400">
                  {" "}
                  Order Total: ${total}
                </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    function confirmation() {
      return (
        <div className="">
          <h1 className></h1>
        </div>
      );
    }
  }
  function renderedComponent() {
    switch (state) {
      case 0:
        return <Catalog />;
      case 1:
        return <Cart />;
      case 2:
        return <Confirm />;
      default:
        return <Catalog />;
    }
  }
  return renderedComponent();
};
root.render(
  <div>
    <Store/>
  </div>
);