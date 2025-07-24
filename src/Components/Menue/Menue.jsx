import { useEffect, useState } from "react";
import useProducts from "../../Hooks/useProducts";
import useCategories from "../../Hooks/useCategories";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useCart } from "../../Cart/CartContext";
import { toast } from "react-hot-toast";

const Menue = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const HandleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", HandleScroll);
    return () => window.removeEventListener("scroll", HandleScroll);
  }, []);

  const { cartItems, dispatch } = useCart();
  console.log(cartItems);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const [selectedItem, setSelectedItem] = useState("pizzas");
  const { data: products = [], isLoading: productsLoading } = useProducts(selectedItem);

  if (productsLoading || categoriesLoading)
    return (
      <p className="py-10 text-3xl font-bold text-center text-gray-600">
        Please Wait Loading...
      </p>
    );

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }

    return stars;
  };

  return (
    <div className="container px-4 mx-auto text-center">
      <div>
        <div
          className={`
            fixed top-1/2 -translate-y-1/2 left-2 z-50 flex-col gap-4 pb-20
            hidden md:flex
          `}
        >
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedItem(cat)}
              className={`px-4 py-2 font-serif text-sm md:text-lg rounded-full transition
                ${
                  selectedItem === cat
                    ? "bg-yellow-600 text-white"
                    : "bg-white border-2 border-yellow-600 text-yellow-600"
                }
                hover:scale-105
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 py-4 md:hidden">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedItem(cat)}
              className={`px-3 py-1 text-sm font-serif rounded-full transition
                ${
                  selectedItem === cat
                    ? "bg-yellow-600 text-white"
                    : "bg-white border-2 border-yellow-600 text-yellow-600"
                }
                hover:scale-105
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:ml-32">
          {products.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden transition bg-white shadow-md hover:scale-105 rounded-xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="object-cover w-full h-40"
              />
              <div className="px-3 py-3">
                <div className="flex items-center justify-between gap-1">
                  <h2 className="text-sm font-bold text-yellow-600 sm:text-base md:text-lg">
                    {item.name}
                  </h2>
                  <button
                    onClick={() => {
                      dispatch({ type: "ADD_TO_CART", payload: item });
                      toast.success("Item added to cart successfully!", {
                        style: {
                          background: "#ca8a04",
                          color: "#d1d5db",
                          fontWeight: "bold",
                        },
                        icon: "🛒",
                      });
                    }}
                    className="px-3 py-1 font-serif text-sm text-gray-300 bg-yellow-600 rounded-full"
                  >
                    order
                  </button>
                </div>
                <p className="py-2 text-sm font-semibold text-gray-700">
                  {item.dsc}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-yellow-600">
                    Price : {item.price}$
                  </p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    {renderStars(item.rate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menue;
