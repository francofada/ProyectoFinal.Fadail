import clasess from './ItemDetail.module.css'
import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/cartContext';
import { useNotification } from '../../Notification/NotificationService';
import { Link } from 'react-router-dom';

const ItemDetail = ({ name, img, category, description, price, stock}) => {

  const [quantity, setQuantity] = useState(0)
  const {addItem} = useCart()
  const {setNotification} = useNotification()

  const handleOnAdd = (quantity)=>{
          const objToAdd ={
            id: name,
            name,
            price,
            quantity,
          }
          addItem(objToAdd)
          setNotification(`Se agrego ${quantity} ${category} ${name}  al carrito`)
          setQuantity(quantity)
          }


    return (
      <div className={clasess.card}>
        <img src={img} alt={name} />
        <div className={clasess.card_name}>
          <h2>{name}</h2>
          {description && (
            <>
              <p><span>Marca:</span> {description.Brand}</p>
              {category === 'teclados' && (
                <>
                  <p><span>Idioma:</span> {description.Language}</p>
                  <p><span>Tipo:</span> {description.Type}</p>
                  <p><span>Iluminación:</span> {description.Lightning}</p>
                </>
              )}
              {category === 'auriculares' && (
                <>
                  <p><span>Conectividad:</span> {description.Connectivity}</p>
                  <p><span>Frecuencia:</span> {description.Frequency}</p>
                </>
              )}
              {category === 'mouses' && (
                <>
                  <p><span>Conectividad:</span> {description.Connectivity}</p>
                  <p><span>Peso:</span> {description.weight}</p>
                  <p><span>RGB:</span> {description.RGB}</p>
                </>
              )}
              {category === 'mousepad' && (
                <>
                  <p><span>Ancho:</span> {description.width}</p>
                  <p><span>Longitud:</span> {description.Length}</p>
                  <p><span>Grosor:</span> {description.Bulk}</p>
                </>
              )}
              <p><span>Color:</span> {description.Color}</p>
            </>
          )}
          <h4>PRECIO <span>${price}</span></h4>

        <div className={clasess.button}>
        {
          quantity === 0 ? (
            <ItemCount onAdd={handleOnAdd} stock={stock}/>
          ) :
          <div>
          <Link className={clasess.link} to='/cart'>FINALIZAR COMPRA</Link>
          <Link className={clasess.link2} to='/'>SEGUIR COMPRANDO</Link>
          </div>
        }
        </div>
        </div>
      </div>
    );
  };
  
  export default ItemDetail;