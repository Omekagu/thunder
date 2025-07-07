import '../scss/index.scss'

export default function MyApp ({ Component, pageProps }) {
  console.log('Rendering:', Component) // Add this line
  return <Component {...pageProps} />
}
