import React, { useContext } from 'react';
import {useLoaderData} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () =>
{
    const {user} = useContext(AuthContext)
    console.log(user);
    const { title, price, _id } = useLoaderData()
    const handleForm = (event) =>
    {
        event.preventDefault()
        const form = event.target
        const name = `${form.firstName.value} ${form.lastName.value}`
        const phone = form.phone.value
        const email = user?.email || "Unregister"
        const message = form.message.value

        const order = {
            service: _id,
            serviceName: title,
            price,
            customerName: name,
            phone,
            email,
            message
        }
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data =>
            {
                if (data.acknowledged)
                {
                    form.reset()
                    alert('submit success')
                } console.log(data);
            })
        .catch(er => console.error(er))
    }
    return (
        <div className="mt-5">
            <form onSubmit={handleForm} className="">
                <h1 className="text-4xl">{`you are about to order: ${title}`}</h1>
                <h1 className="text-4xl">{`Price: ${price}`}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" name="firstName" placeholder="First Name"  className="input input-bordered input-info w-full"/>
                    <input type="text" name="lastName" placeholder="Last Name"  className="input input-bordered input-info w-full"/>
                    <input type="phone" name="phone" placeholder="Phone"  className="input input-bordered input-info w-full"/>
                    <input type="email" name="email" placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered input-info w-full" />
                </div>
                <div className="mx-auto grid grid-cols-1">
                    <textarea name='message' className="textarea textarea-accent my-5" placeholder="Your message"></textarea>
                    <button type='submit' className="btn mx-auto mb-5 w-3/4">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;