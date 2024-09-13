import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is used for login

const AdminDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      axios.get('http://localhost:5000/api/products')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.log('Failed to delete product:', error);
    }
  };

  return (
    <div>
      {user?.isAdmin ? (
        <div>
          <h1>Admin Dashboard</h1>
          <button>Add Product</button> {/* Add functionality to open a form */}
          <ul>
            {products.map(product => (
              <li key={product._id}>
                {product.name} - ${product.price}
                <button onClick={() => handleDelete(product._id)}>Delete</button>
                <button>Update</button> {/* Add functionality for updating */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>You do not have access to the admin dashboard</h2>
      )}
    </div>
  );
};

export default AdminDashboard;
