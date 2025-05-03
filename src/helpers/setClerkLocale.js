export async function setClerkLocale(lang) {
  // Tunggu sampai Clerk siap (maks. 2 detik)
  const waitUntilReady = () => {
    return new Promise((resolve, reject) => {
      let tries = 0
      const interval = setInterval(() => {
        tries++
        if (window.Clerk?.setLocale) {
          clearInterval(interval)
          resolve()
        }
        if (tries > 20) { // 20 x 100ms = 2 detik
          clearInterval(interval)
          reject(new Error('Clerk not ready'))
        }
      }, 100)
    })
  }

  try {
    await waitUntilReady()
    window.Clerk.setLocale(lang)
  } catch (err) {
    console.warn('Gagal set locale ke Clerk:', err)
  }
}
