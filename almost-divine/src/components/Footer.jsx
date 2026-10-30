import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'

export default function Footer() {
  const { setHomeIndex } = useStore()
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="wordmark" onClick={() => setHomeIndex(0)}>Almost Divine</Link>
          <p>Men’s kurtas. Quiet cloth. Exact cut.</p>
        </div>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <ul>
          <li>Shipping — draft</li>
          <li>Returns — draft</li>
          <li>Contact — not live</li>
        </ul>
      </div>
      <p className="footer-note">
        Prototype. Prices, names, and stills are draft. Not a live shop. No village, loom, or GI claims.
      </p>
    </footer>
  )
}
