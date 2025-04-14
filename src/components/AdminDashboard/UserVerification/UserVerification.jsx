import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const UserVerification = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [verifyingUserId, setVerifyingUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch unverified users
  const fetchUnverifiedUsers = async () => {
    const q = query(collection(db, 'users'), where('isVerified', '==', false));
    const snapshot = await getDocs(q);
    const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUnverifiedUsers(usersList);
  };

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  const handleVerifyUser = async (id) => {
    setVerifyingUserId(id);
    try {
      await updateDoc(doc(db, 'users', id), { isVerified: true });
      setSuccessMessage('User has been verified successfully.');
      fetchUnverifiedUsers();
    } catch (error) {
      console.error('Error verifying user:', error);
    } finally {
      setVerifyingUserId(null);
      setTimeout(() => setSuccessMessage(''), 2000);
    }
  };

  return (
    <div className="p-8 h-[89vh] flex-1">
      <h1 className="text-2xl font-semibold mb-4">User Verification</h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <div className="overflow-x-auto h-[90%]">
        <table className="min-w-full bg-lightWhite border border-gray-200">
          <thead className="bg-gray-800 text-lightWhite sticky top-0">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Username</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unverifiedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">No unverified users found.</td>
              </tr>
            ) : (
              unverifiedUsers.map(user => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.firstName} {user.middleName} {user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      onClick={() => window.open(user.validIDURL, '_blank')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      View ID
                    </button>
                    <button
                      onClick={() => handleVerifyUser(user.id)}
                      className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ${verifyingUserId === user.id && 'opacity-50 pointer-events-none'}`}
                    >
                      {verifyingUserId === user.id ? 'Verifying...' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserVerification;
