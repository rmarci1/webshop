import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Home() {
    const {user,show,cart} = useGlobalContext();
    return (
        <div className="bg-dark min-vh-100 text-white">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">
                <a className="navbar-brand" href="/" style={{ marginLeft: 10 }}>
                    Home
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/products">
                                Products
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
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
                </div>
            </nav>
            <div className="container">
                <div className="jumbotron bg-dark">
                    <h1 className="display-4">Welcome to my webshop!</h1>
                    <p className="lead">
                        You can browse here endlessly to search for your desire
                    </p>
                    <hr className="my-4" />
                    <p>
                        It has many options to fill your needs,{" "}
                        <strong className="text-info"> what are you waiting for?</strong>
                        {" "}
                        Let's look for <a href="/products">products</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
