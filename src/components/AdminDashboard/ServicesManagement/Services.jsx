import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const fetchServices = async () => {
        const response = await getDocs(collection(db, "services"));
        const servicesList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesList);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleUpdateServices = (id) => {
        navigate(`/admin/services/${id}/update-services`);
    };

    const handleDeleteServices = async () => {
        if (!serviceToDelete) return;

        try {
            await deleteDoc(doc(db, 'services', serviceToDelete));
            setShowPopup(true);
            setShowConfirm(false);

            setTimeout(() => {
                setShowPopup(false);
                fetchServices();
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const openServiceForm = () => {
        navigate("/admin/services/new-service");
    };

    return (
        <div className="p-8 h-[89vh] flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Services List</h1>
                <button onClick={openServiceForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'>
                    <AddIcon /> Add New Service
                </button>
            </div>

            {/* Scrollable container */}
            <div className="min-w-full h-[90%] overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Delivery Fee</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{service.name}</td>
                                    <td className="py-2 px-4 border-b">{service.description}</td>
                                    <td className="py-2 px-4 border-b">{service.basePrice}</td>
                                    <td className="py-2 px-4 border-b">
                                        {service.created_at ? new Date(service.created_at).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric"
                                        }) : "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b flex gap-2">
                                        <button
                                            onClick={() => handleUpdateServices(service.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-lightWhite transition"
                                        >
                                            <EditIcon fontSize="small" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setServiceToDelete(service.id);
                                                setShowConfirm(true);
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

            {/* Delete confirmation popup */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this?</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                            >
                                No
                            </button>
                            <button 
                                onClick={handleDeleteServices}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                    <div className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md">
                        <p>Successfully deleted a service!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
