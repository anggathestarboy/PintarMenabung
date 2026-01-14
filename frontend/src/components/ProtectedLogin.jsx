import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedLogin = ({children}) => {
 let token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    
    const validasi = async() => {
        if (token) {
            navigate("/");
        }
    }
    
    
    useEffect(() => {
        validasi()
    }, []);
    
    
    return children;
}

export default ProtectedLogin
