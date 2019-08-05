export interface OrderPartType {
  id: number,
  name: string,
  qty: number,
  price: number,
  sum: number
}

export interface OrderType {
  id: number,
  docDate: string,
  docNum: string,
  description: string,
  content?: Array<OrderPartType>
}
