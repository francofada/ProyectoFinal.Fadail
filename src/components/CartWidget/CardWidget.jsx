import clasess from './CardWidget.module.css'
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const CartWidget = () =>{
    const {totalQuantity} = useCart()
    const navigate = useNavigate()
    return(
        <div className={clasess.carro}>
            <a onClick={()=>navigate('/cart')}><FaCartArrowDown/></a> 
            <h3>{totalQuantity}</h3>
        </div>
    )
}

export default CartWidget