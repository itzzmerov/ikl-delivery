import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../utils/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const UpdateService = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    const fetchServices = async () => {
        try {
            const response = await getDoc(doc(db, "services", id));
            if (response.exists())
                setFormData(response.data());
            else
                console.log("No such document found!")
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchServices();
        // eslint-disable-next-line
    }, [id])


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
            const result = await updateDoc(doc(db, "services", id), formData)
            console.log(result);
            navigate("/admin/services")
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center min-h-screen w-full rounded-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/services')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Services</span> <ArrowForwardIosIcon /> Update Services</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">IKL SERVICES</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/services')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-2">
                    <h3 className='mb-2'>Name:</h3>
                    <input
                        type="text"
                        placeholder="Service Name"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <h3 className='mb-2'>Description:</h3>
                    <input
                        type="text"
                        placeholder="Description"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='description'
                        id='description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Update Order
                </button>

            </div>
        </div>
    )
}

export default UpdateService