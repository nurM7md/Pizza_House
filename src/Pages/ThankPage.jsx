import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; 

const ThankPage= () => {
  const navigate = useNavigate();

  {/* useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);
  */}

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-20 text-center animate-fade-in">
  <CheckCircle className="w-20 h-20 text-green-600 animate-bounce" />
  
  <h1 className="mt-6 text-2xl font-bold text-yellow-800 sm:text-3xl">
    Payment Successful!
  </h1>

  <p className="mt-2 text-base text-gray-500 sm:text-lg">
    Thank you for your order... We’ll start preparing it soon.
  </p>

  <button
    onClick={() => navigate("/")}
    className="px-6 py-2 mt-6 mb-10 font-bold text-gray-100 bg-yellow-600 rounded-full transtion hover:bg-yellow-700"
  >
    Back to Home
  </button>
</div>

  );
};

export default ThankPage;
