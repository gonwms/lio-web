export async function getIp() {
  try {
    const res = await fetch('https://freeipapi.com/api/json')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching IP address:', error)
  }
}
