import Countdown from '../components/Countdown'
import SnowLeopards from '../components/SnowLeopards'

const PARTNER_1 = 'Sai'
const PARTNER_2 = 'Pragati'
const WEDDING_DATE = '2027-02-27'

function Home() {
  const petals = Array.from({ length: 15 }, (_, i) => i)

  return (
    <div className="landing">
      {/* Floating petals */}
      <div className="petals-container">
        {petals.map((i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Hero section */}
      <section className="hero">
        {/* Snow leopard pair illustration behind text */}
        <SnowLeopards />

        <p className="hero-pre">We're getting married!</p>
        <h1 className="hero-names">
          <span className="name">{PARTNER_1}</span>
          <span className="amp">&amp;</span>
          <span className="name">{PARTNER_2}</span>
        </h1>
        <div className="hero-divider">
          <span className="line" />
          <span className="ornament">✦</span>
          <span className="line" />
        </div>
        <p className="hero-date">
          {new Date(WEDDING_DATE).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <Countdown targetDate={WEDDING_DATE} />

        {/* Quote */}
        <blockquote className="hero-quote">
          "He adorned her with flowers, she adorned him with love."
        </blockquote>

        {/* Rosette divider */}
        <div className="rosette-divider" aria-hidden="true">
          <span className="rosette" /><span className="rosette sm" /><span className="rosette" />
          <span className="rosette sm" /><span className="rosette" /><span className="rosette sm" /><span className="rosette" />
        </div>
      </section>

    </div>
  )
}

export default Home
