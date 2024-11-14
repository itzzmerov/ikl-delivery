import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddReview = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        ratingValue: '',
        comment: '',
        created_at: '',
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

        const formDataWithDate = {
            ...formData,
            created_at: new Date().toISOString(),
        };

        try {
            const result = await addDoc(collection(db, "reviews"), formDataWithDate)
            console.log(result);

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/admin/reviews')
            }, 2000);

        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/reviews')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Reviews</span> <ArrowForwardIosIcon /> Add New Review</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">IKL REVIEWS</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/reviews')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-2">
                    <h3 className='mb-2'>Rating Value:</h3>
                    <input
                        type="text"
                        placeholder="Rating Value"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='ratingValue'
                        id='ratingValue'
                        value={formData.ratingValue}
                        onChange={handleInputChange}
                    />

                    <h3 className='mb-2'>Comment:</h3>
                    <input
                        type="text"
                        placeholder="Comment"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='comment'
                        id='comment'
                        value={formData.comment}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Add Review
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                        <div className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md">
                            <p>Successfully added new review!</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AddReview
