import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-orange-500">ADE PUTRA</h1>
          <h2 className="text-3xl font-semibold text-gray-300">Capture The Flag</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Test your cybersecurity skills with our challenges.
            Solve challenges, earn points, and climb the leaderboard!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/challenges" className="btn-primary text-lg px-8 py-3">
            Start Hacking
          </Link>
          <Link href="/leaderboard" className="btn-secondary text-lg px-8 py-3">
            Leaderboard
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500">6</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500">10+</div>
            <div className="text-gray-400 text-sm">Challenges</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500">3</div>
            <div className="text-gray-400 text-sm">Difficulty Levels</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500">APCTF</div>
            <div className="text-gray-400 text-sm">Flag Format</div>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <h3 className="text-xl font-semibold text-gray-300">Categories</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Web', 'Crypto', 'Forensics', 'Reverse', 'OSINT', 'Misc'].map((cat) => (
              <span key={cat} className="category-badge text-sm px-4 py-2">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
