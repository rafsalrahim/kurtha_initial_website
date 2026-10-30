import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../data.js'
import Footer from '../components/Footer.jsx'
import { useStore } from '../store.jsx'

const LAST = chapters.length
const TURN = 700
const IDLE = 10000

export default function Home() {
  const { setHomeIndex } = useStore()
  const [page, setPage] = useState(0)
  const pageRef = useRef(0)
  const lock = useRef(false)
  const startY = useRef(0)
  pageRef.current = page

  const go = useCallback((d) => {
    if (lock.current) return
    const next = Math.min(LAST, Math.max(0, pageRef.current + d))
    if (next === pageRef.current) return
    lock.current = true
    pageRef.current = next
    setPage(next)
    setHomeIndex(next)
    window.setTimeout(() => {
      lock.current = false
    }, TURN)
  }, [setHomeIndex])

  useEffect(() => {
    if (page >= LAST) return
    const t = window.setTimeout(() => go(1), IDLE)
    return () => window.clearTimeout(t)
  }, [page, go])

  useEffect(() => {
    setHomeIndex(0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 24) return
      e.preventDefault()
      go(e.deltaY > 0 ? 1 : -1)
    }
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        go(-1)
      }
    }
    const onTouchStart = (e) => {
      startY.current = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      e.preventDefault()
    }
    const onTouchEnd = (e) => {
      const dy = startY.current - e.changedTouches[0].clientY
      if (dy > 48) go(1)
      else if (dy < -48) go(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [go, setHomeIndex])

  return (
    <main className="reader">
      <div className="reader-stage">
        {chapters.map((ch, i) => (
          <section
            key={ch.id}
            className={`banner ink-${ch.ink} ${i <= page ? 'is-in' : ''}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="banner-media">
              <img src={ch.src} alt="" />
            </div>
            <div className="banner-shade" aria-hidden="true" />
            <div className="banner-copy">
              <p className="banner-kicker">{ch.kicker}</p>
              <h2 className="banner-title">{ch.title}</h2>
              <Link className="btn-simple" to={ch.to}>{ch.cta}</Link>
              {ch.hint && i === 0 && <p className="banner-hint">{ch.hint}</p>}
            </div>
          </section>
        ))}
        <section
          className={`banner banner-end ${page >= LAST ? 'is-in' : ''}`}
          style={{ zIndex: LAST + 1 }}
        >
          <Footer />
        </section>
      </div>
      {page < LAST && (
        <ol className="ticks" aria-label="Chapters">
          {chapters.map((ch, i) => (
            <li key={ch.id} className={i === page ? 'on' : ''}>
              <span>0{i + 1}</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
