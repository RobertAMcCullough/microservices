// special file name - overriding the App wrapper that Next already does
// this is the only component that will always be loaded, so global css imports need to happen here
import 'bootstrap/dist/css/bootstrap.css' // after npm i bootstrap

// Component is the component being rendered (the page)
export default ({ Component, pageProps}) => {
    return <Component {...pageProps} />
}