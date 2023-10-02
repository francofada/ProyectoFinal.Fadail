import { useCart } from "../../Context/cartContext"
import clasess from './Checkout.module.css'
import { collection, query, where, documentId,getDocs, writeBatch, addDoc } from 'firebase/firestore'
import { db } from "../../Service/Firebase"
import { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useNotification } from '../../Notification/NotificationService';



const Checkout = ()=>{
    const [loading, setLoading] = useState(false)
    const { cart, total, clearCart } = useCart()
    const navigate = useNavigate()
    const {setNotification} = useNotification()
    
    useEffect(() => {
      document.title = "Athena Tienda Online - Checkout";
      return () => {
        document.title = "Athena Tienda Online";
      };
    }, []); 
   const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
      });
      const [formErrors, setFormErrors] = useState({
        name: '',
        phone: '',
        email: '',
      });
      
      const validateName = (name) => {
        if (name.length < 3) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            name: 'El nombre debe tener al menos 3 letras.',
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            name: '', // Borra el mensaje de error si es válido
          }));
        }
      };
      
      const validatePhone = (phone) => {
        const phonePattern = /^\d{5,}$/; // Al menos 5 dígitos
        if (!phonePattern.test(phone)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            phone: 'El teléfono debe tener al menos 5 números.',
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            phone: '', // Borra el mensaje de error si es válido
          }));
        }
      };
      
      const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verificar formato de email
        if (!emailPattern.test(email)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: 'El correo electrónico debe tener un formato válido(. @).',
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: '', // Borra el mensaje de error si es válido
          }));
        }
      };
      
      


    const createOrder = async () => {
        try {

            setLoading(true)

            const objOrder = {
                buyer: {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                    },
                items: cart,
                total
            }
            
            const batch = writeBatch(db)
            const outOfStock = []
    
            const ids = cart.map((prod) => prod.id)
      
    
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const { docs } = await getDocs(productsRef)
    
            docs.forEach(doc => {
                  const fields = doc.data()
                  const stockDb = fields.stock
      
                  const productAddedToCart = cart.find(prod => prod.id === doc.id)
                  const prodQuantity = productAddedToCart?.quantity
      
                        if(stockDb >= prodQuantity) {
                            batch.update(doc.ref, { stock: stockDb - prodQuantity })
                        } else {
                            outOfStock.push({ id: doc.id, ...fields })
                        }
          })
    
            if(outOfStock.length === 0) {
              const orderRef = collection(db, 'orders')
    
              const { id: orderId } = await addDoc(orderRef, objOrder)
                
              batch.commit()
              clearCart()
              navigate('/')
                setNotification('el numero de orden es: ' + orderId)
            } else {
                console.error('Hay productos fuera de stock...')
            }
        } catch (error) {
            console.log('Ocurrio un error al obtener datos: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

        if(loading) {
            return <div className={clasess.loaders}><span className={clasess.loader}></span></div>
        }




        return(
            <div className={clasess.titulos}>
                <h1>CHECKOUT</h1>
                <h2>Información para completar tu compra</h2>
                    <div className={clasess.parrafos}>
                        <p>En <strong>ATHENA ONLINE</strong>, estamos comprometidos en brindarte la mejor experiencia de compra posible. Para asegurarnos de que tu pedido sea entregado de manera eficiente y segura, necesitamos recopilar algunos datos importantes. Ten la seguridad de que tus datos se manejarán con la máxima confidencialidad y solo se utilizarán para los fines relacionados con tu compra.</p>
                        <p>A continuación, te pedimos que proporciones la siguiente información:</p>
                        <br />
                        <ol>
                        <li><strong>Dirección de Envío:</strong> Necesitamos tu dirección completa para enviar tu pedido de manera adecuada. Asegúrate de que la información sea precisa para evitar demoras en la entrega.</li>
                        <br />
                        <li><strong>Información de Contacto:</strong> Tu número de teléfono y dirección de correo electrónico nos permitirán comunicarnos contigo en caso de preguntas o problemas relacionados con tu pedido.</li>
                        <br />
                        <li><strong>Método de Pago:</strong> Selecciona el método de pago que prefieras para completar la transacción. Tus datos de pago se procesarán de manera segura. Después de confirmar tu pedido, recibirás un correo electrónico con un enlace de pago seguro. Simplemente sigue el enlace para completar tu transacción.</li>
                        <br />
                        <li><strong>Notificaciones:</strong> Si deseas recibir actualizaciones y ofertas exclusivas, marca la casilla para suscribirte a nuestras notificaciones por correo electrónico. Puedes cancelar la suscripción en cualquier momento.</li>
                        </ol>
                        <br />
                        <p>Tus datos personales son importantes para nosotros y nos ayudarán a brindarte un servicio excepcional.</p>
                        <br />
                    </div>
                <h1>formulario</h1>
                <form className={clasess.forms}>
                        <div>
                          <label htmlFor="name"><span>Nombre:</span></label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              validateName(e.target.value);
                            }}
                          />
                          {formErrors.name && <p className={clasess.error}>{formErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone"><span>Teléfono:</span></label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              validatePhone (e.target.value);
                            }}
                          />
                          {formErrors.phone && <p className={clasess.error}>{formErrors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="email"><span>Correo electrónico:</span></label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              validateEmail  (e.target.value);
                            }}
                          />
                          {formErrors.email && <p className={clasess.error}>{formErrors.email}</p>}
                        </div>
                        <button onClick={createOrder}>GENERAR ORDEN</button>
                  </form> 

            </div>
        )
    
        }

export default Checkout