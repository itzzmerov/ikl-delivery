import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const FoodDelivery = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [basePrice, setBasePrice] = useState(0);
    const [storeMenu, setStoreMenu] = useState({
        "Jollibee": [
            { name: "Crunchy Chicken Sandwich", price: 69 },
            { name: "Crunchy Chicken Sandwich w/ Drink", price: 109 },
            { name: "Jolly Hotdog & Pies", price: 61 },
            { name: "2-pc Burger Steak Solo", price: 138 },
            { name: "Chicken Nuggets (6pcs)", price: 120 }
        ],
        "McDonald's": [
            { name: "Sulit Busog 1-pc Mushroom Pepper Steak w/ drink", price: 119 },
            { name: "1-pc Chicken Mcdo w/ Fries Small", price: 164 },
            { name: "Medium Fries", price: 89 },
            { name: "1-pc Chicken Mcdo Solo", price: 92 },
            { name: "2-pc Hotcakes Solo", price: 86 }
        ],
        "Alberto's": [
            { name: "Meaty Royale", price: 249 },
            { name: "Loaded Hawaiian", price: 264 },
            { name: "Aloha", price: 216 },
            { name: "Bacon Mushroom", price: 234 },
            { name: "Creamy Cheese", price: 162 }
        ],
        "Shan and Hazel’s": [
            { name: "Lomi", price: 150 },
            { name: "Battered Chicken", price: 260 },
            { name: "Chopsuey", price: 235 },
            { name: "Shan’s Halo-Halo", price: 85 },
            { name: "Garlic Chicken", price: 275 }
        ], 
        "Kenoks": [
            { name: "Beef Steak", price: 220 },
            { name: "Beef Caldereta", price: 220 },
            { name: "Beef Kare-Kare", price: 220 },
            { name: "Pinakbet", price: 170 },
            { name: "Lechon Manok", price: 200 }
        ]
    });

    const [formData, setFormData] = useState({
        service: 'Food Delivery',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        storePreference: '',
        customerAddress: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            customerFirstName: userData.firstName || '',
                            customerLastName: userData.lastName || '',
                            phoneNumber: userData.phoneNumber || '',
                            customerAddress: `${userData.house || ''}, ${userData.street || ''}, ${userData.barangay || ''}, ${userData.city || ''}, ${userData.region || ''}, ${userData.zip || ''}`
                        }));
                    } else {
                        console.error('No user data found!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };

        const fetchDeliveryFee = async () => {
            try {
                const servicesQuery = query(
                    collection(db, 'services'),
                    where('name', '==', 'Food Delivery')
                );
                const querySnapshot = await getDocs(servicesQuery);
                if (!querySnapshot.empty) {
                    const serviceData = querySnapshot.docs[0].data();
                    setBasePrice(serviceData.basePrice);
                }
            } catch (error) {
                console.error('Error fetching delivery fee:', error);
            }
        };

        fetchUserData();
        fetchDeliveryFee();
    }, [currentUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "storePreference") {
            setMenu(storeMenu[value] || []);
            setCart([]);
        }
    };

    const handleAddToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.name === item.name
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (item, quantity) => {
        setCart(cart.map(cartItem =>
            cartItem.name === item.name
                ? { ...cartItem, quantity: Math.max(1, quantity) }
                : cartItem
        ));
    };

    const calculateTotal = () => {
        const itemsTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return itemsTotal + Number(basePrice);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User not logged in');
            return;
        }

        try {
            const totalPrice = calculateTotal();

            const deliveryData = {
                ...formData,
                userId: currentUser.uid,
                itemsToBuy: cart,
                itemsSubtotal: totalPrice - basePrice,
                basePrice,
                totalPrice: totalPrice,
                createdAt: new Date().toISOString(),
            };

            const result = await addDoc(collection(db, 'orders'), deliveryData);
            console.log('Food Delivery request created with ID:', result.id);

            const notificationMessage = `${formData.customerFirstName} ${formData.customerLastName} has placed a new ${formData.service} order.`;
            await addDoc(collection(db, 'notifications'), {
                message: notificationMessage,
                timestamp: new Date(),
                isread_customer: "unread",
                isread_admin: "unread",
                isread_rider: "unread",
                userId: currentUser.uid,
            });

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);

        } catch (error) {
            console.error('Error adding Food Delivery request:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Food Delivery</h1>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Customer Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label htmlFor="customerFirstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="customerFirstName"
                                className="border p-2 w-full rounded"
                                required
                                name='customerFirstName'
                                value={formData.customerFirstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="customerLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="customerLastName"
                                className="border p-2 w-full rounded"
                                required
                                name='customerLastName'
                                value={formData.customerLastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="border p-2 w-full rounded"
                            required
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="customerAddress" className="block mb-1">Customer Address:</label>
                        <input
                            type="text"
                            id="customerAddress"
                            className="border p-2 w-full rounded"
                            required
                            name='customerAddress'
                            value={formData.customerAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Food Delivery Details:</h2>
                    <div className="mb-4">
                        <label htmlFor="storePreference" className="block mb-1">Store Preference:</label>
                        <select
                            id="storePreference"
                            name="storePreference"
                            className="border p-2 w-full rounded"
                            value={formData.storePreference}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Store</option>
                            {Object.keys(storeMenu).map(store => (
                                <option key={store} value={store}>{store}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {menu.map((item, index) => (
                            <div key={index} className="border p-4 rounded shadow">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm">Price: ₱{item.price}</p>
                                <button
                                    className="bg-darkGreen text-lightWhite mt-2 py-1 px-3 rounded"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="font-semibold mb-2">Your Cart:</h2>
                        {cart.length === 0 ? (
                            <p>No items in cart.</p>
                        ) : (
                            <>
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-2">
                                        <p>{item.name} - ₱{item.price} x {item.quantity}</p>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                            className="w-16 border p-1 rounded"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-between mt-4 font-semibold">
                                    <p>Delivery Fee:</p>
                                    <p>₱{basePrice}</p>
                                </div>
                                <div className="flex justify-between mt-4 font-semibold">
                                    <p>Total:</p>
                                    <p>₱{calculateTotal()}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    onClick={handleSubmit}
                >
                    Submit Delivery Request
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-darkGreen text-white py-3 px-6 rounded-lg shadow-md">
                            <p>Order added successfully! Please wait for confirmation.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodDelivery;
