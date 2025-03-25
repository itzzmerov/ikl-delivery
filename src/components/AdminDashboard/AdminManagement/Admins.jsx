import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Admins = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const fetchAdmins = async () => {
        const adminsQuery = query(collection(db, "users"), where("userType", "==", "admin"));
        const response = await getDocs(adminsQuery);
        const adminsList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdmins(adminsList);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleUpdateAdmins = (id) => {
        navigate(`/admin/admins/${id}/update-admin`);
    };

    const handleDeleteAdmins = async () => {
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'users', confirmDelete));
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    fetchAdmins();
                }, 2000);
            } catch (error) {
                console.error(error);
            } finally {
                setConfirmDelete(null);
            }
        }
    };

    const openAdminForm = () => {
        navigate("/admin/admins/new-admin")
    }

    return (
        <div className="p-8 flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Administrators List</h1>
                <button onClick={openAdminForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add New Admin</button>
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
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{admin.firstName} {admin.middleName} {admin.lastName}</td>
                                    <td className="py-2 px-4 border-b">{admin.username}</td>
                                    <td className="py-2 px-4 border-b">{admin.email}</td>
                                    <td className="py-2 px-4 border-b">{admin.phoneNumber}</td>
                                    <td className="py-2 px-4 border-b">
                                        {admin.house || "N/A"} {admin.street || "N/A"}, {admin.barangay || "N/A"}, {admin.city || "N/A"} {admin.zip || "N/A"}, {admin.region || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b flex flex-col gap-2">
                                        <button
                                            onClick={() => handleUpdateAdmins(admin.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => setConfirmDelete(admin.id)}
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
            
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="mb-4">Are you sure you want to delete this administrator?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleDeleteAdmins} className="px-4 py-2 bg-red-500 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            
            {showPopup && (
                <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                    <div className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md">
                        <p>Successfully deleted an administrator!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admins;
