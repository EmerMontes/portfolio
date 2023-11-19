import { useState } from 'react'
import  styles from './app.module.css'


function App() {
  const [isDarkMode , setIsDarkMode] = useState(false)

  const changeMode = () => {
    setIsDarkMode(!isDarkMode)
  }


  return (

    <div className= {isDarkMode ? styles.contentLigth : styles.contentDak}>
      <section className={styles.section}>
      <p>EmerM</p>
      <button onClick={()=>changeMode()}>{isDarkMode ?'🌙': '☀️'}</button>
      </section>
      

    </div>
  )
}

export default App
