import { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { useGlobalContext } from "../context/GlobalProvider";
import { CgProfile } from "react-icons/cg";
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
  const [products,setProducts] = useState<Item[]>([]);
  const [currentProducts,setCurrentProducts] = useState("Books");
  const productsList = ["Books","Clothes","Equipment"];
  const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);
  const [errorServer,setErrorServer] = useState("");
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const {show,user,isLoading} = useGlobalContext();
  useEffect(() => {
    console.log("show: " + show);
  })
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
    setCurrentProducts(setItem);
  }
  if(errorServer){
    return <p>{errorServer}</p>
  }
  if(loading) { 
    return <p>Loading...</p>
  }
  if(isLoading) { 
    return <p>Loading...</p>
  }
  if(error){
    return <p>Error happened: {error}.</p>
  }
  const list = (element : Item,target: string) => {
    if (target in element) {
      return element[target as keyof Item];
    }
    return null;
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
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">

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
        <div>
          <a className="btn btn-primary" href="/register" role="button" style={{marginRight: 10}}>Register</a>
          <a className="btn btn-primary" href="/login" role="button" style={{marginRight: 10}}>Login</a>
        </div>
      ) : (
        <div className="text-white" style={{marginRight:10}}>
          <strong className="text-info">{user}</strong> <a href="/profile"><CgProfile size={26} /></a>
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
                    height : "2vw",
                    fontFamily: "monospace"
                }}
                 placeholder="Search for something..."
            />
          </div>
      <div className="row">
  {filteredProducts.map((element) => (
    <div className="col-md-2 mb-3" key={element.id}>
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
          {show && (
            <div className="card-text">
              <a className="btn btn-primary" href="/cart" role="button">Cart<FiShoppingCart /></a>
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Products