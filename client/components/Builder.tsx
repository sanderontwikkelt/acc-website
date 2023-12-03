'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const Builder = () => {
  const search = useSearchParams()
  const builder = search.get('mode') === 'builder'

  useEffect(() => {
    const clickEvent = (event: any) => {
      // Check if the click event occurred within a section
      if (event.target.closest('section')) {
        // Get the ID of the clicked section
        if (
          !['BUTTON', 'A'].includes(event.target.nodeName) &&
          !['BUTTON', 'A'].includes(
            event.target.parentNode && event.target.parentNode.nodeName
          )
        ) {
          const sectionId = event.target.closest('section').id

          parent.postMessage(sectionId, '*')
        }
      }
    }
    if (builder) document.addEventListener('click', clickEvent)
    return () =>
      builder ? document.removeEventListener('click', clickEvent) : undefined
  }, [])
  return null
}
