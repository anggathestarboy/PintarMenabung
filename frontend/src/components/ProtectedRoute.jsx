import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    
    
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    
    const validasi = async() => {
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }
    
    
    useEffect(() => {
        validasi()
    }, []);
    
    
    return children;
    
}

export default ProtectedRoute
