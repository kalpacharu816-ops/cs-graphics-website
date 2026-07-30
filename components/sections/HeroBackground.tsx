export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden bg-cs-black" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(110,0,255,0.26),transparent_54%),linear-gradient(180deg,rgba(34,0,61,0.38)_0%,rgba(5,5,5,0.74)_58%,rgba(5,5,5,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_26%_66%,rgba(5,5,5,0.74),transparent_48%),radial-gradient(ellipse_at_72%_18%,rgba(231,255,0,0.07),transparent_42%),radial-gradient(ellipse_at_50%_0%,rgba(110,0,255,0.2),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.84)_0%,rgba(5,5,5,0.5)_34%,rgba(5,5,5,0.16)_66%,rgba(5,5,5,0.68)_100%)]" />
      <div className="hero-overlay-dark absolute inset-0 bg-gradient-to-t from-cs-black via-cs-black/58 to-cs-black/18" />
      <div className="hero-overlay-light absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,252,0.72)_0%,rgba(248,246,252,0.48)_42%,rgba(255,255,255,0.82)_100%)] opacity-0" />
    </div>
  );
}
