import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [saved, setSaved] = useState(() => new Set())
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [homeIndex, setHomeIndex] = useState(0)

  const closeAll = useCallback(() => {
    setMenuOpen(false)
    setCartOpen(false)
    setSearchOpen(false)
  }, [])

  const add = useCallback((product, size) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === product.id && x.size === size)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + 1 }
        return next
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.images[0], size, qty: 1 }]
    })
    setMenuOpen(false)
    setSearchOpen(false)
    setCartOpen(true)
  }, [])

  const setQty = useCallback((id, size, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((x) => !(x.id === id && x.size === size))
      return prev.map((x) => (x.id === id && x.size === size ? { ...x, qty } : x))
    })
  }, [])

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const count = cart.reduce((n, x) => n + x.qty, 0)
  const total = cart.reduce((n, x) => n + x.price * x.qty, 0)

  const value = useMemo(
    () => ({
      cart,
      count,
      total,
      add,
      setQty,
      saved,
      toggleSave,
      menuOpen,
      setMenuOpen,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      homeIndex,
      setHomeIndex,
      closeAll,
    }),
    [cart, count, total, add, setQty, saved, toggleSave, menuOpen, cartOpen, searchOpen, homeIndex, closeAll],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore outside provider')
  return ctx
}
