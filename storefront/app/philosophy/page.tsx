import type { Metadata } from "next";

export const metadata: Metadata = { title: "Philosophy" };

export default function PhilosophyPage() {
  return (
    <section className="section">
      <div className="wrap policy">
        <p className="kicker">The house</p>
        <h1>Cut for men who keep their word.</h1>
        <p>
          Valoir is a kurta house, not a costume. The week is the brief: a set you can enter a
          room in without announcing yourself.
        </p>
        <p>
          Dignity is the posture. Integrity is the cloth and the price matching. Confidence is
          the cut sitting still. We do not dress you to dominate a room.
        </p>
        <p>
          Five people. India first. Sets in a planned band of ₹6,000–₹10,000. We will not print
          mill or village names until those contracts exist.
        </p>
      </div>
    </section>
  );
}
