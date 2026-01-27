import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("e.target=>", e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/login", formData, {
        headers: {
          "Content-Type": "application/Json",
        },
      });
      if (response.data.status) {
        navigate("/");
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return <div className=" flex justify-center items-center min-h-screen bg-pink-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    onChange={handleChange}
                    value={formData.password}
                    id="password"
                    name="password"
                    placeholder="Enter a password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={submitHandler}
              type="submit"
              className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p>
              Don't have an account?
              <Link to={"/signup"} className="hover:underline cursor-pointer text-pink-800">
                {" "}
                SignUp{" "}
              </Link>
            </p>
          </CardFooter>
        </Card>
  </div>
};

export default Login;
