import React, { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderItem from './OrderItem';
const Orders = () => {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [user?.email]);

    const handleDelete = (id) => {
        const confirm = window.confirm(
            'are you sure? you want to be cancel order',
        );
        if (confirm) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = orders.filter(
                            (order) => order._id !== id,
                        );
                        setOrders(remaining);
                        alert('delete successfully');
                    }
                });
        }
    };

    const handleUpdate = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0)
                {
                    const remainingOrders = orders.filter(order => order._id !== id)
                    const approvedOrders = orders.find(order => order._id === id)
                    approvedOrders.status = "Approved"
                    const newOrders = [ approvedOrders, ...remainingOrders ]
                    setOrders(newOrders)
                }
            });
    };

    return (
        <div>
            <h1 className="text-4xl">you have {orders?.length} orders</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderItem
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
