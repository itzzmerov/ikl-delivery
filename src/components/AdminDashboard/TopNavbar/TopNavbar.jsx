import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import { auth, db } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ toggleSidebar }) => {
    const { currentUser } = useAuth();
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const accountMenuRef = useRef(null);
    const notificationRef = useRef(null);

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

    useEffect(() => {
        if (currentUser) {
            const q = query(collection(db, 'orders'), where('status', '==', 'Completed'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newNotifications = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNotifications(newNotifications);
                setUnreadCount(newNotifications.length);
            });

            return () => unsubscribe();
        }
    }, [currentUser]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(event.target) &&
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsAccountMenuVisible(false);
                setNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen);

        if (!notificationOpen) {
            setUnreadCount(0);
        }
    };

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
            <div className="flex items-center gap-4">
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={toggleNotification}
                        className="relative"
                        aria-label="View Notifications"
                    >
                        <FaBell className="w-8 h-8 text-black cursor-pointer" />
                        {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {unreadCount}
                            </div>
                        )}
                    </button>
                    {notificationOpen && (
                        <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-80 max-h-96 z-50 overflow-y-auto">
                            <h3 className="p-4 border-b font-semibold">Notifications</h3>
                            <ul>
                                {notifications.length > 0 ? (
                                    notifications
                                        .slice()
                                        .sort((a, b) =>
                                            new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
                                        )
                                        .map((notif) => (
                                            <li
                                                key={notif.id}
                                                className="p-4 hover:bg-gray-100 border-b"
                                            >
                                                <span>
                                                    The "{notif.service}" order of {notif.customerLastName} was completed by{' '}
                                                    {notif.riderName}.
                                                </span>
                                            </li>
                                        ))
                                ) : (
                                    <li className="p-4 text-center text-gray-500">
                                        No new notifications
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
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
