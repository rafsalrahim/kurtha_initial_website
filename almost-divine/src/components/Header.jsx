import { Link, useLocation } from 'react-router-dom'
import { chapters, nav } from '../data.js'
import { useStore } from '../store.jsx'

export default function Header() {
  const { count, setCartOpen, setSearchOpen, homeIndex } = useStore()
  const loc = useLocation()
  const home = loc.pathname === '/'
  const onPhoto = home && homeIndex < chapters.length
  const ch = onPhoto ? chapters[homeIndex] : null
  const solid = !onPhoto
  const ink = ch ? ch.ink : 'dark'
  const wash = ch ? ch.wash : '#1a1a1a'

  return (
    <header
      className={`header ${solid ? 'solid' : 'overlay'} ink-${ink}`}
      style={{ '--wash': wash }}
    >
      <nav className="header-left" aria-label="Primary">
        {nav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`nav-link ${item.hideSm ? 'nav-hide-sm' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link to="/" className="wordmark">Almost Divine</Link>
      <div className="header-right">
        <button className="icon-btn text-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
          <span className="link-label">Search</span>
          <svg className="icon-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="6.1" cy="6.1" r="4.4" stroke="currentColor" />
            <path d="M9.2 9.2L12.2 12.2" stroke="currentColor" />
          </svg>
        </button>
        <button className="icon-btn text-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
          <span className="link-label">Cart</span>
          <svg className="icon-svg" width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
            <path d="M1 4.5h12l-1 10H2L1 4.5Z" stroke="currentColor" />
            <path d="M4 4.5V3.2A3 3 0 0 1 7 0.5 3 3 0 0 1 10 3.2v1.3" stroke="currentColor" />
          </svg>
          {count > 0 && <span className="cart-count">{count}</span>}
        </button>
      </div>
    </header>
  )
}
