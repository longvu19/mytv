export function useBreakpoints() {
  const { sm, md, lg } = {
    sm: 576,
    md: 768,
    lg: 992
  }
  return {
    isMobile: window.matchMedia(`(max-width: ${sm}px)`).matches,
    isTablet: window.matchMedia(`(max-width: ${md}px)`).matches,
    isDesktop: window.matchMedia(`(max-width: ${lg}px)`).matches
  }
}