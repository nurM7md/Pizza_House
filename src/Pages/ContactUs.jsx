import { useState } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";


const ContactUs = () => {
  const [ name , setName] = useState('')
  const [ email , setEmail] = useState('')
  const [ textarea , setTextarea] = useState('')

  const resetForm =()=>{
    setName('')
    setEmail('')
    setTextarea('')
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    resetForm()
    if(
      !name || !email || !textarea
    ){
      toast.success("Please Fill In All Required Fields", {
        style: {
          background: "#ca8a04",
          color: "#d1d5db",
          fontWeight: "bold",
        },
        icon: "⚠️",
      });
      return;
    }else{
      toast.success("Thanks for your message ", {
        style: {
          background: "#ca8a04",
          color: "#d1d5db",
          fontWeight: "bold",
        },
        icon: "✅"})
    }
  }
  return (
    <div className="container flex flex-col items-center p-5 py-10 mb-10 rounded-lg bg-yellow-50 md:flex-col lg:flex-row gap-x-10">
      <div className="flex flex-col md:w-3/4">
        <h2 className="text-5xl font-bold text-yellow-900">Contact Us</h2>
        <p className="py-5 text-lg font-semibold text-gray-500">
          Feel free to contact us any time . we will get back to you as soon as
          we can!
        </p>
        <input
          type="text"
          placeholder="Name"

          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="px-4 py-2 border-b-2 rounded-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="px-4 py-2 my-3 border-b-2 rounded-full"
        />
        <textarea
          title="Message"
          placeholder="Message"
          value={textarea}
          onChange={(e)=>setTextarea(e.target.value)}
          className="px-4 py-3 border-b-2 rounded-full"
        />
        <button
        onClick={handleSubmit}
         className="justify-center px-3 py-2 mt-10 font-bold text-center text-white bg-yellow-600 rounded-full w-72">
          SEND
        </button>
      </div>

      <div className="w-full mt-5 bg-yellow-600 rounded-xl lg:w-1/4">
        <div className="p-5 ">
          <h4 className="pb-6 text-3xl font-bold text-white">Info</h4>
          <div className="flex flex-row text-xl font-semibold text-white gap-x-3">
            <p>
              <FaFacebook />
            </p>
            <p>
              <a href="/">PizzaHouse.facebook</a>
            </p>
          </div>
          <div className="flex flex-row text-xl font-semibold text-white gap-x-3">
            <p>
              <FaTwitter />
            </p>
            <p>
              <a href="/">PizzaHouse.twitter</a>
            </p>
          </div>
          <div className="flex flex-row text-xl font-semibold text-white gap-x-3">
            <p>
              <FaInstagram />
            </p>
            <p>
              <a href="/">PizzaHouse.insta</a>
            </p>
          </div>
          <div className="flex flex-row text-xl font-semibold text-white gap-x-3">
            <p>
              <FaPhone />
            </p>
            <p>
              <a href="/">0122235458</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
