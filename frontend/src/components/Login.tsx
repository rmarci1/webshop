import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser,setShow} = useGlobalContext();
    const navigate = useNavigate();
  
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await login(username, password);
        setUser(username);
        setShow(true);
        navigate('/products');
      } catch (error) {
        alert('Login failed');
      }
    };

    return (
        <div>
            <div className="container">
            <h1 className="display-5">Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="form-label">Username: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}    
                    />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button type="submit" className="btn btn-primary">Log In</button>
                    <p className="mb-0">Don't have an Account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    )
}