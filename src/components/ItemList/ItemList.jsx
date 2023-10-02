import Item from "../Item/Item"
import classes from './ItemList.module.css'

const ItemList = ({ products }) => {
    return (
        <div className={classes.menu}>
            {products.map(product => {
                return (
                    <Item key={product.id} {...product}/>
                )
            })}
        </div>
    )
}

export default ItemList