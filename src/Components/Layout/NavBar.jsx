import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/pizzaLogo.jpg";
import { TiShoppingCart } from "react-icons/ti";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import CartModal from "../../Cart/CartModal";
import { useCart } from "../../Cart/CartContext";

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        
        <div className="flex items-center gap-2">
          <Link to='/'><img src={logo} alt="Logo" className="w-12 h-12 rounded-full" /></Link>
          <h2 className="font-serif text-xl font-bold text-yellow-600">
            <Link to='/'>Pizza House</Link>
          </h2>
        </div>

        
        <div className="items-center hidden gap-6 text-lg md:flex">
          <Link
            to="/"
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/menue"
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            About
          </Link>
          <Link
            to="/contactus"
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Contact Us
          </Link>
        </div>

       
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="text-3xl text-yellow-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        
        <div className="relative ml-4">
          <button
            className="text-3xl text-yellow-600 hover:text-orange-500"
            onClick={() => setIsCartOpen(true)}
          >
            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-1 -right-1">
                {totalItems}
              </span>
            )}
            <TiShoppingCart />
          </button>
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      
      {menuOpen && (
        <div className="flex flex-col gap-4 px-6 pb-4 text-lg bg-white md:hidden">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/menue"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Menu
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            About
          </Link>
          <Link
            to="/contactus"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-yellow-600 hover:text-orange-500"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
