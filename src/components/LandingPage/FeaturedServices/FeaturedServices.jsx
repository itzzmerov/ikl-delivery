import React, { useState } from 'react';
import FoodDelivery from '../../../images/food-delivery.jpg';
import PeraPadala from '../../../images/pera-padala.jpg';
import HatidSundo from '../../../images/hatid-sundo.jpg';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OrderForm from '../../OrderForm/OrderForm';

const services = [
    { name: 'Food Delivery', image: FoodDelivery, bg: FoodDelivery },
    { name: 'Pera Padala', image: PeraPadala, bg: PeraPadala },
    { name: 'Hatid Sundo', image: HatidSundo, bg: HatidSundo }
];

const FeaturedServices = () => {

    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);

    const openOrderForm = () => {
        setIsOrderFormVisible(true);
    };

    const closeOrderForm = () => {
        setIsOrderFormVisible(false);
    };

    return (
        <section
            className="relative p-8 flex flex-wrap justify-center gap-5"
            style={{
                marginTop: '-200px',
                zIndex: '10',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, #ffffff 50%)',
            }}
        >
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative flex flex-col justify-center items-center text-white rounded-2xl bg-cover bg-center h-[350px] w-full md:w-[27.5%] cursor-pointer"
                    style={{ backgroundImage: `url(${service.bg})` }}
                    onClick={openOrderForm}
                >
                    <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                    <h2 className="absolute bottom-4 left-4 text-[32px] md:text-[72px] font-semibold z-10">{service.name}</h2>
                </div>
            ))}

            {isOrderFormVisible && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl bg-white p-6 rounded-lg overflow-y-auto h-[90vh] shadow-lg">
                        {/* Close Button */}
                        <button
                            onClick={closeOrderForm}
                            className="absolute top-2 right-2 bg-gray-200 text-black rounded-full p-2"
                        >
                            <CloseOutlinedIcon />
                        </button>
                        {/* Order Form */}
                        <OrderForm onClose={closeOrderForm} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default FeaturedServices;
