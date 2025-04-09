import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import { auth, db } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ toggleSidebar }) => {
    const { currentUser } = useAuth();
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
    const navigate = useNavigate();
    const accountMenuRef = useRef(null);
    const notificationsRef = useRef(null);

    useEffect(() => {
        const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), limit(20));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const handleAccountClick = () => {
        setIsAccountMenuVisible(!isAccountMenuVisible);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleBellClick = () => {
        setIsNotificationsVisible(!isNotificationsVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                accountMenuRef.current && !accountMenuRef.current.contains(event.target) &&
                notificationsRef.current && !notificationsRef.current.contains(event.target)
            ) {
                setIsAccountMenuVisible(false);
                setIsNotificationsVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full flex items-center justify-between bg-lightWhite p-4 shadow">
            <div className="flex items-center w-full max-w-xl">
                <button
                    onClick={toggleSidebar}
                    className="mr-4 p-2 text-2xl focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    <FaBars />
                </button>
            </div>
            <div className="flex items-center gap-4 relative">
                <div className="relative">
                    <FaBell className="w-8 h-8 text-black cursor-pointer" onClick={handleBellClick} />
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </div>
                {isNotificationsVisible && (
                    <div ref={notificationsRef} className="absolute right-10 top-12 w-64 bg-white shadow-lg rounded-md border p-2 z-50">
                        <ul className="text-sm text-gray-700 max-h-60 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <li className="px-4 py-2 text-gray-500">No new notifications</li>
                            ) : (
                                notifications.map((notif) => (
                                    <li key={notif.id} className="px-4 py-2 hover:bg-gray-100 border-b">
                                        {notif.message}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
                <div className="relative">
                    <FaUserCircle
                        size={35}
                        className="cursor-pointer"
                        onClick={handleAccountClick}
                        aria-label="User Account"
                    />
                    {isAccountMenuVisible && (
                        <div
                            ref={accountMenuRef}
                            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border"
                        >
                            <ul className="text-sm text-gray-700">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;
