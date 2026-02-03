import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userLogo from "../assets/user-icon.jpg";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const { user } = useSelector((store) => store.user);
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChage = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) }); //preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // use formData for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); //image file for backend multer
      }

      const response = await axios.put(
        `http://localhost:3000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update User");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">profile</TabsTrigger>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className=" flex flex-col justify-center items-center bg-gray-100">
              <h1 className=" font-bold mb-7 text-2xl text-gray-800">Update Profile</h1>
              <div className="w-full flex gap-8 justify-between items-start px-7 max-w-2xl">
                {/* Profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePic || userLogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-700"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                    change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
                {/* Profile Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">FirstName</Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={updateUser.firstName}
                        onChange={handleChage}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">LastName</Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="Doe"
                        value={updateUser.lastName}
                        onChange={handleChage}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      ></Input>
                    </div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      disabled
                      value={updateUser.email}
                      onChange={handleChage}
                      className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                    ></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Phone Number</Label>
                    <Input
                      type="text"
                      name="phoneNo"
                      placeholder="Enter Your Contact Info"
                      onChange={handleChage}
                      value={updateUser.phoneNo}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    ></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter Your Address"
                      onChange={handleChage}
                      value={updateUser.address}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    ></Input>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">City</Label>
                      <Input
                        type="text"
                        name="city"
                        placeholder="Enter Your City"
                        onChange={handleChage}
                        value={updateUser.city}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">Zip Code</Label>
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="Enter Your ZipCode"
                        onChange={handleChage}
                        value={updateUser.zipCode}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      ></Input>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg">
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Orders">Change your Orders here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
