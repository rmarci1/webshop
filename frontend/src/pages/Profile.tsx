import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../context/GlobalProvider"
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePassword, updateUsername } from "../api";

export default function Profile(){
    const {user,cart,setUser} = useGlobalContext();
    const [usershow,setUserShow] = useState(false);
    const [form,setForm] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const saveUser = async () => {
        if(!form.username){
            alert("you need to enter a username")
            return;
        }
        try{
            const response = await updateUsername(user,form.username);
            setUser(form.username);
            setForm({...form, username: ""})
            setUserShow(false);
        }
        catch(error){
            if (error instanceof Error) {
                alert("Error updating username:" + error.message);
              } else {
                alert("Unknown error occurred:" + error);
              } 
        }
    }
    const savePassword = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(form.password)) {
            alert("Password must be at least 6 characters long, contain a lowercase letter, an uppercase letter, and a number");
            return;
        }
        try{
            const response = await updatePassword(user,form.password);
            setForm({...form, password: ""})
        }
        catch(error){
            if (error instanceof Error) {
                alert("Error updating username:" + error.message);
              } else {
                alert("Unknown error occurred:" + error);
              } 
        }
    }
    if(!user){
        navigate('/products');
    }
    return (
        <div>
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
            <div className="container">
                <div className="mt-2">
                    <h1 className="display-4">Welcome <span style={{color: "#60a5fa"}}>{user}!</span></h1>
                    <div className="border border-dark-subtle bg rounded-3" style={{padding: 15}}> 
                        <div className="size" style={{display:"inline-flex"}}>
                            <p>Username: <strong>{user}</strong></p>
                            {
                                !usershow?  <button className="btn btn-primary mt-1" style={{height: "92%", marginLeft: 10}} onClick={() => setUserShow(!usershow)}>Change</button> : 
                                (<button className="btn btn-primary mt-1" style={{height: "92%", marginLeft: 10}} onClick={saveUser}>Save</button> )
                            }
                           
                            {usershow &&<form><input className="form-control mt-1" placeholder="Choose a name" style={{marginLeft: 10}} value={form.username} onChange={(e) => setForm({...form,username: e.target.value})}/></form>}
                        </div>
                        <p></p>
                        <div className="size" style={{display:"inline-flex"}}>
                            <p>Do you want to Change your password? </p>
                            <form>
                                <input 
                                    className="mt-1 form-control" 
                                    placeholder="Choose password" 
                                    style={{marginLeft: 10}} 
                                    value={form.password} 
                                    onChange={(e) => setForm({...form,password: e.target.value})}
                                />
                            </form>
                            <button className="btn btn-primary mt-1" style={{height: "92%", marginLeft: 15}} onClick={savePassword}>Change</button>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    )
}