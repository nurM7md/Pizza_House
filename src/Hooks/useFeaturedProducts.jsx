import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFeaturedProducts = () => {
  const categories = ["Pizzas", "Burgers", "Desserts"];

  const fetchFeatchured = async () => {
    const requests = categories.map((cat) =>
      axios.get(`https://free-food-menus-api-two.vercel.app/${cat}`)
    );
    const responses = await Promise.all(requests);

    const result = responses.map((res, index) => ({
      category: categories[index],
      products: res.data.slice(20,26)
    }));

    return result;
  };

  return useQuery({
    queryKey: ["featchuredProducts"],
    queryFn: fetchFeatchured,
  });
};

export default useFeaturedProducts;
