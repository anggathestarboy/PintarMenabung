import React, { useState } from "react"

const Overview = () => {
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  return (
    <div style={styles.container}>
      <h1>Overview</h1>

      {/* ================= WALLET SECTION ================= */}
      <section>
        <h2>User Wallets</h2>

        <div style={styles.walletGrid}>
          <div style={styles.walletCard}>
            <h4>Cash</h4>
            <p>IDR 750.000</p>
          </div>

          <div style={styles.walletCard}>
            <h4>BCA</h4>
            <p>IDR 1.250.000</p>
          </div>

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
          <div style={styles.modal}>
            <h3>Add Wallet</h3>

            <label>Wallet Name</label>
            <input type="text" placeholder="Cash" />

            <label>Initial Balance</label>
            <input type="number" placeholder="0" />

            <div style={styles.modalActions}>
              <button onClick={() => setShowAddWallet(false)}>Cancel</button>
              <button
                onClick={() => {
                  alert("Wallet saved (dummy)")
                  setShowAddWallet(false)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD TRANSACTION POPUP ================= */}
      {showAddTransaction && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Add Transaction</h3>

            <label>Type</label>
            <select>
              <option>Expense</option>
              <option>Income</option>
            </select>

            <label>Category</label>
            <input type="text" placeholder="Food / Salary" />

            <label>Wallet</label>
            <select>
              <option>Cash</option>
              <option>BCA</option>
            </select>

            <label>Amount</label>
            <input type="number" placeholder="0" />

            <label>Note</label>
            <input type="text" placeholder="Optional" />

            <div style={styles.modalActions}>
              <button onClick={() => setShowAddTransaction(false)}>Cancel</button>
              <button
                onClick={() => {
                  alert("Transaction saved (dummy)")
                  setShowAddTransaction(false)
                }}
              >
                Save
              </button>
            </div>
          </div>
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
