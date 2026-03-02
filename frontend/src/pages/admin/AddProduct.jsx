import React from "react";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProduct = () => {
  return (
    <div className="pl-[350px] py-10 pr-20 mx-auto bg-gray-100">
      <Card className="w-full my-20">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter Product Details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col  gap-2">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input type="number" name="productPrice" placeholder="" required />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
