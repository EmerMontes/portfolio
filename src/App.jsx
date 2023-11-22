import { useState } from 'react'
import  styles from './app.module.css'


function App() {
  const [isDarkMode , setIsDarkMode] = useState(true)

  const changeMode = () => {
    setIsDarkMode(!isDarkMode)
  }


  return (

    <div className= {isDarkMode ? styles.contentLigth : styles.contentDak}>
      <section className={styles.section}>
        <div >
          <img src='/head1.png' alt="icono" /> 
         <p>EmerM</p> 
        </div>
        
       <label className={styles.switch}>
         <input onChange={changeMode} type="checkbox"/>
         <span className={styles.slider}></span>
       </label>
      </section>

      <section className={styles.head}>
          <h1><span> Full Stack <br/>Developer</span></h1>
          <p>Hola <img style={{width: "45px"}} src='/manito.gif'/> un gusto tenerte por aca, 
           si que soy una excelente opcion para tu equipo. No dudes en dejarme
           tu feedback, es de mucha ayuda para mi.</p>

           <button className={styles.btn}>
              <span className={styles.text}>Contactame!</span>
          </button>
      </section>
        
      <section  className={styles.about}>
          <img src="/tl3.png" alt="" /> 
        <div>
          <h2>About me: </h2>
          <p>¡Hola! Soy Emerson Montes, desarrollador Full Stack, en
          constante crecimiento, con
          habilidades sólidas en el desarrollo
          web.<br/>
          <br/>
          Mi enfoque se centra en el desarrollo tanto del frontend como del backend, utilizando tecnologías modernas como React.js y Node.js. Mi objetivo es construir soluciones tecnológicas robustas y eficientes que impulsen la experiencia del usuario y satisfagan las necesidades del cliente.
          </p>
         <a href="../public/Cv Emerson-w.pdf" download='Cv-EmersonMontes'>
         <button className={styles.btn}>
              <span className={styles.text}> <img src="/download.png" style={{width: "10px"}} /> Download Cv</span>
          </button>
         </a>
        </div>
      </section>

      <section className={styles.skill}>
        <h2> Skill: </h2>


      </section>

    </div>
  )
}

export default App
