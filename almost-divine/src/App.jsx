import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import MenuDrawer from './components/MenuDrawer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import { useStore } from './store.jsx'

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}

export default function App() {
  const loc = useLocation()
  const home = loc.pathname === '/'
  const { menuOpen, cartOpen, searchOpen, closeAll } = useStore()
  const locked = menuOpen || cartOpen || searchOpen

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeAll])

  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [locked])

  return (
    <div className="app">
      <Header />
      <MenuDrawer />
      <CartDrawer />
      <SearchOverlay />
      {home ? (
        <Home />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} {...fade} style={{ transform: 'none' }}>
            <Routes location={loc}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
