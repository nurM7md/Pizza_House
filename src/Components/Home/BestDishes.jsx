import { Link } from "react-router-dom";
import useFeaturedProducts from "../../Hooks/useFeaturedProducts";
import { MdDoubleArrow } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useCart } from "../../Cart/CartContext";
import { toast } from "react-hot-toast";

const BestDishes = () => {
  const { cartItems, dispatch } = useCart();
  const { data: featuredProducts, isLoading } = useFeaturedProducts();

  if (isLoading)
    return (
      <p className="py-8 text-2xl text-center text-gray-500 sm:text-4xl md:text-5xl">
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
    <div className="container p-4 mx-auto sm:p-6 rounded-xl">
      <h1 className="flex flex-wrap items-center justify-center gap-2 mb-6 font-serif text-3xl text-center text-gray-600 sm:text-5xl md:text-6xl lg:text-7xl">
        <MdOutlineKeyboardDoubleArrowLeft />
        Best Of The House
        <MdOutlineKeyboardDoubleArrowRight />
      </h1>

      {featuredProducts.map(({ category, products }) => (
        <div key={category} className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-yellow-600 sm:text-3xl">
              {category} Offers
            </h2>
            <Link to="/menue">
              <button className="flex items-center gap-2 px-4 py-2 font-serif text-sm text-gray-700 transition bg-yellow-600 rounded-full sm:text-base hover:scale-105">
                view all dishes
                <MdDoubleArrow />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 md:grid-cols-3">
            {products.map((item, index) => (
              <div key={index} className="overflow-hidden transition bg-white shadow-md hover:scale-105 rounded-xl">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-cover w-full h-40 sm:h-48"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-yellow-600 sm:text-xl">
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
                      className="px-3 py-1 font-serif text-sm text-gray-700 bg-yellow-600 rounded-full sm:py-2 sm:text-base"
                    >
                      order
                    </button>
                  </div>
                  <p className="py-2 text-sm font-semibold text-gray-700 sm:text-base">
                    {item.dsc}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-yellow-600 sm:text-lg">
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
      ))}
    </div>
  );
};

export default BestDishes;
