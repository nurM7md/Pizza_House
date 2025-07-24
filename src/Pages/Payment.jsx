import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../Cart/CartContext";
import { MdDeleteForever } from "react-icons/md";

const PaymentForm = ({
  onSubmit,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiry,
  setExpiry,
  cvv,
  setCvv,
}) => (
  <form
    className="flex flex-col w-full max-w-md gap-3 py-3 my-6 bg-yellow-600 shadow-lg rounded-xl"
    onSubmit={onSubmit}
  >
    <h1 className="pb-3 text-4xl font-bold text-center text-gray-300">
      Debit Card Details
    </h1>
    <input
      type="text"
      placeholder="Card Number"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
      className="px-6 py-2 mx-12 border-2 border-yellow-600 rounded-full outline-none"
    />
    <input
      type="text"
      placeholder="Card Holder Name"
      value={cardHolder}
      onChange={(e) => setCardHolder(e.target.value)}
      className="px-6 py-2 mx-12 border-2 border-yellow-600 rounded-full outline-none"
    />
    <div className="flex gap-4 px-12">
      <input
        type="text"
        placeholder="MM/YY"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="w-1/2 px-4 py-2 border border-yellow-600 rounded-lg outline-none"
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="w-1/2 px-4 py-2 border border-yellow-600 rounded-lg outline-none"
      />
    </div>
  </form>
);

// 🟡 Main CheckOut Page
const CheckOut = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const navigate = useNavigate();
  const { cartItems, dispatch } = useCart();

  const resetForm = () => {
    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }
    toast.success(" Payment Successed", {
      style: {
        background: "#ca8a04",
        color: "#d1d5db",
        fontWeight: "bold",
      },
      icon: "✅",
    });
    resetForm();
    dispatch({ type: "CLEAR_CART" });
    navigate("/thanks");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container flex flex-col-reverse items-center gap-10 pt-12 lg:flex-row">
      <div className="w-full max-w-2xl p-6 bg-white shadow rounded-xl">
        {orderConfirmed ? (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold text-green-600">
              ✅ Order Sent Successfully!
            </h2>
            <p className="mt-2 text-xl text-gray-500">
              Thank you for your order
            </p>
          </div>
        ) : (
          <>
            <h1 className="pb-3 text-xl font-bold text-center text-gray-500">
              Summary Of Your Order
            </h1>
            <ul className="space-y-4 overflow-y-auto max-h-40">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between pb-2 border-b"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-14" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        Quantity: {item.quantity}
                        <button
                          onClick={() =>
                            dispatch({
                              type: "INCREASE_QUANTITY",
                              payload: item.id,
                            })
                          }
                          className="px-2 font-bold text-yellow-600 border border-yellow-600 rounded-full"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREASE_QUANTITY",
                              payload: item.id,
                            })
                          }
                          className="px-2 font-bold text-yellow-600 border border-yellow-600 rounded-full"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-yellow-600">
                      {item.price * item.quantity} $
                    </p>
                    <button
                      className="text-2xl text-red-500"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-6">
              <h2 className="text-xl font-bold text-yellow-600">
                Total: {total} $
              </h2>
              <button
                onClick={handlePayment}
                className="px-4 py-2 font-bold text-white bg-yellow-600 rounded-full hover:bg-yellow-700"
              >
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>

      <PaymentForm
        onSubmit={handlePayment}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        cardHolder={cardHolder}
        setCardHolder={setCardHolder}
        expiry={expiry}
        setExpiry={setExpiry}
        cvv={cvv}
        setCvv={setCvv}
      />
    </div>
  );
};

export default CheckOut;
