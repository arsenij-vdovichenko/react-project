import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {


  return (
    <>
    <LanguageProvider>
      <Header/>
      <Main/>
      <Footer/>
      </LanguageProvider>
    </>
  )
}

export default App
