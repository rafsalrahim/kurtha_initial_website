import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { formatPrice } from '../data.js'

const ease = [0.22, 1, 0.36, 1]

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, total } = useStore()
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="scrim" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer drawer-right"
            role="dialog"
            aria-label="Cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="drawer-head">
              <span className="caps">Cart ({cart.reduce((n, x) => n + x.qty, 0)})</span>
              <button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button>
            </div>
            <div className="drawer-body">
              {cart.length === 0 && <p className="cart-empty">Your cart is empty.</p>}
              {cart.map((item) => (
                <div className="cart-item" key={item.id + item.size}>
                  <Link to={`/shop/${item.id}`} onClick={() => setCartOpen(false)}>
                    <img src={item.image} alt="" />
                  </Link>
                  <div>
                    <div>{item.name}</div>
                    <div className="note">Size {item.size}</div>
                    <div className="qty">
                      <button aria-label="Decrease" onClick={() => setQty(item.id, item.size, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(item.id, item.size, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div>{formatPrice(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span className="caps">Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="btn-black" disabled>Checkout is not live</button>
              <p className="note">Prototype cart. No payment on this site.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
