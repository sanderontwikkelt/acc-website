// Declare a global script for gtag if it's missing from the .d.ts files
interface Gtag {
  (command: 'config', targetId: string, config?: any): void
  (command: 'set', config: any): void
  (command: 'event', action: string, eventParams?: any): void
}

// Extend the Window interface
declare global {
  interface Window {
    // Define the gtag function
    gtag: Gtag
  }
}

export {}
