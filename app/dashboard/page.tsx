import Image from "next/image"
import dynamic from "next/dynamic"

const FinanceTracker = dynamic(() => import("../components/FinanceTracker"), {
  loading: () => <p>Loading...</p>,
})

export default function Dashboard() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2011.59.44_139104d6.jpg-RSLaaM9Xkku2ozOOx9vHRqPrEZs8Df.jpeg"
          alt="Finance Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90" />
      </div>

      {/* Content */}
      <main className="relative z-10 container mx-auto p-4">
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold text-white">Personal Finance Tracker</h1>
          <p className="text-gray-300 mt-2">Manage your expenses efficiently</p>
        </div>
        <div className="backdrop-blur-sm">
          <FinanceTracker />
        </div>
      </main>
    </div>
  )
}

