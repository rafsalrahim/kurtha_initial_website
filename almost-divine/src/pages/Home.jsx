import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../data.js'
import Footer from '../components/Footer.jsx'
import { useStore } from '../store.jsx'

const LAST = chapters.length
const TURN = 700
const IDLE = 10000

export default function Home() {
  const { setHomeIndex, homeIndex, cartOpen, searchOpen } = useStore()
  const [page, setPage] = useState(0)
  const [hold, setHold] = useState(false)
  const pageRef = useRef(0)
  const lock = useRef(false)
  const startY = useRef(0)
  const stageRef = useRef(null)
  const blocked = useRef(false)
  pageRef.current = page
  blocked.current = cartOpen || searchOpen

  useEffect(() => {
    if (homeIndex === pageRef.current) return
    pageRef.current = homeIndex
    setPage(homeIndex)
  }, [homeIndex])

  const go = useCallback((d) => {
    if (lock.current || blocked.current) return
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

  const jump = useCallback((i) => {
    if (lock.current || blocked.current) return
    if (i === pageRef.current) return
    lock.current = true
    pageRef.current = i
    setPage(i)
    setHomeIndex(i)
    window.setTimeout(() => {
      lock.current = false
    }, TURN)
  }, [setHomeIndex])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (page >= LAST || hold || cartOpen || searchOpen || reduce || document.hidden) return
    const t = window.setTimeout(() => go(1), IDLE)
    return () => window.clearTimeout(t)
  }, [page, go, hold, cartOpen, searchOpen])

  useEffect(() => {
    setHomeIndex(0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onWheel = (e) => {
      if (blocked.current) return
      if (Math.abs(e.deltaY) < 24) return
      e.preventDefault()
      go(e.deltaY > 0 ? 1 : -1)
    }
    const onKey = (e) => {
      if (blocked.current) return
      if (e.target.closest?.('a, button, input, textarea, [role="dialog"]')) return
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
      if (blocked.current) return
      e.preventDefault()
    }
    const onTouchEnd = (e) => {
      if (blocked.current) return
      const dy = startY.current - e.changedTouches[0].clientY
      if (dy > 48) go(1)
      else if (dy < -48) go(-1)
    }
    const onVis = () => setHold(document.hidden)

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchend', onTouchEnd)
    document.addEventListener('visibilitychange', onVis)
    const stage = stageRef.current
    stage?.addEventListener('touchstart', onTouchStart, { passive: true })
    stage?.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('visibilitychange', onVis)
      stage?.removeEventListener('touchstart', onTouchStart)
      stage?.removeEventListener('touchmove', onTouchMove)
    }
  }, [go, setHomeIndex])

  return (
    <main className="reader" id="content">
      <div
        className="reader-stage"
        ref={stageRef}
        onPointerEnter={() => setHold(true)}
        onPointerLeave={() => setHold(false)}
      >
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
          <div className="end-card">
            <p className="banner-kicker">Vol. 01</p>
            <h2 className="page-title">The week, cut exact</h2>
            <p className="end-copy">Men’s kurtas. Quiet cloth. India first.</p>
            <div className="end-actions">
              <Link className="btn-black" to="/shop">Shop the drop</Link>
              <Link className="btn-simple" to="/about">The house</Link>
            </div>
          </div>
          <Footer />
        </section>
      </div>
      {page < LAST && (
        <ol className="ticks" aria-label="Chapters">
          {chapters.map((ch, i) => (
            <li key={ch.id} className={i === page ? 'on' : ''}>
              <button type="button" onClick={() => jump(i)} aria-current={i === page ? 'true' : undefined}>
                0{i + 1}
              </button>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
