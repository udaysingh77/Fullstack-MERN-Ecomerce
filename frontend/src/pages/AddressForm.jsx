import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAdresses, deleteAddress, setSelectedAddress } from "@/redux/productSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const { addresses, selectedAddress } = useSelector((store) => store.product);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAdresses(formData));
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto grid p-10 place-items-center">
      <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white">
          {showForm ? (
            <>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  required
                  placeholder="userId@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Your Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  placeholder="John Doe"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    placeholder="Ex Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    required
                    placeholder="Ex Rajesthan"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    required
                    placeholder="70010"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    placeholder="Ex Rajesthan"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                Save & Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Saved Address</h2>
              {addresses.map((addr, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => dispatch(setSelectedAddress(index))}
                    className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}
                  >
                    <p className="font-medium">{addr.fullName}</p>
                    <p>{addr.phone}</p>
                    <p>{addr.email}</p>
                    <p>
                      {addr.address},{addr.city},{addr.state},{addr.zip},{addr.country}
                    </p>
                    <button
                      onClick={(e) => dispatch(deleteAddress(index))}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <Button variant="outline" className="w-full" onClick={() => setShowForm(true)}>
                + Add New Address
              </Button>
              <Button disabled={selectedAddress === null} className="w-full bg-pink-600">
                Proceed To Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
