import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 

const Riders = () => {
    const navigate = useNavigate();
    const [riders, setRiders] = useState([]);

    const fetchRiders = async () => {
        const response = await getDocs(collection(db, "users"));
        const ridersList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRiders(ridersList);
    };

    useEffect(() => {
        fetchRiders();
    }, []);

    const handleUpdateRiders = (id) => {
        navigate(`/admin/riders/${id}/update-rider`);
    };

    const handleDeleteRiders = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            fetchRiders();
        } catch (error) {
            console.error(error);
        }
    };

    const openRiderForm = () => {
        navigate("/admin/riders/new-rider")
    }

    return (
        <div className="p-8 flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Riders List</h1>
                <button onClick={openRiderForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add New Rider</button>
            </div>

            <div className="min-w-full h-96 overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
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
                                <td colSpan="4" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            riders.map((rider) => (
                                <tr key={rider.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{rider.firstName} {rider.middleName} {rider.lastName}</td>
                                    <td className="py-2 px-4 border-b">{rider.username}</td>
                                    <td className="py-2 px-4 border-b">{rider.email}</td>
                                    <td className="py-2 px-4 border-b">{rider.phoneNumber}</td>
                                    <td className="py-2 px-4 border-b">
                                        {rider.address?.house || "N/A"} {rider.address?.street || "N/A"}, {rider.address?.barangay || "N/A"}, {rider.address?.city || "N/A"} {rider.address?.zip || "N/A"}, {rider.address?.region || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b flex gap-2">
                                        <button
                                            onClick={() => handleUpdateRiders(rider.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRiders(rider.id)}
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
        </div>
    )
}

export default Riders