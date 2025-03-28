"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

//list 4 products with id, name, price, image, and description 
//when displayed, the products should be in 2 columns
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "https://via.placeholder.com/150",
    description: "This is a product",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image: "https://via.placeholder.com/150",
    description: "This is a product",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image: "https://via.placeholder.com/150",
    description: "This is a product",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image: "https://via.placeholder.com/150",
    description: "This is a product",
  },
];


interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function Store() {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  }
  return (
    <div>
      <h1>Store</h1>
      {/* listing should contain 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* cart should be on the right side of the page */}
        <div className="fixed right-0 top-0 h-full w-1/4 bg-white">
          <h2>Cart</h2>
          {cart.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
        {products.map((product) => (
        <Card key={product.id}>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={() => setCart([...cart, product])}>Add to Cart</Button>
            </CardFooter>
        </Card>   
    ))}
    </div>
    </div>
  );
}