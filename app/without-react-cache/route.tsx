


const getReactCachedRandomNumber = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const randomNum = Math.floor(Math.random() * 1000)

  console.log(`🔥 React cached getRandomNumber() executed - Generated: ${randomNum}`)

  return randomNum
}

export const dynamic = "force-static"
export const revalidate = 20

export const generateMetadata = async () => {
  const randomNumber = await getReactCachedRandomNumber() // First call - cache MISS
  console.log(`📊 Metadata React cached randomNumber: ${randomNumber}`)

  return {
    title: `Test WITHOUT React Cache ${randomNumber}`,
  }
}

export default async function TestReactCache() {
  const randomNumber = await getReactCachedRandomNumber() // Second call - cache HIT
  console.log(`📊 Page React cached randomNumber: ${randomNumber}`)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test WITHOUT React Cache</h1>
      <p className="text-lg">Random Number: {randomNumber}</p>
      <p className="text-sm text-gray-600 mt-2">
        Check console -  see the SAME number during build, but different on each request
      </p>
    </div>
  )
}
