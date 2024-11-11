import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

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
                setUserName(userData.firstName + " " + userData.lastName || "Admin"); 
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

    return (
        <div className="p-8 flex-1">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p className="mb-8">Hi {userName}, welcome back to IKL Admin</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">Customers</h2>
                    <p className="text-3xl font-bold">{numCustomers}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">Orders</h2>
                    <p className="text-3xl font-bold">{numOrders}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">Riders</h2>
                    <p className="text-3xl font-bold">{numRiders}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">Average Reviews</h2>
                    <p className="text-3xl font-bold">{averageReviews}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
