import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let res = await axios.post(
                "http://localhost:8000/api/auth/register",
                form
            )

            localStorage.setItem("token", res.data.data.token)
            localStorage.setItem("fullname", res.data.data.name)
            navigate("/")
        } catch (error) {
              setError(error.response.data.message)
        }
    }

    return (
        <div style={styles.container}>
            {/* LEFT IMAGE */}
            <div style={styles.left}>
                <div style={styles.overlay}>
                    <h1 style={styles.brand}>Pintar Menabung</h1>
                    <p style={styles.tagline}>
                       Kelola Keuangan anda secara digital
                    </p>
                </div>
            </div>

            {/* RIGHT FORM */}
            <div style={styles.right}>
                <form onSubmit={handleSubmit} style={styles.card}>
                    <h2 style={styles.title}>Register</h2>


         <input
                        type="text"
                        name="full_name"
                        placeholder="FullName"
                        value={form.full_name}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
           

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    {error && (
                        <p style={styles.error}>{error}</p>
                    )}

                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                    
                    <br /><br />
                    
                     <p>sudah punya akun? <a href="/login">login sekarang</a></p>
                </form>
                
               
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        fontFamily: "sans-serif"
    },

    /* LEFT SIDE */
    left: {
        flex: 1,
        backgroundImage:
            "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
    },
    overlay: {
        backgroundColor: "rgba(0, 77, 64, 0.85)", // hijau gelap overlay
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px"
    },
    brand: {
        fontSize: "40px",
        marginBottom: "10px"
    },
    tagline: {
        fontSize: "18px",
        maxWidth: "300px",
        lineHeight: "1.5"
    },

    /* RIGHT SIDE */
    right: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f8f6"
    },
   
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#004d40" // hijau sangat gelap
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "1px solid #b2dfdb",
        outline: "none",
        fontSize: "14px"
    },
    button: {
        width: "106%",
        padding: "12px",
        backgroundColor: "#004d40",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "15px"
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
        textAlign: "center"
    }
}

export default Register
