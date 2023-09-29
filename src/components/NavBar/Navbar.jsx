import clasess from './NavBar.module.css'
import NavImg from './assets/logo3.svg'
import CartWidget from '../CartWidget/CardWidget'
import { useNavigate } from 'react-router-dom'


const NavBar =() =>{
    const navigate = useNavigate()
    
    const handleNavLinkClick = (category) => {
    navigate(`/category/${category}`);
    changeDocumentTitle(category);
    };
    
    const changeDocumentTitle = (category) => {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    document.title = `Athena Tienda Online - ${capitalizedCategory}`;
      };
      
      const handleHomeClick = () => {
        navigate(`/`);
        restoreDocumentTitle();
      };
    
      const restoreDocumentTitle = () => {
        document.title = 'Athena Tienda Online - Inicio';
      };
    
    return(
        <div className={clasess.user}>
        <header>
            <img onClick={handleHomeClick} src={NavImg} width="70px"/>
        <nav>
            <a onClick={()=>handleNavLinkClick(`teclados`)}>TECLADOS</a>
            <a onClick={()=>handleNavLinkClick(`mouses`)}>MOUSES</a>
            <a onClick={()=>handleNavLinkClick(`auriculares`)}>AURICULARES</a>
            <a onClick={()=>handleNavLinkClick(`mousepad`)}>MOUSEPAD</a>
        </nav>
    </header>
        <div className={clasess.cart}>
            <CartWidget/>
        </div>
    </div>
    )
}

export default NavBar