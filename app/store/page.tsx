"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShoppingCart, Trash2 } from "lucide-react"
import { addToCartAction, getCartAction, removeFromCartAction } from "@/actions/db/cart-actions"
import { SelectCartItem } from "@/db/schema"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { useAuth } from "@clerk/nextjs"

//list 4 products with id, name, price, image, and description 
//when displayed, the products should be in 2 columns
const products = [
  {
    id: "1",
    name: "Premium Course",
    description: "Access to all premium content and features",
    price: "99.99",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop"
  },
  {
    id: "2",
    name: "Basic Course",
    description: "Access to basic content and features",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop"
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    price: "1299.00",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop",
    description: "Complete camera kit with lens, tripod, and accessories for professional photography.",
  },
  {
    id: "4",
    name: "Gaming Console Bundle",
    price: "499.00",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&h=500&fit=crop",
    description: "Latest gaming console with two controllers and popular game titles included.",
  }
]

export default function StorePage() {
  const { items, addItem, removeItem, isLoading } = useCart()
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const { isSignedIn, userId } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      loadCart()
    }
  }, [isSignedIn])

  async function loadCart() {
    const { data, isSuccess } = await getCartAction()
    if (isSuccess && data) {
      data.forEach((item: SelectCartItem) => {
        addItem(item)
      })
    }
  }

  const handleAddToCart = async (productId: string) => {
    if (!isSignedIn) {
      toast.error("Please sign in to add items to cart")
      return
    }

    try {
      setLoadingStates(prev => ({ ...prev, [productId]: true }))
      const product = products.find(p => p.id === productId)
      if (!product) {
        toast.error("Product not found")
        return
      }

      const { data, isSuccess } = await addToCartAction({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1
      })

      if (isSuccess && data) {
        addItem(data)
        toast.success("Added to cart")
      } else {
        toast.error("Failed to add to cart")
      }
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }))
    }
  }

  const handleRemoveFromCart = async (productId: string) => {
    if (!isSignedIn) {
      toast.error("Please sign in to remove items from cart")
      return
    }

    try {
      setLoadingStates(prev => ({ ...prev, [productId]: true }))
      const cartItem = items.find(item => item.productId === productId)
      if (!cartItem) {
        toast.error("Item not found in cart")
        return
      }

      const { isSuccess } = await removeFromCartAction(cartItem.id)

      if (isSuccess) {
        removeItem(cartItem.id)
        toast.success("Removed from cart")
      } else {
        toast.error("Failed to remove from cart")
      }
    } catch (error) {
      toast.error("Failed to remove from cart")
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }))
    }
  }

  const isItemInCart = (productId: string) => {
    return items.some(item => item.productId === productId)
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please sign in to add items to your cart
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <Button disabled>
                      Sign in to Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => {
            const inCart = isItemInCart(product.id)
            const isLoading = loadingStates[product.id]

            return (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <Button
                      variant={inCart ? "destructive" : "default"}
                      onClick={() => inCart ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)}
                      disabled={isLoading || inCart}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : inCart ? (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove from Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}