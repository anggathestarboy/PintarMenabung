import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Pintar Menabung</h3>

      <div style={styles.menu}>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/overview" style={styles.link}>Overview</Link>
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#111",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  menu: {
    display: "flex",
    gap: "16px"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  }
}

export default Navbar
