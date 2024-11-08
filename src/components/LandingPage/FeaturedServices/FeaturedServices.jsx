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
                zIndex: '50',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, #f9f9f9 50%)',
            }}
        >
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative flex flex-col justify-center items-center text-lightWhite rounded-2xl bg-cover bg-center h-[350px] w-full md:w-[27.5%] cursor-pointer"
                    style={{ backgroundImage: `url(${service.bg})` }}
                    
                >
                    <button onClick={openOrderForm}>
                        <div className="absolute inset-0 bg-darkBlack opacity-50 rounded-2xl"></div>
                        <h2 className="absolute bottom-4 left-4 text-[32px] md:text-[72px] font-semibold z-10">{service.name}</h2>
                    </button>

                    {isOrderFormVisible && (
                        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                            <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl bg-lightWhite p-6 rounded-lg overflow-y-auto h-[90vh] shadow-lg">
                                <button
                                    onClick={closeOrderForm}
                                    className="absolute top-2 right-2 bg-gray-200 text-darkBlack rounded-full p-2"
                                >
                                    <CloseOutlinedIcon />
                                </button>
                                <OrderForm onClose={closeOrderForm} />
                            </div>
                        </div>
                    )}
                    
                </div>
                
            ))}

            
            
        </section>
    );
};

export default FeaturedServices;