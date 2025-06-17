import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminApproval = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchPendingUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const unapproved = [];
            querySnapshot.forEach(docSnap => {
                const data = docSnap.data();
                if (!data.isApproved && data.userType === 'customer') {
                    unapproved.push({ id: docSnap.id, ...data });
                }
            });
            setUsers(unapproved);
        };
        fetchPendingUsers();
    }, []);

    const approveUser = async (userId) => {
        await updateDoc(doc(db, 'users', userId), {
            isApproved: true
        });
        setUsers(users.filter(user => user.id !== userId));
    };

    const rejectUser = async () => {
        if (!rejectionReason.trim()) return;

        await updateDoc(doc(db, 'users', selectedUserId), {
            isApproved: "rejected",
            rejected: true,
            rejectionMessage: rejectionReason
        });

        window.alert('Rejection successful. The user has been rejected.');

        setUsers(users.filter(user => user.id !== selectedUserId));
        setShowModal(false);
        setRejectionReason('');
        setSelectedUserId(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            {users.length === 0 ? <p>No pending users.</p> : (
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="mb-4 border p-4 rounded-md shadow bg-slate-50">
                            <p className='mb-4'><strong>{user.firstName} {user.lastName}</strong> ({user.email})</p>
                            <p className='mb-4'><strong>Address:</strong> <i>{user.house}, {user.street}, {user.barangay}, {user.city} {user.zip}, {user.region}</i></p>

                            <a href={user.idUrl} target="_blank" rel="noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded">View Uploaded ID</a>
                            <button onClick={() => approveUser(user.id)} className="ml-4 bg-green-600 text-white px-4 py-2 rounded">Approve</button>
                            <button
                                onClick={() => {
                                    setSelectedUserId(user.id);
                                    setShowModal(true);
                                }}
                                className="ml-2 bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-2">Rejection Message</h3>
                        <textarea
                            className="w-full border p-2 rounded mb-4"
                            rows="4"
                            placeholder="Enter reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setRejectionReason('');
                                    setSelectedUserId(null);
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={rejectUser}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApproval;
