import { Input } from "@/components/ui/input";
import { Search, Edit, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLogo from "./../../assets/user-icon.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res=>", res.data);
      if (res.data.status) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUser = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log("user=>", users);
  return (
    <div className="pl-[350px] py-20 pr-20 mx-auto px-4">
      <h1 className=" font-bold text-2xl">User Managment</h1>
      <p>View and Manage Registered User</p>
      <div className="flex relative w-[300px] mt-6">
        <Input
          placeholder="Search Users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        ></Input>
        <Search className="absolute left-2 top-1 text-gray-600"></Search>
      </div>
      <div className="grid grid-cols-3 gap-7 mt-7">
        {filteredUser.map((user, index) => {
          return (
            <div key={index} className="bg-pink-100 p-5 rounded-lg">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full  w-16 aspect-square object-cover border border-pink-600"
                  src={user?.profilePic || UserLogo}
                  alt=""
                />
                <div>
                  <h1 className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <h3>{user?.email}</h3>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <Button variant="outline" onClick={() => navigate(`/dashboard/users/${user?._id}`)}>
                  <Edit />
                  Edit
                </Button>
                <Button variant="outline">
                  <Eye />
                  Show Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUser;
