import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { PropsWithChildren } from 'react'

import type { Product } from '../../pages/Home/types'

const CART_STORAGE_KEY = 'mobile-commerce-cart'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: Record<string, CartItem>
}

type CartAction =
  | {
      type: 'ADD_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR'
    }

const initialState: CartState = {
  items: {},
}

const CartContext = createContext<{
  items: CartItem[]
  totalItems: number
  addItem: (product: Product) => void
  clear: () => void
} | null>(null)

const loadFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return initialState
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return initialState
    }

    const parsed = JSON.parse(stored) as CartState
    if (!parsed || typeof parsed !== 'object' || !parsed.items) {
      return initialState
    }

    return parsed
  } catch (error) {
    console.warn('Failed to load cart state from storage', error)
    return initialState
  }
}

const persistToStorage = (state: CartState) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to persist cart state', error)
  }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { payload } = action
      const existing = state.items[payload.id]

      const nextQuantity = existing ? existing.quantity + 1 : 1

      return {
        items: {
          ...state.items,
          [payload.id]: {
            product: payload,
            quantity: nextQuantity,
          },
        },
      }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

const syncWithServer = async (state: CartState) => {
  // 预留与后端同步的接口，后续可在此发送网络请求
  console.info('[cart] ready to sync with backend', state)
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadFromStorage)

  useEffect(() => {
    persistToStorage(state)
    void syncWithServer(state)
  }, [state])

  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const value = useMemo(() => {
    const items = Object.values(state.items)
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

    return {
      items,
      totalItems,
      addItem,
      clear,
    }
  }, [state, addItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
