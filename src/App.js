import React, { useState } from 'react';
import './App.css';

function App() {
    const [tableEntries, setTableEntries] = useState([
        { type: 1, name: 'income', amount: 25000 },
        { type: 0, name: 'rent', amount: 18000 },
        { type: 0, name: 'food', amount: 5000 },
    ]);

    const [newEntry, setNewEntry] = useState({ type: 0, name: '', amount: 0 });

    const updateSummary = () => {
        const totalIncome = tableEntries.reduce((t, e) => e.type === 1 ? t + e.amount : t, 0);
        const totalExpense = tableEntries.reduce((ex, e) => e.type === 0 ? ex + e.amount : ex, 0);
        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        };
    };

    const addItem = () => {
        if (newEntry.name === '' || Number(newEntry.amount) === 0) {
            alert('Incorrect Input');
            return;
        }
        if (Number(newEntry.amount) <= 0) {
            alert("Incorrect amount! can't add negative");
            return;
        }
        setTableEntries([...tableEntries, newEntry]);
        setNewEntry({ type: 0, name: '', amount: 0 });
    };

    const del = (name) => {
        setTableEntries(tableEntries.filter(e => e.name !== name));
    };

    const summary = updateSummary();

    return (
        <div>
            <h1 style={{ color: 'rgb(32, 90, 32)' }}>Expense Tracker</h1>
            <div className="summary">
                <div>
                    <h1> Balance: <span id="updatedBal">{summary.balance}</span></h1>
                </div>
                <br />
                <div className="total">
                    <div>
                        Total Income:
                        <div>
                            <h2 style={{ color: 'green' }} id="updatedInc">{summary.totalIncome}</h2>
                        </div>
                    </div>
                    <hr className="vertical" />
                    <div>
                        Total Expenses:
                        <div>
                            <h2 style={{ color: 'red' }} id="updatedExp">{summary.totalExpense}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="root">
                <div id="items">
                    <h2>Expenses</h2>
                    <table id="table">
                        <thead>
                            <tr className="titles">
                                <th>S.no.</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.amount}</td>
                                    <td style={{ color: entry.type === 0 ? 'red' : 'green' }}>
                                        {entry.type === 0 ? 'outgoing' : 'incoming'}
                                    </td>
                                    <td className="zoom" onClick={() => del(entry.name)}>X</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr className="vertical" />
                <div id="new">
                    <h2>Add new</h2>
                    <div className="inputs">
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Entry type:</p>
                            <select
                                value={newEntry.type}
                                onChange={(e) => setNewEntry({ ...newEntry, type: Number(e.target.value) })}
                            >
                                <option value="0">Expense</option>
                                <option value="1">Income</option>
                            </select>
                        </div>
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Name:</p>
                            <input
                                id="name"
                                type="text"
                                value={newEntry.name}
                                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                                placeholder="name"
                            />
                        </div>
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Amount:</p>
                            <input
                                id="amount"
                                type="number"
                                value={newEntry.amount}
                                onChange={(e) => setNewEntry({ ...newEntry, amount: Number(e.target.value) })}
                                placeholder="amount"
                            />
                        </div>
                    </div>
                    <button onClick={addItem}>Add Income/Expense</button>
                </div>
            </div>
        </div>
    );
}

export default App;
