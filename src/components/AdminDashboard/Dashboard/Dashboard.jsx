import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { FaUserFriends, FaClipboardList, FaMotorcycle, FaStar } from 'react-icons/fa';

const Dashboard = () => {
    const [numCustomers, setNumCustomers] = useState(0);
    const [numOrders, setNumOrders] = useState(0);
    const [numRiders, setNumRiders] = useState(0);
    const [averageReviews, setAverageReviews] = useState(0);
    const [userName, setUserName] = useState("Admin");

    const fetchUserName = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(`${userData.firstName} ${userData.lastName}` || "Admin");
            }
        }
    };

    const fetchCustomers = async () => {
        const customersQuery = query(collection(db, "users"), where("userType", "==", "customer"));
        const response = await getDocs(customersQuery);
        setNumCustomers(response.docs.length);
    };

    const fetchOrders = async () => {
        const ordersQuery = collection(db, "orders");
        const response = await getDocs(ordersQuery);
        setNumOrders(response.docs.length);
    };

    const fetchRiders = async () => {
        const ridersQuery = query(collection(db, "users"), where("userType", "==", "rider"));
        const response = await getDocs(ridersQuery);
        setNumRiders(response.docs.length);
    };

    const fetchAverageReviews = async () => {
        const reviewsQuery = collection(db, "reviews");
        const response = await getDocs(reviewsQuery);

        let totalRating = 0;
        let reviewCount = 0;

        response.forEach((doc) => {
            const data = doc.data();
            if (data.ratingValue) {
                totalRating += Number(data.ratingValue);
                reviewCount++;
            }
        });

        const average = reviewCount === 0 ? 0 : (totalRating / reviewCount).toFixed(2);
        setAverageReviews(average);
    };

    useEffect(() => {
        fetchUserName();
        fetchCustomers();
        fetchOrders();
        fetchRiders();
        fetchAverageReviews();
    }, []);

    // Define card data
    const cards = [
        { title: 'Customers', value: numCustomers, icon: <FaUserFriends />, bgColor: 'bg-gradient-to-r from-blue-500 to-green-400', textColor: 'text-white' },
        { title: 'Orders', value: numOrders, icon: <FaClipboardList />, bgColor: 'bg-gradient-to-r from-purple-400 to-pink-500', textColor: 'text-white' },
        { title: 'Riders', value: numRiders, icon: <FaMotorcycle />, bgColor: 'bg-gradient-to-r from-orange-500 to-yellow-400', textColor: 'text-white' },
        { title: 'Average Reviews', value: averageReviews, icon: <FaStar />, bgColor: 'bg-gradient-to-r from-indigo-400 to-purple-500', textColor: 'text-white' }
    ];

    return (
        <div className="p-8 flex-1">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p className="mb-8">Hi {userName}, welcome back to IKL Admin</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-6 shadow-lg flex items-center ${card.bgColor} hover:scale-105 transition-transform duration-200`}
                    >
                        <div className={`text-4xl mr-4 ${card.textColor}`}>
                            {card.icon}
                        </div>
                        <div className="flex flex-col">
                            <h2 className={`text-lg font-semibold ${card.textColor}`}>{card.title}</h2>
                            <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
