import React from 'react';
import FoodDelivery from '../../../images/food-delivery.jpg';
import PeraPadala from '../../../images/pera-padala.jpg';
import HatidSundo from '../../../images/hatid-sundo.jpg';

const services = [
    { name: 'Food Delivery', image: FoodDelivery, bg: FoodDelivery },
    { name: 'Pera Padala', image: PeraPadala, bg: PeraPadala },
    { name: 'Hatid Sundo', image: HatidSundo, bg: HatidSundo }
];

const FeaturedServices = () => {
    return (
        <section
            className="relative p-8 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl"
            style={{ marginTop: '-200px', zIndex: '10' }}
        >
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative flex flex-col justify-center items-center text-white rounded-2xl bg-cover bg-center h-[350px]"
                    style={{ backgroundImage: `url(${service.bg})` }}
                >
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

                    {/* Service name overlayed on top */}
                    <h2 className="relative text-[32px] font-semibold z-10 p-4">{service.name}</h2>
                </div>
            ))}
        </section>
    );
};

export default FeaturedServices;
