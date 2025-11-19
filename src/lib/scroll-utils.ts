// Utility functions for scroll optimization

/**
 * Throttle function to limit the rate at which a function is called
 * @param func Function to throttle
 * @param limit Time in milliseconds to wait between calls
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number) {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
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
export function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }
}

/**
 * RequestAnimationFrame-based throttle for scroll events
 * @param func Function to throttle
 * @returns Throttled function using requestAnimationFrame
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(func: T) {
  let ticking = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  }
}