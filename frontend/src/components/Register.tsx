import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await register(username, password);
        navigate('/login');
      } catch (error) {
        alert('Registration failed');
      }
    };
    return(
        <div className="container">
            <h1 className="display-5">Register</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="form-label">Username</label>
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
                    <button type="submit" className="btn btn-primary">Register</button>
                    <p className="mb-0">Already have an Account? <a href="/login">Sign In</a></p>
                </div>
            </form>
        </div>
    )
}