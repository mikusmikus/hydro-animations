import Carousel from "./components/carousel"
import Navigation from "./components/navigation"

export default function Home() {
  return (
    <main className="h-[200dvh] bg-[#e1e1e1] relative">
        <Navigation />
        <Carousel />
    </main>
  )
}
