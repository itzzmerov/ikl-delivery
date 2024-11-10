import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OrderForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        senderFirstName: '',
        senderLastName: '',
        senderPhone: '',
        senderAddressHouse: '',
        senderAddressStreet: '',
        senderAddressBarangay: '',
        senderAddressCity: '',
        senderAddressRegion: '',
        senderAddressZIP: '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverPhone: '',
        receiverAddressHouse: '',
        receiverAddressStreet: '',
        receiverAddressBarangay: '',
        receiverAddressCity: '',
        receiverAddressRegion: '',
        receiverAddressZIP: '',
        amount: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const result = await addDoc(collection(db, "orders"), formData)
            console.log(result);
            navigate('/admin/orderlist')
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/orderlist')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Order List</span> <ArrowForwardIosIcon /> Add New Order</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">PERA PADALA</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/orderlist')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                {/* Sender Information */}
                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Sender Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2 w-full rounded"
                            required
                            name='senderFirstName'
                            id='senderFirstName'
                            value={formData.senderFirstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2 w-full rounded"
                            required
                            name='senderLastName'
                            id='senderLastName'
                            value={formData.senderLastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='senderPhone'
                        id='senderPhone'
                        value={formData.senderPhone}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Sender Address */}
                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Address:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="House / Bldg. No."
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressHouse'
                            id='senderAddressHouse'
                            value={formData.senderAddressHouse}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Street Address"
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressStreet'
                            id='senderAddressStreet'
                            value={formData.senderAddressStreet}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Barangay"
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressBarangay'
                            id='senderAddressBarangay'
                            value={formData.senderAddressBarangay}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="City / Municipality"
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressCity'
                            id='senderAddressCity'
                            value={formData.senderAddressCity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Region"
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressRegion'
                            id='senderAddressRegion'
                            value={formData.senderAddressRegion}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="ZIP code"
                            className="border w-full p-2 rounded"
                            required
                            name='senderAddressZIP'
                            id='senderAddressZIP'
                            value={formData.senderAddressZIP}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Receiver Information */}
                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Receiver Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2 w-full rounded"
                            required
                            name='receiverFirstName'
                            id='receiverFirstName'
                            value={formData.receiverFirstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2 w-full rounded"
                            required
                            name='receiverLastName'
                            id='receiverLastName'
                            value={formData.receiverLastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='receiverPhone'
                        id='receiverPhone'
                        value={formData.receiverPhone}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Receiver Address */}
                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Address:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="House / Bldg. No."
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressHouse'
                            id='receiverAddressHouse'
                            value={formData.receiverAddressHouse}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Street Address"
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressStreet'
                            id='receiverAddressStreet'
                            value={formData.receiverAddressStreet}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Barangay"
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressBarangay'
                            id='receiverAddressBarangay'
                            value={formData.receiverAddressBarangay}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="City / Municipality"
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressCity'
                            id='receiverAddressCity'
                            value={formData.receiverAddressCity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Region"
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressRegion'
                            id='receiverAddressRegion'
                            value={formData.receiverAddressRegion}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="ZIP code"
                            className="border w-full p-2 rounded"
                            required
                            name='receiverAddressZIP'
                            id='receiverAddressZIP'
                            value={formData.receiverAddressZIP}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Amount */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Amount:</h2>
                    <input
                        type="text"
                        placeholder="e.g. 500"
                        className="border p-2 w-full rounded"
                        required
                        name='amount'
                        id='amount'
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Send Order
                </button>

            </div>
        </div>
    )
}

export default OrderForm