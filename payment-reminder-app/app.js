import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [payments, setPayments] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    axios.get('/api/payments')
      .then(res => setPayments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/payments', { description, amount, dueDate });
      setPayments([...payments, res.data]);
      setDescription('');
      setAmount(0);
      setDueDate(new Date());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Payment Reminder App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <DatePicker selected={dueDate} onChange={date => setDueDate(date)} />
        <button type="submit">Add Payment</button>
      </form>
      <div>
        {payments.map(payment => (
          <div key={payment._id}>
            <h3>{payment.description}</h3>
            <p>Amount: ${payment.amount}</p>
            <p>Due Date: {payment.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
