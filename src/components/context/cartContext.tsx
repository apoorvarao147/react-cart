import {createContext} from "react"
import { CartType } from "../types"

export const CartContext = createContext<{cart: CartType; dispatch: any}>({} as {cart: CartType, dispatch: any})