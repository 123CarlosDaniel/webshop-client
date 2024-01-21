export interface Cart {
  items: Array<CartItem>
}

export interface CartItem {
  id: number
  imageUrl: string
  name: string
  price: number
  quantity: number
}
