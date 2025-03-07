import { useState } from "react";
import { User, Lock } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      toast.success("Login Successful!", { position: "top-right" });
    } else {
      toast.error("Please enter username and password!", { position: "top-right" });
    }
  };

  return (
    <>
    <div className="h-screen w-full bg-[#E6F8F7] flex justify-center items-center">
      <div className="p-12 max-w-2xl w-fit h-[400px] bg-white shadow-md rounded-xl border border-[#66D2CE] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-[#66D2CE] mb-4 flex items-center justify-center">
          <User className="w-6 h-6 mr-2" />Patient Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-2">
            <User className="text-[#66D2CE] w-5 h-5 mx-2" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-2">
            <Lock className="text-[#66D2CE] w-5 h-5 mx-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          <button type="submit" className="px-4 py-2 text-white bg-[#66D2CE] rounded hover:bg-[#4ab7b3] transition duration-200 w-full">
            Login
          </button>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Login;
