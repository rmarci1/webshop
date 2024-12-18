import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../context/GlobalProvider";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Card";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Cart(){
    const {user,cart,setCart} = useGlobalContext()
    const navigate = useNavigate();
    if(!user){
        navigate('/products')
    }
    const handleEmpty = () => {
      const answer = confirm("Are you sure?")
      if(answer){
        setCart([]);
      }
    }
    return (
      <div className="min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto" style={{alignItems:'center'}}>

        <a className="navbar-brand" href="/" style={{marginLeft: 10}}>Home</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/products">Products</a>
            </li>
          </ul>
        </div>

          <div className="text-white link" style={{marginRight:10, display:"inline-flex"}}>
            <h5 style={{margin:0,color:"#60a5fa"}}>{user}</h5> 
            <a href="/profile" style={{marginLeft:10}}><CgProfile size={26}/></a>
            <div style={{marginRight:100}}></div>
            <a href="/cart" className=""><FiShoppingCart size={24} style={{marginRight:12}} /></a>
            {
                cart.length != 0 && <strong className="cart_counter" style={{marginRight: 10}}>{cart.length}</strong>
            }
          </div>
        </nav>
        {
          cart.length != 0 && (
            <div>
              <button className="btn btn-primary my-2" onClick={handleEmpty}>Empty all<FaRegTrashAlt /></button>
              <div className="row">
                {cart.map((current) => (
                  <Cards
                    element={current}
                    cartDelete={true}
                  />
                ))}
              </div>
            </div>
          )
        }
        
          {
            cart.length == 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}>
                <h2 className="display-3" style={{margin: 0}}>You don't have any items yet, Choose <a href="/products">One!</a></h2>
              </div>
            )
          }
        </div>
    )
}