import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function useProducts(category) {

    const fetchProducts = async ()=>{
        const {data} = await axios.get(`https://free-food-menus-api-two.vercel.app/${category}`);
        return data;
    }
    
  return useQuery({
    queryKey: ["products" , category],
    queryFn: fetchProducts,
    enabled:!!category
  });
}
