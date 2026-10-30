import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function MenuDrawer() {
  const { menuOpen, setMenuOpen } = useStore()
  const close = () => setMenuOpen(false)
  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div className="scrim" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer drawer-left"
            role="dialog"
            aria-label="Menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="drawer-head">
              <span className="caps">Menu</span>
              <button className="icon-btn" aria-label="Close menu" onClick={close}>×</button>
            </div>
            <div className="drawer-body">
              <ul className="menu-list">
                <li><Link to="/shop" onClick={close}>Shop</Link></li>
                <li><Link to="/shop?c=weekday" onClick={close}>Weekday</Link></li>
                <li><Link to="/shop?c=evening" onClick={close}>Evening</Link></li>
                <li><Link to="/about" onClick={close}>About</Link></li>
              </ul>
              <div className="menu-meta">
                <p>Men’s kurtas. Quiet cloth. Exact cut.</p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
