import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const token = localStorage.getItem("token");

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder == "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.productPrice - b.productPrice);
  }

  if (sortOrder == "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.productPrice - a.productPrice);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    //Add existing images public_ids
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    //Add new Files
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        toast.success("Product updated successfully");
        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        );
        dispatch(setProducts(updatedProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        toast.success(res.data.message);
        const remainingProducts = products.filter((product) => product._id !== productId);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <div>
          <Input
            type="text"
            placeholder="search product..."
            className="w-[400px] items-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Short By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price: Low To High </SelectItem>
              <SelectItem value="highToLow">Price: High To Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.map((product, index) => (
        <Card key={index} className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <img src={product.productImg[0]?.url} alt="" className="w-25 h-25" />
              <h1>{product.productName}</h1>
            </div>
            <h1>{product.productPrice}</h1>
            <div className="flex gap-3">
              <Edit
                onClick={() => {
                  setEditProduct(product);
                  setOpen(true);
                }}
                className="text-green-500 cursor-pointer"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 className="text-red-500 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteProductHandler(product._id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm max-h-[740px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>
              Make changes to your product here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1"> Product Name</Label>
              <Input
                type="text"
                name="productName"
                required
                placeholder="Ex- Iphone"
                value={editProduct?.productName || ""}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label>Price</Label>
              <Input
                name="productPrice"
                type="number"
                required
                value={editProduct?.productPrice || ""}
                onChange={handleChange}
              />
            </Field>
            <Field className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Brand</Label>
                <Input
                  name="brand"
                  type="text"
                  required
                  value={editProduct?.brand || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  type="text"
                  required
                  value={editProduct?.category || ""}
                  onChange={handleChange}
                />
              </div>
            </Field>
            <Field>
              <Label>Description</Label>
              <Textarea
                name="productDesc"
                value={editProduct?.productDesc || ""}
                onChange={handleChange}
                placeholder="Enter the product Description here"
              />
            </Field>
            <ImageUpload productData={editProduct} setProductData={setEditProduct} />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProduct;
