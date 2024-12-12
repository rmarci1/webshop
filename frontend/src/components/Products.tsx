import { useEffect, useState } from "react"

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
  const [currentProducts,setCurrentProducts] = useState("books");
  const [errorServer,setErrorServer] = useState("");
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
        fetch(`http://localhost:3000/books`)
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
                console.log(data);
                setProducts(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                console.log(error.message) 
                setError(error.message);
            })
  }, [])
  if(errorServer){
    return <p>{errorServer}</p>
  }
  if(loading) { 
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
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">

      <a className="navbar-brand" href="#" style={{marginLeft: 10}}>Webshop</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/kezdolap">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/song-felvetel">Felvétel</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/tabletek-torles">Törlés</a>
          </li>
        </ul>
      </div>
      </nav>
      {
        products.map((element) => (
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{list(element,"title") || list(element,"name")}</h5>
            </div>
        </div>
        ))
      }
    </div>
  )
}

export default Products