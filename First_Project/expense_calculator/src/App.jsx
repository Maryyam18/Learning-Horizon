import './App.css';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  function calculateTotal() {
    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
      sum += transactions[i].amount;
    }
    return sum;
  }

  function addTransaction(isIncome) {
    if (!amount || !description) {
      alert('Please fill in both fields!');
      return;
    }

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      alert('Amount must be a positive number!');
      return;
    }

    // Create new transaction object
    const newTransaction = {
      id: Date.now(),
      amount: isIncome ? value : -value,
      description: description
    };

    // Make a new array manually (more "beginner" style)
    let newList = transactions.slice();
    newList.push(newTransaction);
    setTransactions(newList);

    setAmount('');
    setDescription('');
  }

  return (
    <div className="min-h-screen bg-[#3b2f2f] flex items-center justify-center p-4">
      <div className="bg-[#4b3832] max-w-5xl w-full rounded-3xl shadow-2xl grid md:grid-cols-2 border border-[#6b4e3d]">

        {/* Left Side - Form */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#d2b48c] mb-8 text-center">
            🧮 Expense Calculator
          </h1>

          <div className="mb-8 space-y-5">
            <input
              type="number"
              placeholder="Amount (e.g. 500)"
              className="bg-[#5c4033] text-[#fefae0] border border-[#6b4e3d] p-3 w-full rounded-xl"
              value={amount}
              onChange={function(e) { setAmount(e.target.value); }}
            />

            <input
              type="text"
              placeholder="Description (e.g. Rent, Food)"
              className="bg-[#5c4033] text-[#fefae0] border border-[#6b4e3d] p-3 w-full rounded-xl"
              value={description}
              onChange={function(e) { setDescription(e.target.value); }}
            />
          </div>

          <div className="flex gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-full"
              onClick={function() { addTransaction(true); }}
            >
              + Add Income
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl w-full"
              onClick={function() { addTransaction(false); }}
            >
              - Add Expense
            </button>
          </div>
        </div>

        {/* Right Side - Transaction History */}
        <div className="bg-[#3b2f2f] p-8 border-l border-[#6b4e3d] flex flex-col">
          <h2 className="text-2xl font-bold text-[#fefae0] mb-4 border-b border-[#6b4e3d] pb-2">
            📜 Transaction History
          </h2>

          <div className="flex-1 overflow-y-auto mb-4">
            {transactions.length === 0 ? (
              <p className="text-[#e6ccb2] text-center">No transactions yet. Add some!</p>
            ) : (
              <ul className="space-y-3">
                {transactions.map(function(t) {
                  return (
                    <li
                      key={t.id}
                      className="flex justify-between items-center p-3 rounded-xl border border-[#6b4e3d] bg-[#4b3832]"
                    >
                      <div>
                        <span className="text-[#fefae0]">{t.description}</span>
                        <span className={
                          'ml-2 text-xs font-bold px-2 py-0.5 rounded ' +
                          (t.amount > 0
                            ? 'bg-green-500/20 text-green-300 border border-green-400'
                            : 'bg-red-500/20 text-red-300 border border-red-400')
                        }>
                          {t.amount > 0 ? 'INCOME' : 'EXPENSE'}
                        </span>
                      </div>
                      <span className={
                        'text-lg font-bold ' +
                        (t.amount > 0 ? 'text-green-400' : 'text-red-400')
                      }>
                        {t.amount > 0 ? '+' : ''}
                        {t.amount}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="text-center mt-4">
            <span className="text-lg font-bold text-[#fefae0]">Total:</span>
            <span className={
              'ml-2 inline-block px-4 py-1 rounded-full text-lg font-bold border ' +
              (calculateTotal() >= 0
                ? 'bg-green-500/20 text-green-300 border-green-400'
                : 'bg-red-500/20 text-red-300 border-red-400')
            }>
              {calculateTotal() >= 0 ? '+' : ''}
              {calculateTotal()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
