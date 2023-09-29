import clasess from './itemCount.module.css'
import { BiArrowToRight,BiArrowToLeft } from "react-icons/bi";
import { useState } from 'react';


const ItemCount = ({onAdd,stock,initial= 1}) =>{
    const [count,setCount] = useState(initial)
    const increment = ()=>{
         if(count < stock) 
         setCount(count + 1)
     }
  
    const decrement =()=>{
     if (count > 1) 
     setCount(count- 1)
    }
     return(
             <div className={clasess.count}>
                 <button onClick={decrement}><BiArrowToLeft/></button>
                 <h4>{count}</h4>
                 <button onClick={increment}><BiArrowToRight/></button>
                 <button  className={clasess.cart} onClick={() => onAdd(count)} >AGREGAR AL CARRITO</button>
                 <p>¡quedan {stock} unidades!</p>
             
             </div>
     )
  }

export default ItemCount