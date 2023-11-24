import { useState, useRef } from 'react'
import  styles from './app.module.css'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import {Link} from 'react-scroll'


function App() {
  
  const form = useRef();
  const [isDarkMode , setIsDarkMode] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled , setScrolled] = useState(false)
  
  const changeMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const showToast = (icon, title) => {
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
      icon: icon,
      title: title
    });
  };
  
  const sendEmail = (event) => {
    
    event.preventDefault();
    const formData = new FormData(form.current);
    const userName = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const message = formData.get('message');

    if (!userName || !userEmail || !message) {
      showToast( "error","Hay campos vacios")
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        showToast( "warning","verifica el corrreo")
      return;
    }
    emailjs.sendForm('service_it3dd3r', 'template_fk6r9ps', form.current, 'J1v_hoFG2HX08mGPL')
       .then((result) => {
        if (result) {
          showToast("success","Mensaje enviado con exito")
          form.current.reset()
        }
       }, (error) => {
        showToast("error",`algo salio mal: ${error}`)
    });
  };

  const abrirMenu = () => {
    setMenuVisible(true);
  }

  const cerrarMenu = () => {
    setMenuVisible(false);
  }

  const handleOverlayClick = () => {
    if (menuVisible) {
      cerrarMenu();
    }
  };

  window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
    if (scrollY > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  });
  const descarga = ()=>{
    showToast("success","Cv descargado")
  }

  return (

    <div className= {isDarkMode ? styles.contentLigth : styles.contentDak}>
      {console.log(isDarkMode)}
      <section className={ !scrolled ? styles.section : styles.sectionScroll}>
        <div >
          <img src='/head1.png' alt="icono" /> 
         <p>EmerM</p> 
        </div>
        <div>

       <label className={styles.switch}>
         <input onChange={changeMode} type="checkbox"/>
         <span className={styles.slider}></span>
       </label>

       <header>
       <button onClick={abrirMenu} className={styles.abrirMenu}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
          <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path></svg>
       </button>
       <nav id='nav' className={`${styles.nav} ${menuVisible ? styles.visible : ''}`}>
          <button onClick={cerrarMenu} className={styles.cerrarMenu}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
           <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path></svg> 
          </button>
            <ul className={styles.navList}>
              <li><Link spy={true} smooth={true} offset={-80} duration={600} onClick={cerrarMenu} to="perfil"> <p> Perfil</p></Link></li>
              <li><Link spy={true} smooth={true} offset={-80} duration={600} onClick={cerrarMenu} to="skill"><p>Skill</p></Link></li>
              <li><Link spy={true} smooth={true} offset={-80} duration={600} onClick={cerrarMenu} to="proyectos"><p>Proyectos</p></Link></li>
              <li><Link spy={true} smooth={true} offset={-80} duration={600} onClick={cerrarMenu} to="contactame"><p>Contáctame</p></Link></li>
            </ul>
        </nav>
    </header>
      <div
        className={`${styles.overlay} ${menuVisible ? styles.overlayVisible : ''}`}
        onClick={handleOverlayClick}
      />
        </div>
      </section>

      <section  className={styles.head}>
          <h1><span> Full Stack <br/>Developer</span></h1>
          <p> Hola <img style={{width: "45px"}} src='/manito.gif'/> un gusto tenerte por acá, 
           sí que soy una excelente opción para tu equipo. No dudes en dejarme
           tu feedback, es de mucha ayuda para mí.</p>

       <div className={styles.contac}>

            <Link spy={true} 
             smooth={true} 
             offset={500}  duration={600}  to="contactame">
              <button className={styles.btn}>
               <span className={styles.text}>Contáctame!</span>
              </button>   
            </Link>

            <a href="https://www.linkedin.com/in/emerson-montes-422037262/" target='blank'>
              <img style={{width: "4em"}} src='/linkedinR.png'/>
            </a>

       </div>

      </section>
        
      <section id='perfil'  className={styles.about}>
          <img src="/tl3.png" alt="" /> 
        <div>
          <h3>Perfil: </h3>
          <p>Soy Emerson Montes, desarrollador Full Stack, con muchas ganas de enriquecer mi carrera profesional. 
          <br/>
          <br/>
          Eficiente, comprometido y con excelentes habilidades blandas.😎 
          </p>
         <a href="/Cv-Emerson-w.pdf" download='Cv-Emerson-w.pdf'>
         <button onClick={descarga} className={styles.btn}>
                 <img src="/download.png" style={{width: "1.5em"}} />
              <span className={styles.text}>
                  Descargar Cv</span>
          </button>
         </a>
        </div>
      </section>

      <section  id='skill' className={styles.skill}>
        <h2> ⚔️Skills⚔️ </h2>
        <p>¡Cada día es una oportunidad para seguir aprendiendo!</p>
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

      <section id='proyectos'>
        <h2>🚀Proyectos🚀</h2>
        <p> ...y seguimos aprendiendo.</p>
        <div className={styles.proyects}>
        <div className={styles.container}>
          <div className={styles.box}>
              <img  src="/RickG.gif" />
              <div className={styles.proyectsDetail}>
                  <strong> Rick and Morty </strong> 
                  <strong> Desarrollado con React, Redux, Node.js, Express, Postgres.</strong>
                  <a href="https://github.com/EmerMontes/Integrador.git " target='blank'>
                  <button>Ver código</button> 
                  </a>
              </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.box}>
          <img  src="/countryG.gif" />
              <div className={styles.proyectsDetail}>
                  <strong> Countries </strong> 
                  <strong> Desarrollado con React, Redux-toolkit, Node.js, Express, Postgres.</strong>
                  <div>
                  <a href="https://github.com/EmerMontes/SPA-Coutries " target='blank'>
                  <button>Ver código</button> 
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
                    <button>Ver código</button> 
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

      <section id='contactame'>
        <h2>Contáctame!</h2>
        <p>Iniciemos una conversación</p>
        <div className={styles.formu}>
          <form ref={form} onSubmit={sendEmail} className={styles.formcontainer}>
            <div className={styles.form}>     
              <input placeholder="Nombre" type="text" name="user_name" className={styles.input}/>
              <input placeholder="Email" id="mail"  name="user_email" type="email" className={styles.input}/>
              <textarea  placeholder="Tu mensaje" rows="5" cols="10"  name="message" className={styles.textarea}/>
              <button className={styles.sendbutton}>Enviar</button>
            </div>
         </form>
        <ul>
        <li>
          <a href="https://wa.link/670vc1">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
          </svg>
          </a>
        </li>
        
        <li>
         <a href="https://www.linkedin.com/in/emerson-montes-422037262/">
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
         <path fill="#ee3e54" d="M13 27A2 2 0 1 0 13 31A2 2 0 1 0 13 27Z"></path><path fill="#f1bc19" d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"></path><path fill="#fce0a2" d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"></path><path fill="#f1bc19" d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"></path><path fill="#ee3e54" d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"></path><path fill="#fbcd59" d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"></path><path fill="#ee3e54" d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"></path><path fill="#fff" d="M18.5 51A2.5 2.5 0 1 0 18.5 56A2.5 2.5 0 1 0 18.5 51Z"></path><path fill="#f1bc19" d="M21 66A1 1 0 1 0 21 68A1 1 0 1 0 21 66Z"></path><path fill="#fff" d="M80 33A1 1 0 1 0 80 35A1 1 0 1 0 80 33Z"></path><g><path fill="#127ad8" d="M35,72.3c-4,0-7.3-3.3-7.3-7.3V35c0-4,3.3-7.3,7.3-7.3h30c4,0,7.3,3.3,7.3,7.3v30c0,4-3.3,7.3-7.3,7.3H35z"></path><path fill="#472b29" d="M65,28.4c3.6,0,6.6,3,6.6,6.6v30c0,3.6-3,6.6-6.6,6.6H35c-3.6,0-6.6-3-6.6-6.6V35c0-3.6,3-6.6,6.6-6.6H65 M65,27H35c-4.4,0-8,3.6-8,8v30c0,4.4,3.6,8,8,8h30c4.4,0,8-3.6,8-8V35C73,30.6,69.4,27,65,27L65,27z"></path></g><g><path fill="#fdfcee" d="M63.6,68.5H36.5c-2.7,0-4.8-2.2-4.8-4.8V36.3c0-2.7,2.2-4.8,4.8-4.8h27.1c2.7,0,4.8,2.2,4.8,4.8v27.3 C68.4,66.3,66.3,68.5,63.6,68.5z"></path></g><g><path fill="#472b29" d="M68.5,47.4c-0.3,0-0.5-0.2-0.5-0.5V43c0-0.3,0.2-0.5,0.5-0.5S69,42.7,69,43v3.9C69,47.2,68.8,47.4,68.5,47.4z"></path></g><g><path fill="#472b29" d="M68.5,40.5c-0.3,0-0.5-0.2-0.5-0.5v-2c0-0.3,0.2-0.5,0.5-0.5S69,37.7,69,38v2C69,40.3,68.8,40.5,68.5,40.5z"></path></g><g><path fill="#472b29" d="M64,69H36c-2.8,0-5-2.2-5-5V36c0-2.8,2.2-5,5-5h25.4c0.3,0,0.5,0.2,0.5,0.5S61.7,32,61.4,32H36 c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4V49.6c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5V64C69,66.8,66.8,69,64,69z"></path></g><g><path fill="#127ad8" d="M60.5,51.6v6.9h-4.1l-0.1-6.9c0-1.7-0.8-3-2.4-3c-1.2,0-1.9,0.8-2.2,1.6c-0.1,0.3-0.1,0.7-0.1,1v7.2h-4.2 c0,0,0.1-11.7,0-12.9h4.2v2c0,0,0,0,0,0h0v0c0.6-1,1.6-2.1,3.9-2.1C58.4,45.5,60.5,47.3,60.5,51.6z"></path><path fill="#472b29" d="M60.5,59h-4.1c-0.3,0-0.5-0.2-0.5-0.5l-0.1-6.9c0-0.7-0.2-2.5-1.9-2.5c-1.1,0-1.6,0.9-1.8,1.3 c0,0.1-0.1,0.4-0.1,0.9v7.2c0,0.3-0.2,0.5-0.5,0.5h-4.2c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.1,0.1-11.7,0-12.9 c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.4-0.2h4.2c0.3,0,0.5,0.2,0.5,0.5v0.6c0.9-0.8,2-1.2,3.4-1.2c1.6,0,2.8,0.5,3.8,1.4 c1.1,1.1,1.7,2.9,1.7,5.2v6.9C61,58.8,60.8,59,60.5,59z M56.9,58H60v-6.4c0-2-0.5-3.5-1.4-4.5c-0.7-0.7-1.8-1.1-3-1.1 c-2.1,0-3,1-3.5,1.8c-0.2,0.4-0.7,0.4-0.9,0.1c-0.1-0.1-0.1-0.3,0-0.4v-1.4h-3.2c0,2.2,0,9.9,0,11.9h3.2v-6.7 c0-0.5,0.1-0.9,0.2-1.2c0.5-1.2,1.5-1.9,2.7-1.9c1.8,0,2.9,1.3,2.9,3.5L56.9,58z"></path></g><g><path fill="#127ad8" d="M42.4,39.8c-1.2,0-2,0.8-2,2c0,1.1,0.8,2,2,2h0c1.3,0,2-0.9,2-2C44.4,40.6,43.6,39.8,42.4,39.8z"></path><path fill="#472b29" d="M42.4,44.2c-1.5,0-2.5-1-2.5-2.5s1.1-2.5,2.5-2.5c1.4,0,2.5,1,2.5,2.4C44.9,43.2,43.8,44.2,42.4,44.2z M42.4,40.3c-0.9,0-1.5,0.6-1.5,1.5c0,0.9,0.6,1.5,1.5,1.5c0.9,0,1.6-0.6,1.6-1.5C43.9,40.9,43.3,40.3,42.4,40.3z"></path></g><g><path fill="#127ad8" d="M40.4 45.6H44.6V58.5H40.4z"></path><path fill="#472b29" d="M44.6,59h-4.2c-0.3,0-0.5-0.2-0.5-0.5V45.6c0-0.3,0.2-0.5,0.5-0.5h4.2c0.3,0,0.5,0.2,0.5,0.5v12.9 C45.1,58.8,44.9,59,44.6,59z M40.9,58h3.2V46.1h-3.2V58z"></path></g>
         </svg>
         </a>
        </li>

        <li>
         <a href="https://github.com/EmerMontes">
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
         <circle cx="50" cy="50" r="30" fill="#4e6e91"></circle><path fill="#6693c1" d="M50,83c-18.196,0-33-14.804-33-33s14.804-33,33-33s33,14.804,33,33S68.196,83,50,83z M50,22 c-15.439,0-28,12.561-28,28s12.561,28,28,28s28-12.561,28-28S65.439,22,50,22z"></path><path fill="#eeecd9" d="M69.457,49.039c0-3.321-1.305-6.334-3.419-8.573c0.396-2.203,0.351-5.301-0.538-7.966 c-4.475,0-8.114,3.447-8.702,4H43.994c-0.589-0.552-4.019-4-8.494-4c-0.8,2.401-1.087,5.233-0.846,7.295 c-2.518,2.286-4.108,5.575-4.108,9.245c0,6.908,5.599,12.459,12.507,12.459H45.5c-2.003,0.917-3.635,2.756-4,5 c-2,0-4.864-0.182-6.181-2.158c-2.46-3.69-3.59-3.69-4.819-3.69c-1.23,0-1.33,1.23-0.1,2.46s1.23,1.23,2.46,3.69 C33.872,68.828,36.5,70.5,41.5,70.5v6.6c0,0,6.346,1.4,8.5,1.4s8.5-1.4,8.5-1.4l0-9.445c0-2.718-1.681-5.092-4-6.155h2.449 C63.858,61.5,69.457,55.947,69.457,49.039z"></path><path fill="#1f212b" d="M50,85c-19.299,0-35-15.701-35-35s15.701-35,35-35s35,15.701,35,35S69.299,85,50,85z M50,17 c-18.196,0-33,14.804-33,33s14.804,33,33,33s33-14.804,33-33S68.196,17,50,17z"></path><path fill="#1f212b" d="M50,79c-15.99,0-29-13.009-29-29s13.01-29,29-29s29,13.009,29,29c0,2.925-0.435,5.812-1.291,8.582 c-0.082,0.263-0.364,0.411-0.625,0.33c-0.264-0.082-0.412-0.361-0.33-0.625C77.581,55.612,78,52.825,78,50 c0-15.439-12.561-28-28-28S22,34.561,22,50s12.561,28,28,28c5.856,0,11.464-1.788,16.217-5.171c0.225-0.16,0.536-0.107,0.697,0.117 c0.16,0.225,0.107,0.537-0.117,0.697C61.873,77.147,56.065,79,50,79z"></path><path fill="#1f212b" d="M68.631,72.068c-0.14,0-0.279-0.059-0.378-0.173c-0.181-0.209-0.158-0.525,0.051-0.706 c0.739-0.638,1.452-1.324,2.122-2.037c0.188-0.202,0.505-0.21,0.706-0.023c0.201,0.189,0.212,0.505,0.023,0.707 c-0.693,0.739-1.433,1.449-2.197,2.11C68.863,72.028,68.747,72.068,68.631,72.068z"></path><path fill="#1f212b" d="M72.494,68.002c-0.107,0-0.216-0.035-0.308-0.105c-0.218-0.17-0.257-0.484-0.087-0.702 c1.649-2.118,2.982-4.452,3.963-6.938c0.101-0.258,0.392-0.382,0.648-0.282c0.257,0.102,0.383,0.392,0.281,0.648 c-1.015,2.575-2.396,4.993-4.104,7.186C72.79,67.936,72.643,68.002,72.494,68.002z"></path><path fill="#1f212b" d="M58.5,77.6c-0.276,0-0.5-0.224-0.5-0.5v-9.445c0-2.431-1.456-4.668-3.708-5.701 c-0.214-0.098-0.331-0.332-0.28-0.561C54.062,61.164,54.265,61,54.5,61h2.449c6.621,0,12.008-5.366,12.008-11.961 c0-3.064-1.166-5.987-3.282-8.229c-0.109-0.115-0.157-0.275-0.129-0.432c0.333-1.854,0.39-4.725-0.409-7.37 c-3.682,0.162-6.795,2.725-7.987,3.848C57.057,36.943,56.925,37,56.798,37H43.993c-0.127,0-0.249-0.048-0.342-0.135l-0.092-0.087 c-3.078-2.927-5.829-3.686-7.697-3.77c-0.662,2.162-0.941,4.762-0.712,6.729c0.019,0.16-0.042,0.319-0.161,0.428 c-2.506,2.275-3.943,5.51-3.943,8.875C31.046,55.635,36.433,61,43.053,61H45.5c0.235,0,0.438,0.164,0.488,0.394 c0.051,0.229-0.066,0.463-0.28,0.561c-1.974,0.904-3.397,2.676-3.715,4.625C41.954,66.822,41.745,67,41.5,67 c-2.333,0-5.191-0.271-6.598-2.38c-2.311-3.467-3.28-3.467-4.403-3.467c-0.14,0-0.385,0.023-0.448,0.178 c-0.086,0.206,0.031,0.756,0.702,1.428c1.287,1.287,1.311,1.335,2.554,3.82C34.409,68.785,37.319,70,41.5,70 c0.276,0,0.5,0.224,0.5,0.5v6.6c0,0.276-0.224,0.5-0.5,0.5S41,77.376,41,77.1v-6.105c-5.797-0.131-7.866-2.525-8.588-3.969 c-1.194-2.387-1.194-2.387-2.366-3.56c-0.869-0.869-1.213-1.81-0.919-2.518c0.209-0.505,0.709-0.795,1.372-0.795 c1.588,0,2.81,0.272,5.235,3.912c1.069,1.604,3.359,1.9,5.356,1.932c0.362-1.545,1.309-2.965,2.63-3.997h-0.668 c-7.172,0-13.007-5.813-13.007-12.959c0-3.562,1.485-6.988,4.084-9.442c-0.209-2.203,0.128-4.956,0.896-7.257 C35.094,32.138,35.285,32,35.5,32c2.036,0,5.192,0.696,8.692,4h12.409c1.427-1.311,4.847-4,8.898-4 c0.215,0,0.406,0.138,0.475,0.342c0.935,2.802,0.928,5.901,0.598,7.965c2.185,2.404,3.385,5.495,3.385,8.732 C69.957,56.186,64.122,62,56.949,62h-0.693C57.963,63.368,59,65.442,59,67.655V77.1C59,77.376,58.776,77.6,58.5,77.6z"></path><path fill="#1f212b" d="M34.238,45.97c-0.063,0-0.127-0.012-0.188-0.037c-0.256-0.104-0.379-0.396-0.274-0.651 c0.476-1.167,1.167-2.226,2.057-3.148c0.192-0.198,0.509-0.204,0.707-0.013c0.199,0.192,0.205,0.508,0.014,0.707 c-0.802,0.831-1.425,1.783-1.852,2.831C34.622,45.853,34.436,45.97,34.238,45.97z"></path><path fill="#1f212b" d="M33.66,51.021c-0.241,0-0.454-0.176-0.493-0.422c-0.08-0.51-0.121-1.034-0.121-1.558 c0-0.533,0.042-1.067,0.124-1.59c0.044-0.273,0.305-0.459,0.572-0.416c0.272,0.043,0.459,0.299,0.416,0.572 c-0.074,0.471-0.112,0.953-0.112,1.434c0,0.472,0.037,0.943,0.109,1.402c0.043,0.273-0.144,0.529-0.416,0.572 C33.713,51.019,33.687,51.021,33.66,51.021z"></path><path fill="#1f212b" d="M41.457,58.914c-0.028,0-0.057-0.002-0.085-0.007c-3.442-0.585-6.372-2.975-7.646-6.238 c-0.101-0.257,0.026-0.547,0.284-0.647c0.256-0.101,0.547,0.027,0.647,0.284c1.146,2.938,3.783,5.089,6.882,5.615 c0.271,0.046,0.455,0.305,0.409,0.577C41.907,58.741,41.696,58.914,41.457,58.914z"></path>
         </svg>
         </a>
        </li>
      </ul>

     </div>
    </section>

      <footer>
        <p>Portfolio web 2023 © - Emerson Montes</p>
      </footer>

    </div>
  )
}

export default App
