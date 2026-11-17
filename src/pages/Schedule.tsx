const EVENTS = [
  {
    time: '9:00 AM',
    title: 'Haldi Ceremony',
    description: 'Traditional turmeric ceremony with close family. Wear something you don\'t mind getting yellow!',
    icon: '🌼',
    location: 'Family Home',
  },
  {
    time: '11:00 AM',
    title: 'Mehndi',
    description: 'Intricate henna designs for the bride and guests. Snacks and music all around.',
    icon: '🎨',
    location: 'Garden Area',
  },
  {
    time: '4:00 PM',
    title: 'Wedding Ceremony',
    description: 'The main event! Join us as we tie the knot with traditional rituals and blessings.',
    icon: '💒',
    location: 'Main Hall',
  },
  {
    time: '6:00 PM',
    title: 'Cocktail Hour',
    description: 'Mix, mingle, and enjoy drinks while the couple takes photos.',
    icon: '🥂',
    location: 'Terrace',
  },
  {
    time: '7:30 PM',
    title: 'Reception & Dinner',
    description: 'An evening of food, toasts, laughter, and dancing under the stars.',
    icon: '🍽️',
    location: 'Banquet Hall',
  },
  {
    time: '10:00 PM',
    title: 'Dance & Party',
    description: 'DJ drops the beat — time to celebrate on the dance floor!',
    icon: '💃',
    location: 'Dance Floor',
  },
]

function Schedule() {
  return (
    <div className="schedule-page">
      <div className="page-header">
        <h1>Event Schedule</h1>
        <p>Here's what's happening on the big day</p>
      </div>

      <div className="timeline">
        {EVENTS.map((event, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot">
              <span>{event.icon}</span>
            </div>
            <div className="timeline-card">
              <div className="timeline-time">{event.time}</div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="timeline-location">
                <span className="location-pin">📍</span> {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Schedule
