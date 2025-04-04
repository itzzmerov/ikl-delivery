import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Riders = () => {
    const navigate = useNavigate();
    const [riders, setRiders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchRiders = async () => {
        const customersQuery = query(collection(db, "users"), where("userType", "==", "rider"));
        const response = await getDocs(customersQuery);
        const ridersList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRiders(ridersList);
    };

    useEffect(() => {
        fetchRiders();
    }, []);

    const handleUpdateRiders = (id) => {
        navigate(`/admin/riders/${id}/update-rider`);
    };

    const handleDeleteRiders = async () => {
        if (deleteId) {
            try {
                await deleteDoc(doc(db, 'users', deleteId));
                setShowPopup(true);
                setShowConfirm(false);
                setTimeout(() => {
                    setShowPopup(false);
                    fetchRiders();
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openRiderForm = () => {
        navigate("/admin/riders/new-rider")
    };

    return (
        <div className="p-8 h-[89vh] flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Riders List</h1>
                <button onClick={openRiderForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add New Rider</button>
            </div>

            <div className="min-w-full h-[90%] overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Username</th>
                            <th className="py-2 px-4 border-b">Email Address</th>
                            <th className="py-2 px-4 border-b">Phone Number</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            riders.map((rider) => (
                                <tr key={rider.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{rider.status}</td>
                                    <td className="py-2 px-4 border-b">{rider.firstName} {rider.middleName} {rider.lastName}</td>
                                    <td className="py-2 px-4 border-b">{rider.username}</td>
                                    <td className="py-2 px-4 border-b">{rider.email}</td>
                                    <td className="py-2 px-4 border-b">{rider.phoneNumber}</td>
                                    <td className="py-2 px-4 border-b">
                                        {rider.house || "N/A"} {rider.street || "N/A"}, {rider.barangay || "N/A"}, {rider.city || "N/A"} {rider.zip || "N/A"}, {rider.region || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b flex flex-col gap-2">
                                        <button
                                            onClick={() => handleUpdateRiders(rider.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => { setShowConfirm(true); setDeleteId(rider.id); }}
                                            className="flex items-center gap-1 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-lightWhite transition"
                                        >
                                            <DeleteIcon fontSize="small" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                    <div className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md">
                        <p>Successfully deleted a rider!</p>
                    </div>
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="mb-4">Are you sure you want to delete this rider?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteRiders}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Riders;