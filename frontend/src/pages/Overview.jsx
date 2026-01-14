import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [wallet, setWallet] = useState([]);
  let token = localStorage.getItem("token");
  const [form, setForm] = useState({
    name: "",
    currency_code: ""
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  
  const [category, setCategory] = useState([]);
  
  
  const getCategory = async() => {
    let res = await axios.get("http://localhost:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setCategory(res.data.data.categories);
  }
  
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/wallets", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  
  
  const [formTransaksi, setFormTransaksi] = useState({
    wallet_id: "",
    category_id: "",
    amount: 0,
    date: "",
    note: ""
  })
  
  
  
const handleChangeTransaksi = (e) => {
  setFormTransaksi({
    ...formTransaksi,
    [e.target.name] : e.target.value
  })
}
  
  
  
  const [currency, setCurrency] = useState([]);
  
  
  const getCurrency = async() => {
    let res = await axios.get("http://localhost:8000/api/currencies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setCurrency(res.data.data.currencies)
  }
  
  
  const getWallet = async() => {
    let res = await axios.get("http://localhost:8000/api/wallets", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setWallet(res.data)
  }
  
  
  const handleTransaksi = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/transactions",formTransaksi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      
      // window.location.reload();
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  
  
  useEffect(() => {
    getWallet();
    getCurrency();
    getCategory();
  }, [])
  
  
  console.log(category)
  console.log(error)
  
  
  

  return (
    <div style={styles.container}>
      <h1>Overview</h1>

      {/* ================= WALLET SECTION ================= */}
      <section>
        <h2>User Wallets</h2>

 <div style={styles.walletGrid}>
{
  wallet.map((w) => (
    <>
     <div style={styles.walletCard}>
            <h4>{w.name}</h4>
            <p>{w.balance || 0}</p>
          </div>
    
    </>
  ))
}


       
         


          <button
            style={styles.addWallet}
            onClick={() => setShowAddWallet(true)}
          >
            +
          </button>
        </div>
      </section>

      {/* ================= TRANSACTION SECTION ================= */}
      <section style={{ marginTop: 32 }}>
        <div style={styles.transactionHeader}>
          <h2>Recent Transactions</h2>
          <button
            style={styles.addTransaction}
            onClick={() => setShowAddTransaction(true)}
          >
            Add Transaction
          </button>
        </div>

        <p style={styles.date}>Jun 7, 2025</p>

        <div
          style={styles.transactionItem}
          onDoubleClick={() => window.confirm("Delete this transaction?")}
        >
          <span style={{ ...styles.icon, color: "red" }}>●</span>
          <div style={{ flex: 1 }}>
            <strong>Food</strong>
            <div style={styles.subText}>Cash • Lunch</div>
          </div>
          <div style={styles.expense}>- IDR 50.000</div>
        </div>

        <div
          style={styles.transactionItem}
          onDoubleClick={() => window.confirm("Delete this transaction?")}
        >
          <span style={{ ...styles.icon, color: "green" }}>●</span>
          <div style={{ flex: 1 }}>
            <strong>Salary</strong>
            <div style={styles.subText}>BCA</div>
          </div>
          <div style={styles.income}>+ IDR 3.000.000</div>
        </div>

        <p style={styles.date}>Jun 6, 2025</p>

        <div
          style={styles.transactionItem}
          onDoubleClick={() => window.confirm("Delete this transaction?")}
        >
          <span style={{ ...styles.icon, color: "red" }}>●</span>
          <div style={{ flex: 1 }}>
            <strong>Transport</strong>
            <div style={styles.subText}>Cash • Ojek</div>
          </div>
          <div style={styles.expense}>- IDR 20.000</div>
        </div>
      </section>

      {/* ================= ADD WALLET POPUP ================= */}
      {showAddWallet && (
        <div style={styles.overlay}>
          <form onSubmit={handleSubmit}>
            
               <div style={styles.modal}>
            <h3>Add Wallet</h3>

            <label>Wallet Name</label>
            <input type="text" name="name" onChange={handleChange} value={form.name} placeholder="Cash" />

            <label>Initial Balance</label>
         <select name="currency_code" onChange={handleChange} id="">
          <option value="" disabled selected>Select Currency</option>
          {
            currency.map((c) => (
              
              <>
                <option value={c.code}>{c.symbol} - { c.name} </option>
              
              </>
            )
              
            )
          }
         </select>

            <div style={styles.modalActions}>
              <button onClick={() => setShowAddWallet(false)}>Cancel</button>
              <button
                
                
              type="submit"
              >
                Save
              </button>
              {error && <p style={{color: "red"}}>{error}</p>}
            </div>
          </div>
            
            
          </form>
       
        </div>
      )}

      {/* ================= ADD TRANSACTION POPUP ================= */}
      {showAddTransaction && (
        <div style={styles.overlay}>
          
          <form onSubmit={handleTransaksi}>
                <div style={styles.modal}>
            <h3>Add Transaction</h3>

            <label>Category</label>
            <select name="category_id" onChange={handleChangeTransaksi}>
              <option value={""} disabled selected>Select Category</option>
      {
        category.map((c) => (
          <>
           <option value={c.id}>{c.name} - {c.type}{c.icon}</option>
          
          </>
        ))
      }
            </select>



            <label>Wallet</label>
            <select name="wallet_id"  onChange={handleChangeTransaksi}>
                           <option value={""} disabled selected>Select Wallet</option>
                           
                           {
                            wallet.map((w) => (
                              <>
                                  <option value={w.id}>{w.name} - ({w.balance || 0})</option>
                              
                              </>
                            ))
                           }

             
            </select>

            <label>Amount</label>
            <input type="number" name="amount" onChange={handleChangeTransaksi} value={formTransaksi.amount} placeholder="0" />
                           <label htmlFor="">Date</label>
                           <input type="date" name="date" onChange={handleChangeTransaksi} value={formTransaksi.date} id="" />
            <label>Note</label>
            <input type="text" name="note" onChange={handleChangeTransaksi} value={formTransaksi.note} placeholder="Optional" />

            <div style={styles.modalActions}>
              <button onClick={() => setShowAddTransaction(false)}>Cancel</button>
              <button
                type="submit"
                
              >
                Save
              </button>
            </div>
          </div>
          
              {error && <p style={{color: "red"}}>{error}</p>}
          
            
            
          </form>
      
        </div>
      )}
    </div>
  )
}

export default Overview

// ================= STYLES =================
const styles = {
  container: {
    padding: 24,
    maxWidth: 900,
    margin: "0 auto"
  },
  walletGrid: {
    display: "flex",
    gap: 16,
    alignItems: "center"
  },
  walletCard: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    minWidth: 150
  },
  addWallet: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "1px dashed #aaa",
    fontSize: 24,
    cursor: "pointer"
  },
  transactionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addTransaction: {
    padding: "8px 16px",
    cursor: "pointer"
  },
  date: {
    marginTop: 16,
    fontWeight: "bold",
    color: "#555"
  },
  transactionItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 8px",
    borderBottom: "1px solid #eee",
    cursor: "pointer"
  },
  icon: {
    fontSize: 18
  },
  subText: {
    fontSize: 12,
    color: "#777"
  },
  expense: {
    color: "red",
    fontWeight: "bold"
  },
  income: {
    color: "green",
    fontWeight: "bold"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 8,
    width: 320,
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16
  }
}
  