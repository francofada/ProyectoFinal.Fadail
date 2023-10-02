import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import clasess from './Cart.module.css'
import { useState, useEffect } from "react"
import Swal from "sweetalert2"

const Cart = ()=>{

const {cart,removeItem,total} = useCart()
const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);

useEffect(() => {
  document.title = "Athena Tienda Online - Cart";
  return () => {
    document.title = "Athena Tienda Online";
  };
}, []); 

const handleCouponChange = (e) => {
setCouponCode(e.target.value);
};

// Función para aplicar el cupón
const applyCoupon = () => {
if (couponCode === "ATHENAONLINE") {
setDiscount(0.1);
setCouponCode("");
} else {
    Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Cupón no válido',
      })
}
};

const subtotal = total;
const discountAmount = total * discount;
const discountedTotal = total - discountAmount;


return(
    <div className={clasess.tittle}>  
            <h1>CARRITO DE COMPRA</h1>
            <div className={clasess.carts}>
            <section>
                {
                cart.map(prod=>{
                    return(
            <div key={prod.id} >
                <div className={clasess.boxIzquierdo}>
                    <div className={clasess.box}>
                    <h2 className={clasess.title}>{prod.id}</h2>
            
                        <div className={clasess.content}>
                            <p>  </p>
                            <p>Price x Unidad: ${prod.price}</p>
                            <p>Cantidad: {prod.quantity}</p>
                            <p className={clasess.btnArea}>
                            <span onClick={()=> removeItem(prod.id)} className={clasess.btn}>REMOVE</span>  
                            </p>
                        </div>
                    </div>
                </div>
            </div>
                )
            })
        }
        </section>
            <div className={clasess.ladoDerecho}>
                 <p>
            <span>Subtotal</span> ${subtotal.toFixed(2)}
          </p>
          <hr />
          <div>
            <input
              type="text"
              placeholder="Ingresa tu cupón"
              value={couponCode}
              onChange={handleCouponChange}
            />
            <button onClick={applyCoupon}>APLICAR CUPÓN</button>
            <p>DESCUENTO ${discountAmount.toFixed(2)}</p>
          </div>
          {discountAmount > 0 }
        <p>Total: ${discountedTotal.toFixed(2)}</p>
          <hr />
          {cart.length === 0 ? (
            <button className={clasess.checkout} disabled>
              CHECKOUT
            </button>
          ) : (
            <Link to="/checkout" className={clasess.checkout}>
              CHECKOUT
            </Link>
          )}
            </div>
        </div>
    </div>
    )
}

export default Cart