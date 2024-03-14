import { useEffect, useState } from 'react'

export default function LandingCounter({ count }) {

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        let landingCounterInterval = setInterval(() => setCounter(prev => prev + 1), 10)
        counter === count && clearInterval(landingCounterInterval)
        return () => clearInterval(landingCounterInterval)
    })

    return ( counter )
}
