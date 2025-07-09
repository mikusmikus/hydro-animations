import { getRandomNumber } from "./randomNumberApi"

export const dynamic = "force-static"
export const revalidate = 20

export const generateMetadata = async () => {
  const randomNumber = await getRandomNumber() // First call - cache MISS
  console.log(`📊 Metadata regular fetch randomNumber: ${randomNumber}`)

  return {
    title: `Test Regular Fetch ${randomNumber}`,
  }
}

export default async function TestRegularFetch() {
  const randomNumber = await getRandomNumber() // Second call - cache HIT
  console.log(`📊 Page regular fetch randomNumber: ${randomNumber}`)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Regular Fetch</h1>
      <p className="text-lg">Random Number: {randomNumber}</p>
      <p className="text-sm text-gray-600 mt-2">
        Check console -  see the SAME number during build, but different on each request
      </p>
    </div>
  )
}
