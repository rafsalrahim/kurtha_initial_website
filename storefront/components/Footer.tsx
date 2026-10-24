import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>The house</h2>
        <p className="muted">
          Valoir is a men’s kurta house. Cloth, cut, and a week that does not need a stage.
          Photography on this site is licensed stock until the first shoot.
        </p>
      </div>
      <div>
        <h2>Shop</h2>
        <ul>
          <li>
            <Link href="/shop">The collection</Link>
          </li>
          <li>
            <Link href="/philosophy">Philosophy</Link>
          </li>
          <li>
            <Link href="/materials">Materials</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Help</h2>
        <ul>
          <li>
            <Link href="/policies/shipping">Shipping</Link>
          </li>
          <li>
            <Link href="/policies/returns">Returns</Link>
          </li>
          <li>
            <Link href="/policies/size-fit">Size and fit</Link>
          </li>
          <li>
            <Link href="/policies/care">Care</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/policies/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/policies/terms">Terms</Link>
          </li>
        </ul>
      </div>
      <p className="legal">
        Sample catalogue. Prices are planned, not live offers. India, INR. Checkout is not
        taking payment.
      </p>
    </footer>
  );
}
