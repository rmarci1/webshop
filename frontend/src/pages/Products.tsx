import { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { useGlobalContext } from "../context/GlobalProvider";
import { CgProfile } from "react-icons/cg";
import './style.css'
import { useNavigate } from "react-router-dom";
import Cards from "../components/Card";
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

function Products() {
  const [initiate,setInitiate] = useState(false);
  const [products,setProducts] = useState<Item[]>([]);
  const [currentProducts,setCurrentProducts] = useState("Books");
  const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);
  const [errorServer,setErrorServer] = useState("");
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const {show,user,isLoading,cart,setCart} = useGlobalContext();
  const productsList = ["Books","Clothes","Equipment"];

  useEffect(() => {
    console.log(cart);
  }, [cart])
  
  useEffect(() => {
        fetch(`http://localhost:3000/${currentProducts.toLocaleLowerCase()}`)
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    //throw new Error('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                console.log(error.message) 
                setError(error.message);
            })
  }, [currentProducts])
  
  const handleItemClick = (setItem : string) => {
    console.log(setItem);
    setCurrentProducts(setItem);
  }
  if(errorServer){
    return <p>{errorServer}</p>
  }
  if(loading) { 
    return <p>Loading...</p>
  }
  if(isLoading) { 
    return <p>Loading..</p>
  }
  if(error){
    return <p>Error happened: {error}.</p>
  }
  if(!user && !initiate){
    setInitiate(true);
    setCart([]);
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLocaleLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) =>
        product.name?.toLowerCase().includes(term) ||
        product.author?.toLowerCase().includes(term) ||
        product.color?.toLowerCase().includes(term) ||
        product.genre?.toLowerCase().includes(term) ||
        product.material?.toLowerCase().includes(term) ||
        product.price.toString().includes(term) ||
        product.publication_year?.toString().includes(term) ||
        product.size?.toLowerCase().includes(term) ||
        product.title?.toLowerCase().includes(term) ||
        product.weight_kg?.toString().includes(term) 
  );
    setFilteredProducts(filtered);
  }

  return (
    <div className="font">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto" style={{alignItems:'center'}}>

      <a className="navbar-brand" href="/" style={{marginLeft: 10}}>Home</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/products">Products</a>
          </li>
          <li>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {currentProducts}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {productsList.filter((current) => current!=currentProducts).map((product) =>(
                <Dropdown.Item onClick={() => handleItemClick(product)}>{product}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          </li>
        </ul>
      </div>
      {!show ? (
        <div className="validation">
          <a className="btn btn-primary" href="/register" role="button" style={{marginRight: 10}}>Register</a>
          <a className="btn btn-primary" href="/login" role="button" style={{marginRight: 10}}>Login</a>
        </div>
      ) : (
        <div className="text-white link" style={{marginRight:10, display:"inline-flex"}}>
          <h5 style={{margin:0,color:"#60a5fa"}}>{user}</h5> 
          <a href="/profile" style={{marginLeft:10}}><CgProfile size={26}/></a>
          <div style={{marginRight:100}}></div>
          <a href="/cart" className=""><FiShoppingCart size={24} style={{marginRight:12}} /></a>
          {
            cart.length != 0 && <strong className="cart_counter" style={{marginRight: 10}}>{cart.length}</strong>
          }
        </div>
      )}
      </nav>
          <div className='mb-2 d-flex justify-content-center mt-2'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    width : "60vw",
                    fontFamily: "monospace"
                }}
                 placeholder="Search for something..."
            />
          </div>
      <div className="row">
  {filteredProducts.map((element) => (
    <Cards
      element = {element}
      show = {show}
    />
  ))}
</div>

    </div>
  )
}

export default Products