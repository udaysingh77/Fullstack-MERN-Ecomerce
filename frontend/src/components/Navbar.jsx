import React from "react";
import { Link } from "react-router-dom";
import { BaggageClaim, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.status) {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      toast.success(response.data.message);
    }
  };

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className=" max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* logo section */}
        <div>
          {/* <img src="/Ekart.png" alt="logo" className="w-[100px]" /> */}
          <BaggageClaim size={50} color="red" />
        </div>
        {/* Nav section */}
        <nav className=" flex gap-10 justify-between items-center">
          <ul className=" flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello {user.firstName}</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              0
            </span>
          </Link>
          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-800 text-white cursor-pointer">
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-pink-800 text-white cursor-pointer bg-gradient-to-tl from-blue-600 to-purple-600"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
