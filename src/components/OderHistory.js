import React from 'react';

const orders = [
  { date: 'August 12, 2023', id: 125789, total: '$799' },
  { date: 'August 12, 2023', id: 128790, total: '$799' },
];

const OrderHistory = () => {
  return (
    <div className="order-container">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.date}</td>
              <td>{order.id}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;