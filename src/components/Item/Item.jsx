import clasess from './Item.module.css'
import { useNavigate } from 'react-router-dom'


const Item = ({id,name,img,brand,price}) =>{
    const navigate = useNavigate()
    
    return(
    <div className={clasess.cardcontainer}>
      <h1>{brand}</h1>
            <div className={clasess.cardleft}>
                <div className={clasess.cardup}>
                <h3>Precio</h3>
                <h3><span>$ {price},-</span></h3>

                </div>
                <div className={clasess.carddown}>
                <h2>{name}</h2>
                    <div className={clasess.carddowndetail}>
                    <a onClick={() => navigate(`/detail/${id}`)}>-</a>
                    <h4 onClick={() => navigate(`/detail/${id}`)}>DETALLES</h4>
                    </div>
                </div>


            </div>

            <div className={clasess.cardimagecontainer}>
                <img src={img} className={clasess.cardimage}/>
            </div>

    </div>
    )
}

export default Item