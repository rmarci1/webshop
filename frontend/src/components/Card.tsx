import { FiShoppingCart } from "react-icons/fi";
import { useGlobalContext } from "../context/GlobalProvider";
import { FaRegTrashAlt } from "react-icons/fa";
interface Item{
    id: number;
    name?: string;
    title?: string;
    category?: string;
    author?: string;
    genre?: string;
    size?: string;
    color?: string;
    material?: string;
    weight_kg?: number;
    price: number;
    stock: number;
    publication_year?: number;
}


export default function Cards({element,show,cartDelete} : {element: Item, show? : boolean, cartDelete? : boolean}){
    const {cart,setCart} = useGlobalContext();

    const navigation = (product : Item) => {
        const updatedCart = [...cart,product]
        setCart(updatedCart);
    }
    const handleDelete = (product : Item) => {
        setCart(cart.filter((current) => current != product))
    }
    const list = (element : Item,target: string) => {
        if (target in element) {
          return element[target as keyof Item];
        }
        return null;
      }
    return (<div className="col-lg-2 col-md-3 col-6 col-sm-4 mb-3" key={element.id}>
        <div className={`card h-100 card-hover ${list(element, "stock") === 0 ? "out-of-stock" : ""}`}>
          <img
            className="card-img"
            src={`images/${list(element, "title") || list(element, "name")}.jpg`}
            alt={`${list(element, "title") || list(element, "name")}`}
            style={{
              maxHeight: 320,
              objectFit:"cover",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{list(element, "title") || list(element, "name")} <span className="text-secondary">{list(element, "price")}$</span></h5>
            {list(element, "author") && (
              <div className="card-text">
                <strong>Author:</strong> {list(element, "author")}
              </div>
            )}
            {list(element, "category") && (
              <div className="card-text">
                <strong>Category:</strong> {list(element, "category")}
              </div>
            )}
            {list(element, "genre") && (
              <div className="card-text">
                <strong>Genre:</strong> {list(element, "genre")}
              </div>
            )}
            {list(element, "size") && (
              <div className="card-text">
                <strong>Size:</strong> {list(element, "size")}
              </div>
            )}
            {list(element, "color") && (
              <div className="card-text">
                <strong>Color:</strong> {list(element, "color")}
              </div>
            )}
            {list(element, "material") && (
              <div className="card-text">
                <strong>Material:</strong> {list(element, "material")}
              </div>
            )}
            {list(element, "weight_kg") && (
              <div className="card-text">
                <strong>Weight:</strong> {list(element, "weight_kg")} kg
              </div>
            )}
            {list(element, "publication_year") && (
              <div className="card-text">
                <strong>Publication Year:</strong> {list(element, "publication_year")}
              </div>
            )}
            <div className="card-text">
              <strong>Stock:</strong> {list(element, "stock")}
            </div>
            { show && (
              <div className="card-text">
                <button className="btn btn-primary" onClick={() => navigation(element)}>Cart<FiShoppingCart /></button>
              </div>
            )}
            { cartDelete && (
                <div className="card-text">
                    <button className="btn btn-primary" onClick={() => handleDelete(element)}>Delete<FaRegTrashAlt /></button>
                </div>
            )}
          </div>
        </div>
      </div>)
}