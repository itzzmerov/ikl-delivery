import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Customers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const fetchCustomers = async () => {
        const customersQuery = query(collection(db, "users"), where("userType", "==", "customer"));
        const response = await getDocs(customersQuery);
        const customersList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(customersList);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleUpdateCustomers = (id) => {
        navigate(`/admin/customers/${id}/update-customer`);
    };

    const handleDeleteCustomers = async () => {
        try {
            await deleteDoc(doc(db, 'users', deleteId));
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                fetchCustomers();
            }, 2000);
        } catch (error) {
            console.error("Error deleting customer:", error);
        } finally {
            setIsConfirmModalOpen(false);
        }
    };

    const openCustomerForm = () => {
        navigate("/admin/customers/new-customer")
    }

    return (
        <div className="p-8 h-[100vh] flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Customers List</h1>
                <button onClick={openCustomerForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add New Customer</button>
            </div>

            <div className="min-w-full h-[80%] overflow-x-auto overflow-y-auto">
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
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-4 text-center">No data found</td>
                            </tr>
                        ) : (
                            customers.map((customer) => (
                                <tr key={customer.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{customer.firstName} {customer.middleName} {customer.lastName}</td>
                                    <td className="py-2 px-4 border-b">{customer.username}</td>
                                    <td className="py-2 px-4 border-b">{customer.email}</td>
                                    <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
                                    <td className="py-2 px-4 border-b">
                                        {customer.house || "N/A"} {customer.street || "N/A"}, {customer.barangay || "N/A"}, {customer.city || "N/A"} {customer.zip || "N/A"}, {customer.region || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b flex flex-col gap-2">
                                        <button
                                            onClick={() => handleUpdateCustomers(customer.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDeleteId(customer.id);
                                                setIsConfirmModalOpen(true);
                                            }}
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

            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this customer?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteCustomers}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsConfirmModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                    <div className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md">
                        <p>Successfully deleted a customer!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customers;
