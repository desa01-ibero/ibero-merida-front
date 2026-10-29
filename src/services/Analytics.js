export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined") {
    return
  }
  
  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: eventName,
    ...parameters
  })
}