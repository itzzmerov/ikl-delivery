import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminApproval = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            {users.length === 0 ? <p>No pending users.</p> : (
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="mb-4 border p-4 rounded-md shadow">
                            <p><strong>{user.firstName} {user.lastName}</strong> ({user.email})</p>
                            <a href={user.idUrl} target="_blank" rel="noreferrer" className="text-blue-500">View Uploaded ID</a>
                            <button onClick={() => approveUser(user.id)} className="ml-4 bg-green-600 text-white px-4 py-2 rounded">Approve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminApproval;
