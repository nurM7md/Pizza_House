import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../Cart/CartContext";
import { MdDeleteForever } from "react-icons/md";

const CheckOut = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isDelivery, setIsDelivery] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const navigate = useNavigate();
  const { cartItems, dispatch } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const resetForm = () => {
    setName("");
    setNumber("");
    setAddress("");
    setIsDelivery("");
    setPaymentType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !number ||
      !isDelivery ||
      !paymentType ||
      (isDelivery === "home" && !address)
    ) {
      toast.success("Please Fill In All Required Fields", {
        style: {
          background: "#ca8a04",
          color: "#d1d5db",
          fontWeight: "bold",
        },
        icon: "⚠️",
      });
      return;
    }

    if (paymentType === "online") {
      navigate("/payment");
      resetForm();
    } else {
      toast.success("Order Confirmed With Cash", {
        style: {
          background: "#ca8a04",
          color: "#d1d5db",
          fontWeight: "bold",
        },
        icon: "🛒",
      });

      dispatch({ type: "CLEAR_CART" });
      resetForm();
      setOrderConfirmed(true);
    }
  };

  return (
    <div className="container grid grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-2">
  <div className="w-full p-4 bg-white shadow rounded-xl sm:p-6">
    {orderConfirmed ? (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-green-600 sm:text-2xl">
          ✅ Order Sent Successfully!
        </h2>
        <p className="mt-2 text-base text-gray-500 sm:text-lg">
          Thank you for your order
        </p>
      </div>
    ) : cartItems.length > 0 ? (
      <>
        <h1 className="pb-3 text-xl font-bold text-center text-gray-500">
          Summary Of Your Order
        </h1>
        <ul className="pr-1 space-y-4 overflow-y-auto max-h-40">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between pb-2 border-b">
              <div className="flex gap-4">
                <img src={item.img} alt={item.name} className="w-14" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    Quantity: {item.quantity}
                    <div className="flex gap-2">
                      <button onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
                        className="px-2 font-bold text-yellow-600 border border-yellow-600 rounded-full">+</button>
                      <button onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
                        className="px-2 font-bold text-yellow-600 border border-yellow-600 rounded-full">-</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-yellow-600">{item.price * item.quantity}$</p>
                <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                  className="text-xl text-red-500"><MdDeleteForever /></button>
              </div>
            </li>
          ))}
        </ul>
        <textarea
          cols={30}
          rows={3}
          placeholder="Add any notes on your order"
          className="w-full p-2 mt-3 border border-yellow-600 outline-none rounded-xl"
        />
        <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row">
          <h1 className="text-xl font-bold text-yellow-600">
            Total: {total}$
          </h1>
          <button type="submit" onClick={handleSubmit}
            className="px-4 py-2 text-white transition bg-yellow-600 rounded-full hover:bg-yellow-700">
            Confirm Order
          </button>
        </div>
      </>
    ) : (
      <div className="pt-24 text-center">
        <h1 className="text-xl font-bold text-red-700">
          ⚠️ You didn't order anything
          <br />
          <span className="text-base text-gray-500">Please Fill In The Cart</span>
        </h1>
      </div>
    )}
  </div>

  <form onSubmit={handleSubmit} className="w-full p-4 space-y-4 bg-yellow-600 shadow-lg rounded-xl sm:p-6">
    <h1 className="text-2xl font-bold text-center text-white">CheckOut</h1>

    <input
      type="text"
      placeholder="Enter Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border rounded-full outline-none"
    />
    <input
      type="text"
      placeholder="Enter Your Number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      className="w-full px-4 py-2 border rounded-full outline-none"
    />

    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div>
        <h2 className="mb-2 font-semibold text-white">Delivery Method</h2>
        <label className="block text-sm text-white">
          <input
            type="radio"
            name="delivery"
            value="home"
            checked={isDelivery === "home"}
            onChange={(e) => setIsDelivery(e.target.value)}
          /> Delivery
        </label>
        <label className="block text-sm text-white">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={isDelivery === "pickup"}
            onChange={(e) => setIsDelivery(e.target.value)}
          /> Pick Up
        </label>
      </div>

      <div>
        <h2 className="mb-2 font-semibold text-white">Payment Method</h2>
        <label className="block text-sm text-white">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentType === "cash"}
            onChange={(e) => setPaymentType(e.target.value)}
          /> Cash
        </label>
        <label className="block text-sm text-white">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentType === "online"}
            onChange={(e) => setPaymentType(e.target.value)}
          /> Online
        </label>
      </div>
    </div>

    {isDelivery === "home" && (
      <input
        type="text"
        placeholder="Enter Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-2 border rounded-full outline-none"
      />
    )}
  </form>
</div>

  );
};

export default CheckOut;
