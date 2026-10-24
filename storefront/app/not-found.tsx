import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap policy">
        <h1>Not found</h1>
        <p>That page is not in the house.</p>
        <p>
          <Link href="/">Home</Link>
        </p>
      </div>
    </section>
  );
}
