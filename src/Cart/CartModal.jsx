import { Dialog } from "@headlessui/react";
import { useCart } from "./CartContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-h-[90vh] overflow-y-auto sm:max-w-lg p-4 sm:p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-yellow-600 sm:text-2xl">
                🛒 Your Shopping Cart
              </h1>
              <button
                onClick={onClose}
                className="text-3xl text-yellow-600 transition hover:scale-110"
              >
                <IoMdCloseCircleOutline />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="pb-5 text-2xl font-bold text-center text-red-600">
                Your cart is still empty
                <br />
                <span className="text-lg text-gray-500">Let's fill it 🍕</span>
              </p>
            ) : (
              <div>
                <ul className="space-y-4 overflow-y-auto max-h-[55vh] pr-1">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-between pb-2 border-b sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span>Quantity: {item.quantity}</span>
                            <div className="flex gap-2">
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
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-3 sm:mt-0">
                        <p className="text-sm font-bold text-yellow-600 sm:text-base">
                          {item.price * item.quantity} $
                        </p>
                        <button
                          className="text-2xl text-red-500"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item.id,
                            })
                          }
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row">
                  <h1 className="text-xl font-bold text-yellow-600">
                    Total: {total} $
                  </h1>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        navigate("/checkout");
                      }, 300);
                    }}
                    className="px-4 py-2 text-white transition bg-yellow-600 rounded-full hover:bg-yellow-700"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CartModal;
