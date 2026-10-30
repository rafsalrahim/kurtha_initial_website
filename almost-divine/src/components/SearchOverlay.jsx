import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { products, formatPrice } from '../data.js'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (searchOpen) setQ('')
  }, [searchOpen])

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return products
    return products.filter((p) => `${p.name} ${p.color} ${p.collection}`.toLowerCase().includes(s))
  }, [q])

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="search-panel"
          role="dialog"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="search-bar">
            <input
              autoFocus
              placeholder="Search kurtas"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search"
            />
            <button className="icon-btn" aria-label="Close search" onClick={() => setSearchOpen(false)}>×</button>
          </div>
          <div className="search-results">
            {hits.map((p) => (
              <Link key={p.id} className="search-row" to={`/shop/${p.id}`} onClick={() => setSearchOpen(false)}>
                <img src={p.images[0]} alt="" />
                <div>
                  <div>{p.name}</div>
                  <div className="note">{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
            {hits.length === 0 && <p className="cart-empty">Nothing matches.</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
