import logo from "./assets/logo-2.svg"
import classes from "./Footer.module.css"
import { BsFacebook,BsInstagram,BsGithub } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
const Footer = ()=>{

    const returnNavigate = useNavigate()

    
    const handleHomeClick = () => {
        returnNavigate(`/`);
        restoreDocumentTitle();
      };
    
      const restoreDocumentTitle = () => {
        document.title = 'Athena Tienda Online - Inicio';
      };

    return(
        <>
        <footer className={classes.pie}>
        <div className={classes.grupo_arriba}>
        <div className={classes.box}>
                <img onClick={handleHomeClick} src={logo}/>
        </div>
        <div className={classes.box}>
           <h2>SOBRE NOSOTROS</h2>
           <p>En Athena Online, estamos comprometidos con proporcionarte la mejor experiencia de compra en línea de insumos para PC. Nuestra pasión por la tecnología y los videojuegos nos impulsa a ofrecer productos excepcionales que mejoren tu experiencia informática.</p>
        </div>
        <div className={classes.box}>
            <h2>SIGUENOS</h2>
            <div className={classes.redes}>
                <a href="https://www.facebook.com/"><BsFacebook/></a>
                <a href="https://www.instagram.com/"><BsInstagram/></a>
                <a href="https://www.github.com/"><BsGithub/></a>
            </div>
        </div>
        </div>
        <div className={classes.grupo_abajo}>
        <small>&copy; 2023 <b>Athenea Online</b>- Todos los Derechos Reservados</small>
        </div>
        </footer>
        </>
    )
}

export default Footer