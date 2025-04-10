"use client"

import { create } from "zustand"
import { SelectCartItem } from "@/db/schema"

interface CartStore {
  items: SelectCartItem[]
  addItem: (item: SelectCartItem) => void
  removeItem: (itemId: string) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
})) 