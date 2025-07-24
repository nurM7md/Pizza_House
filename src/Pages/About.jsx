import { motion } from "framer-motion";
import pizzaImg from "../assets/Images/chefPizza.jpg"; 

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-yellow-50">
      <motion.h1
        className="mb-6 text-4xl font-bold text-yellow-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      <motion.img
        src={pizzaImg}
        alt="Pizza"
        className="w-64 h-64 mb-8 shadow-lg rounded-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.p
        className="max-w-2xl mb-8 text-xl leading-relaxed text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Welcome to <span className="font-semibold text-yellow-700">Pizza House</span>,
        where we serve the freshest ingredients with a smile!
        We are passionate about bringing authentic Italian flavors to your plate.
        Whether you're dining in, taking out, or ordering delivery—our team is here
        to make your meal memorable.
      </motion.p>

      <motion.ul
        className="flex flex-col gap-4 text-lg text-gray-500"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          "🍕 100% Fresh Ingredients",
          "🚚 Fast and Reliable Delivery",
          "👨‍🍳 Expert Pizza Chefs",
          "🔥 Stone-baked Perfection",
        ].map((feature, index) => (
          <motion.li
            key={index}
            className="px-4 py-2 bg-white border-l-4 border-yellow-600 rounded-md shadow"
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            {feature}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default About;
