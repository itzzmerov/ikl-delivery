import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 

const Reviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const response = await getDocs(collection(db, "reviews"));
        const reviewsList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsList);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // const handleUpdateReviews = (id) => {
    //     navigate(`/admin/services/${id}/update-services`);
    // };

    // const handleDeleteReviews = async (id) => {
    //     try {
    //         await deleteDoc(doc(db, 'reviews', id));
    //         fetchReviews();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const openReviewForm = () => {
    //     navigate("/admin/reviews/new-review")
    // }

    return (
        <div className="p-8 h-[100vh] flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Review List</h1>
                {/* <button onClick={openReviewForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add New Review</button> */}
            </div>

            <div className="min-w-full h-[80%] overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Rating Value</th>
                            <th className="py-2 px-4 border-b">Comment</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                            {/* <th className="py-2 px-4 border-b">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            reviews.map((review) => (
                                <tr key={review.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{review.ratingValue}</td>
                                    <td className="py-2 px-4 border-b">{review.comment}</td>
                                    <td className="py-2 px-4 border-b">
                                        {review.created_at ? new Date(review.created_at).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric"
                                        }) : "N/A"}
                                    </td>
                                    {/* <td className="py-2 px-4 border-b flex gap-2">
                                        <button
                                            onClick={() => handleUpdateReviews(review.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteReviews(review.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-lightWhite transition"
                                        >
                                            <DeleteIcon fontSize="small" />
                                            <span>Delete</span>
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Reviews 