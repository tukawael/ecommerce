import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/finalProject assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/CartContext";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("Token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} width={150} alt="FreshCart Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          {token && (
            <ul className="flex space-x-6 text-gray-900 dark:text-white font-medium">
              <li><NavLink to="" className="hover:text-green-700 transition-all duration-300">Home</NavLink></li>
              <li><NavLink to="cart" className="hover:text-green-700 transition-all duration-300">Cart</NavLink></li>
              <li><NavLink to="wishList" className="hover:text-green-700 transition-all duration-300">Wish List</NavLink></li>
              <li><NavLink to="product" className="hover:text-green-700 transition-all duration-300">Products</NavLink></li>
              <li><NavLink to="categories" className="hover:text-green-700 transition-all duration-300">Categories</NavLink></li>
              <li><NavLink to="brand" className="hover:text-green-700 transition-all duration-300">Brand</NavLink></li>
              <li><NavLink to="allorders" className="hover:text-green-700 transition-all duration-300">Orders</NavLink></li>
            </ul>
          )}
        </div>

        {/* Sign Out / Login/Register */}
        <div className="hidden md:flex justify-end">
          <ul className="flex gap-4">
            {token ? (
              <li>
                <span onClick={logOut} className="cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300">Sign Out</span>
              </li>
            ) : (
              <>
                <li><NavLink to="register" className="hover:text-green-700 transition-all duration-300">Register</NavLink></li>
                <li><NavLink to="login" className="hover:text-green-700 transition-all duration-300">Login</NavLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 dark:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa fa-bars text-2xl"></i>
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4">
          <ul className="flex flex-col space-y-3 text-center text-gray-900 dark:text-white">
            {token && (
              <>
                <li><NavLink to="" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
                <li><NavLink to="cart" onClick={() => setIsMenuOpen(false)}>Cart ({numOfCartItems})</NavLink></li>
                <li><NavLink to="wishList" onClick={() => setIsMenuOpen(false)}>Wish List</NavLink></li>
                <li><NavLink to="product" onClick={() => setIsMenuOpen(false)}>Products</NavLink></li>
                <li><NavLink to="categories" onClick={() => setIsMenuOpen(false)}>Categories</NavLink></li>
                <li><NavLink to="brand" onClick={() => setIsMenuOpen(false)}>Brand</NavLink></li>
                <li><NavLink to="allorders" onClick={() => setIsMenuOpen(false)}>Order</NavLink></li>
              </>
            )}
            {token ? (
              <li>
                <span
                  onClick={() => {
                    logOut();
                    setIsMenuOpen(false);
                  }}
                  className="cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300"
                >
                  Sign Out
                </span>
              </li>
            ) : (
              <>
                <li><NavLink to="register" onClick={() => setIsMenuOpen(false)}>Register</NavLink></li>
                <li><NavLink to="login" onClick={() => setIsMenuOpen(false)}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
