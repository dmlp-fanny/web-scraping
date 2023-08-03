import { useEffect, useState } from 'react'
import AdsContainer from './components/Ads/AdsContainer'

function App() {
  const [adsData, setAdsData] = useState(null)

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080');
    const data = await response.json();
    setAdsData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {
        adsData ? <AdsContainer adsData={adsData}/> : 'No flats found...'
      }
    </>
  )
}

export default App
