import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { collections, formatPrice, products } from '../data.js'
import { useStore } from '../store.jsx'
import Footer from '../components/Footer.jsx'

export default function Shop() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const filter = params.get('c') || 'all'
  const { add, saved, toggleSave } = useStore()
  const list = filter === 'all' ? products : products.filter((p) => p.collection === filter)

  return (
    <main className="page">
      <div className="page-inner">
        <h1 className="page-title">Shop</h1>
        <div className="filter-row">
          {['all', 'weekday', 'evening'].map((id) => (
            <button
              key={id}
              className={filter === id ? 'on' : ''}
              onClick={() => nav(id === 'all' ? '/shop' : `/shop?c=${id}`)}
            >
              {id === 'all' ? 'All' : id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid-2">
          {list.map((p) => (
            <article key={p.id} className="card">
              <div className="card-photo">
                <Link to={`/shop/${p.id}`}>
                  <img src={p.images[0]} alt={p.name} />
                </Link>
                <button
                  className={`card-save ${saved.has(p.id) ? 'on' : ''}`}
                  aria-label={saved.has(p.id) ? 'Remove bookmark' : 'Bookmark'}
                  onClick={() => toggleSave(p.id)}
                >
                  <svg width="14" height="16" viewBox="0 0 14 16" fill={saved.has(p.id) ? 'currentColor' : 'none'} aria-hidden="true">
                    <path d="M2 1.5h10v13l-5-3.2-5 3.2v-13Z" stroke="currentColor" />
                  </svg>
                </button>
                <span className="card-dots" aria-hidden="true">
                  {p.images.map((_, i) => <i key={i} className={i === 0 ? 'on' : ''} />)}
                </span>
                <button
                  className="card-add"
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => add(p, 'M')}
                >
                  +
                </button>
              </div>
              <Link to={`/shop/${p.id}`} className="card-meta">
                <div className="card-name">{p.name}</div>
                <div className="card-price">{formatPrice(p.price)}</div>
              </Link>
            </article>
          ))}
        </div>
        <div className="deck" aria-label="Collections">
          {collections.map((c) => (
            <Link
              key={c.id}
              className="deck-card"
              to={c.id === 'evening' ? '/shop?c=evening' : '/shop?c=weekday'}
            >
              <img src={c.src} alt="" />
              <span>{c.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
