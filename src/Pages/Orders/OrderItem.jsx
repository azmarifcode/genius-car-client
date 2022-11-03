import React, { useEffect, useState } from 'react';

const OrderItem = ({ order, handleDelete, handleUpdate }) => {
    const { _id, service, serviceName, price, customerName, phone, status } =
        order;
    const [orderService, setOrderService] = useState({});
    // console.log(order);
    // console.log(status);
    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then((res) => res.json())
            .then((data) => setOrderService(data));
    }, [service]);

    return (
        <>
            <tr>
                <th>
                    <label>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn">
                            X
                        </button>
                    </label>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                {orderService?.img && (
                                    <img
                                        src={orderService.img}
                                        alt=""
                                        srcset=""
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{customerName}</div>
                            <div className="text-sm opacity-50">
                                United States
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    {serviceName}
                    <br />
                    <span className="badge badge-ghost badge-sm">{phone}</span>
                </td>
                <td>{price}</td>
                <th>
                    <button
                        onClick={()=>handleUpdate(_id)}
                        className="btn btn-ghost btn-xs">
                        {status ? status : 'Pending'}
                    </button>
                </th>
            </tr>
        </>
    );
};

export default OrderItem;
