import {createContext} from "react"
import { Cart } from "../types"

export const CartContext = createContext<{cart: Cart; dispatch: any}>({} as {cart: Cart, dispatch: any})