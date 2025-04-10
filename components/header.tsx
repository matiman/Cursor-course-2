"use client";

import { SignInButton, SignUpButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartAction } from "@/actions/db/cart-actions";
import { SelectCartItem } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [cartItems, setCartItems] = useState<SelectCartItem[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isSignedIn) {
      loadCart();
    } else {
      setIsLoadingCart(false);
    }
  }, [isSignedIn]);

  async function loadCart() {
    try {
      const { data, isSuccess } = await getCartAction();
      if (isSuccess && data) {
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      toast({
        title: "Error",
        description: "Failed to load cart",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCart(false);
    }
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Store
          </Link>

          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>
                    {user.firstName || user.emailAddresses[0]?.emailAddress}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => signOut()}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
                <Link href="/cart">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Cart ({isLoadingCart ? "..." : cartItems.length})
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 