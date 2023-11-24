import { useState, useRef } from 'react'
import  styles from './app.module.css'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';


function App() {
  
  const form = useRef();
  const [isDarkMode , setIsDarkMode] = useState(true)
  
  const changeMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  const sendEmail = (event) => {
    
    event.preventDefault();
    const formData = new FormData(form.current);
    const userName = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const message = formData.get('message');

    if (!userName || !userEmail || !message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Hay campos vacios"
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "verifica el corrreo"
      });
      return;
    }
    emailjs.sendForm('service_it3dd3r', 'template_fk6r9ps', form.current, 'J1v_hoFG2HX08mGPL')
       .then((result) => {
        if (result) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Mensaje enviado con exito"
          });
        }
       }, (error) => {
        console.log(error.text);
    });

  };


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
          <p> Hola <img style={{width: "45px"}} src='/manito.gif'/> un gusto tenerte por aca, 
           si que soy una excelente opcion para tu equipo. No dudes en dejarme
           tu feedback, es de mucha ayuda para mi.</p>
       <div className={styles.contac}>

           <button className={styles.btn}>
              <span className={styles.text}>Contactame!</span>
          </button>   
            <a href="https://www.linkedin.com/in/emerson-montes-422037262/" target='blank'>
              <img style={{width: "4em"}} src='/linkedinR.png'/>
            </a>
       </div>
      </section>
        
      <section  className={styles.about}>
          <img src="/tl3.png" alt="" /> 
        <div>
          <h3>Perfil: </h3>
          <p>Soy Emerson Montes, desarrollador Full Stack, con muchas ganas de enriquecer mi carrera profesional. 
          <br/>
          <br/>
          Eficiente, comprometido y con excelentes habilidades blandas.😎 
          </p>
         <a href="../public/Cv Emerson-w.pdf" download='Cv-EmersonMontes'>
         <button className={styles.btn}>
                 <img src="/download.png" style={{width: "1.5em"}} />
              <span className={styles.text}>
                  Download Cv</span>
          </button>
         </a>
        </div>
      </section>

      <section className={styles.skill}>
        <h2> Skill: </h2>
        <p>¡Cada dia es una oportunidad para seguir aprendiendo!</p>
        <div className={styles.imgs}>
        <img  className={styles.skills} src="/html.png" alt="" />
        <img  className={styles.skills} src="/css.png" alt="" />
        <img  className={styles.skills} src="/js.png" alt="" />
        <img  className={styles.skills} src="/react.png" alt="" />
        <img  className={styles.skills} src="/redux.png" alt="" />
        <img  className={styles.skills} src="/_express.png" alt="" />
        <img  className={styles.skills} src="/_next.png" alt="" />
        <img  className={styles.skills} src="/_node-js.png" alt="" />
        <img  className={styles.skills} src="/_postger.png" alt="" />
        <img  className={styles.skills} src="/vite.png" alt="" />
        </div>
      </section>

      <section>
        <h2>🚀Projectos🚀</h2>
        <p>... y seguimos aprendiendo.</p>
        <div className={styles.proyects}>
        <div className={styles.container}>
          <div className={styles.box}>
              <img  src="/RickG.gif" />
              <div className={styles.proyectsDetail}>
                  <strong> Rick and Morty </strong> 
                  <strong> Desarrolado con React, Redux, Node.js, Express, Postgres.</strong>
                  <a href="https://github.com/EmerMontes/Integrador.git " target='blank'>
                  <button>Ver codigo</button> 
                  </a>
              </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.box}>
          <img  src="/countryG.gif" />
              <div className={styles.proyectsDetail}>
                  <strong> Countries </strong> 
                  <strong> Desarrolado con React, Redux-toolkit, Node.js, Express, Postgres.</strong>
                  <div>
                  <a href="https://github.com/EmerMontes/SPA-Coutries " target='blank'>
                  <button>Ver codigo</button> 
                  </a>
                  <a href="https://countryspa.vercel.app " target='blank'>
                  <button>Web site</button> 
                  </a>
                 </div>
              </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.box}>
          <img  src="/etniaG.gif" />
              <div className={styles.proyectsDetail}>
                  <strong> Etnia Brand </strong> 
                  <strong> Proyecto realizado con un gran equipo para una marca de ropa.</strong>
                  <div>
                    <a href="https://github.com/SantiagoQuirogaMolina/Etnia-Nuevo-Dashb" target='blank'>
                    <button>Ver codigo</button> 
                    </a>
                    <a href="https://etnia.vercel.app " target='blank'>
                    <button>Web site</button> 
                    </a>
                  </div>
              </div>
          </div>
        </div>
        </div>   
      </section>

      <section>
        <h2>Contactame!</h2>
        <p>Iniciemos una conversacion</p>
        <form ref={form} onSubmit={sendEmail} className={styles.formu}>
          <div className={styles.formcontainer}>
            <div className={styles.form}>     
              <input placeholder="Nombre" type="text" name="user_name" className={styles.input}/>
              <input placeholder="Email" id="mail"  name="user_email" type="email" className={styles.input}/>
              <textarea  placeholder="Tu mensaje" rows="5" cols="10"  name="message" className={styles.textarea}/>
              <button className={styles.sendbutton}>Enviar</button>
            </div>
         </div>
        </form>   
      </section>

      <footer>
        <p>Porftfolio web 2023 © - 
         Emerson Montes</p>
      </footer>

    </div>
  )
}

export default App
