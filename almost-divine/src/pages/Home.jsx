import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { banners } from '../data.js'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const stackRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const root = stackRef.current
    if (!root) return
    const panels = [...root.querySelectorAll('.banner')]

    const onScroll = () => {
      const h = window.innerHeight
      const y = window.scrollY
      panels.forEach((el, i) => {
        const media = el.querySelector('.banner-media')
        const copy = el.querySelector('.banner-copy')
        const progress = Math.min(1, Math.max(0, (y - i * h) / h))
        if (media) media.style.transform = `scale(${1 + progress * 0.1})`
        if (copy) copy.style.opacity = String(1 - Math.min(1, progress * 1.15))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      <div className="home-stack" ref={stackRef}>
        {banners.map((b, i) => (
          <section
            key={b.id}
            className={`banner ink-${b.ink}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="banner-media">
              <img src={b.src} alt="" />
            </div>
            <div className="banner-copy">
              <p className="banner-kicker">{b.kicker}</p>
              <h2 className="banner-title">{b.title}</h2>
              <Link className="btn-simple" to={b.to}>{b.cta}</Link>
              {b.hint && <p className="banner-hint">{b.hint}</p>}
              <p className="banner-index">0{i + 1} — 0{banners.length}</p>
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </main>
  )
}
