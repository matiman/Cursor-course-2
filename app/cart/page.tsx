"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getCartAction, removeFromCartAction, updateCartItemQuantityAction } from "@/actions/db/cart-actions"
import { SelectCartItem } from "@/db/schema"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Header } from "@/components/header"

export default function Cart() {
  const [cartItems, setCartItems] = useState<SelectCartItem[]>([])
  const { toast } = useToast()
  const { isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      loadCart()
    }
  }, [isSignedIn])

  async function loadCart() {
    const { data, isSuccess } = await getCartAction()
    if (isSuccess && data) {
      setCartItems(data)
    }
  }

  async function handleUpdateQuantity(itemId: string, quantity: number) {
    if (quantity < 1) return

    const { isSuccess, message } = await updateCartItemQuantityAction(itemId, quantity)
    if (isSuccess) {
      loadCart()
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
  }

  async function handleRemoveItem(itemId: string) {
    const { isSuccess, message } = await removeFromCartAction(itemId)
    if (isSuccess) {
      loadCart()
      toast({
        title: "Success",
        description: "Item removed from cart"
      })
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your cart</h1>
        </div>
      </div>
    )
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">${item.price * item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">${total}</span>
            </div>
          </>
        )}
      </main>
    </div>
  )
} 