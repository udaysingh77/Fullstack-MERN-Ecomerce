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
import React from "react";
import { useSelector } from "react-redux";
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

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  return (
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <div>
          <Input
            type="text"
            placeholder="search product..."
            className="w-[400px] items-center"
          ></Input>
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>
        <Select>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Short By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="LowToHight">Price: Low To Hight </SelectItem>
              <SelectItem value="HighToLow">Price: High To Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {products.map((product, index) => {
        return (
          <Card key={index} className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <img src={product.productImg[0].url} alt="" className="w-25 h-25" />
                <h1>{product.productName}</h1>
              </div>
              <h1>{product.productPrice}</h1>
              <div className="flex gap-3">
                <Edit className="text-green-500 cursor-pointer" />
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Trash2 className="text-red-500 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm max-h-[740px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit product</DialogTitle>
                        <DialogDescription>
                          Make changes to your product here. Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup>
                        <Field>
                          <Label htmlFor="name-1">Name</Label>
                          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </Field>
                        <Field>
                          <Label htmlFor="username-1">Username</Label>
                          <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProduct;
