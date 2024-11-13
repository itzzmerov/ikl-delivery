import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import FoodDelivery from '../../../images/food-delivery.jpg';
import PeraPadala from '../../../images/pera-padala.jpg';
import HatidSundo from '../../../images/hatid-sundo.jpg';
import Pamalengke from '../../../images/pamalengke.jpg';
import BillPayment from '../../../images/bill-payment.jpeg';
import ParcelPickup from '../../../images/parcel-pickup.jpg';
import FoodDeliveryForm from '../OrderForms/FoodDelivery';
import PeraPadalaForm from '../OrderForms/PeraPadala';
import HatidSundoForm from '../OrderForms/HatidSundo';
import PamalengkeForm from '../OrderForms/Pamalengke';
import BillPaymentForm from '../OrderForms/BillPayments';
import ParcelPickupForm from '../OrderForms/ParcelPickup';
import SpecialDelivery from '../OrderForms/SpecialDelivery';

const localImages = {
    'Food Delivery': FoodDelivery,
    'Pera Padala': PeraPadala,
    'Hatid Sundo': HatidSundo,
    'Pamalengke': Pamalengke,
    'Bill Payments': BillPayment,
    'Parcel Pickup': ParcelPickup,
};

const Services = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [serviceItemsWithPrice, setServiceItemsWithPrice] = useState([]);

    const generateDummyPrice = () => {
        const minPrice = 100;
        const maxPrice = 150;
        return `₱${Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice} - ₱${Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice}`;
    };

    const fetchServices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'services'));
            const fetchedServices = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));

            const servicesWithImagesAndPrices = fetchedServices.map((service) => ({
                name: service.name,
                image: localImages[service.name] || FoodDelivery,
                price: generateDummyPrice(),
            }));

            setServiceItemsWithPrice(servicesWithImagesAndPrices);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openOrderForm = (serviceName) => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setSelectedService(serviceName);
        setIsOrderFormVisible(true);
    };

    const closeOrderForm = () => {
        setIsOrderFormVisible(false);
        setSelectedService('');
    };

    const renderForm = () => {
        switch (selectedService) {
            case 'Food Delivery':
                return <FoodDeliveryForm onClose={closeOrderForm} />;
            case 'Pera Padala':
                return <PeraPadalaForm onClose={closeOrderForm} />;
            case 'Hatid Sundo':
                return <HatidSundoForm onClose={closeOrderForm} />;
            case 'Pamalengke':
                return <PamalengkeForm onClose={closeOrderForm} />;
            case 'Bill Payments':
                return <BillPaymentForm onClose={closeOrderForm} />;
            case 'Parcel Pickup':
                return <ParcelPickupForm onClose={closeOrderForm} />;
            case 'Special Delivery':
                return <SpecialDelivery onClose={closeOrderForm} />;
            default:
                return null;
        }
    };

    return (
        <section className="bg-lightWhite flex items-center justify-center" id="services">
            <div className='flex flex-col justify-center w-full lg:w-[85%] p-8'>
                <h2 className="text-[32px] md:text-[42px] font-Montserrat text-center font-bold mt-20 mb-10">OUR SERVICES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {serviceItemsWithPrice.map((service, index) => (
                        <div
                            key={index}
                            className="relative rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-lg"
                        >
                            <img src={service.image} alt={service.name} className="w-full h-[400px] object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-darkGreen text-lightWhite p-4 flex flex-col items-center space-y-1">
                                <h3 className="font-semibold text-[20px] font-Montserrat">{service.name}</h3>
                                <p className="text-[16px]">{service.price}</p>
                                <button
                                    className="border-lightWhite border-2 hover:bg-lightWhite hover:text-darkBlack text-lightWhite px-4 py-1 rounded-lg mt-2"
                                    onClick={() => openOrderForm(service.name)}
                                >
                                    {currentUser ? 'Avail Now' : 'Login to Avail'}
                                </button>

                                {isOrderFormVisible && (
                                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl bg-lightWhite p-6 rounded-lg overflow-y-auto h-[90vh] shadow-lg">
                                            <button
                                                onClick={closeOrderForm}
                                                className="absolute top-2 right-2 bg-gray-200 text-darkBlack rounded-full p-2"
                                            >
                                                <CloseOutlinedIcon />
                                            </button>
                                            {renderForm()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
