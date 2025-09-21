// Utility functions for scroll optimization

/**
 * Throttle function to limit the rate at which a function is called
 * @param func Function to throttle
 * @param limit Time in milliseconds to wait between calls
 * @returns Throttled function
 */
export function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

/**
 * Debounce function to delay execution of a function
 * @param func Function to debounce
 * @param delay Time in milliseconds to delay execution
 * @returns Debounced function
 */
export function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }
}

/**
 * RequestAnimationFrame-based throttle for scroll events
 * @param func Function to throttle
 * @returns Throttled function using requestAnimationFrame
 */
export function rafThrottle(func: (...args: any[]) => void) {
  let ticking = false;
  return function(this: any, ...args: any[]) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  }
}