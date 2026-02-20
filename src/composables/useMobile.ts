export const useMobile = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  return {
    isMobile,
  }
}
