import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, products, sizes } from '../data.js'
import { useStore } from '../store.jsx'
import Footer from '../components/Footer.jsx'

const chart = [
  ['S', '38', '42', '44'],
  ['M', '40', '44', '46'],
  ['L', '42', '46', '48'],
  ['XL', '44', '48', '50'],
]

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { add } = useStore()
  const [size, setSize] = useState('M')
  const [shot, setShot] = useState(0)
  const [chartOpen, setChartOpen] = useState(false)

  if (!product) {
    return (
      <main className="page">
        <div className="page-inner">
          <p>Not in this drop.</p>
          <Link to="/shop">Back to shop</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="page-inner">
        <div className="pdp">
          <div className="pdp-gallery">
            <img src={product.images[shot]} alt={product.name} />
            {product.images.length > 1 && (
              <div className="pdp-thumbs">
                {product.images.map((src, i) => (
                  <button key={src} className={i === shot ? 'on' : ''} onClick={() => setShot(i)} aria-label={`Image ${i + 1}`}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="pdp-info">
            <h1 className="pdp-name">{product.name}</h1>
            <p className="pdp-price">{formatPrice(product.price)}</p>
            <div className="pdp-block">
              <h3>Size</h3>
              <div className="sizes">
                {sizes.map((s) => (
                  <button key={s} className={`size ${size === s ? 'on' : ''}`} onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <button className="chart-toggle" onClick={() => setChartOpen((v) => !v)}>
                {chartOpen ? 'Hide size chart' : 'Size chart'}
              </button>
              {chartOpen && (
                <table className="chart">
                  <thead>
                    <tr><th>Size</th><th>Chest</th><th>Shoulder</th><th>Length</th></tr>
                  </thead>
                  <tbody>
                    {chart.map((row) => (
                      <tr key={row[0]}>{row.map((c) => <td key={c}>{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button className="btn-black" onClick={() => add(product, size)}>
              Add to cart
            </button>
            <div className="pdp-block">
              <h3>Fabric</h3>
              <p>{product.fabric}</p>
            </div>
            <div className="pdp-block">
              <h3>Fit</h3>
              <p>{product.fit}</p>
            </div>
            <div className="pdp-block">
              <h3>Care</h3>
              <p>{product.care}</p>
            </div>
            <p className="note">Draft copy and measurements. Not a live listing.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
