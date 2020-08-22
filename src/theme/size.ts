type BreakPoints = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

export const size = (size: keyof BreakPoints, min?: keyof BreakPoints) => {
  const bp: BreakPoints = {
    xs: "575.98px",
    sm: "767.98px",
    md: "991.98px",
    lg: "1199.98px",
    xl: "1439.98px",
    xxl: "1600px",
  }
  if (min) return `@media (min-width: ${bp[size]}) and (max-width: ${bp[min]})`
  return `@media (max-width: ${bp[size]})`
}
