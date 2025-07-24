import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const fetchCategories = async () => {
    return ['pizzas' , 'burgers' , 'drinks' , 'bbqs' , 'breads' , 'ice-cream']
  }
    
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export default useCategories;
