import { useEffect, useState } from 'react'

export default function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchIt() {
      setLoading(true)
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        if (mounted) setData(json)
      } catch (e) {
        if (mounted) setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (url) fetchIt()
    return () => { mounted = false }
  }, [url])

  return { data, loading, error }
}
