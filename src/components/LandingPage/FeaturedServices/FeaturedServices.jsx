import React from 'react';
import FoodDelivery from '../../../images/food-delivery.jpg'
import PeraPadala from '../../../images/pera-padala.jpg'
import HatidSundo from '../../../images/hatid-sundo.jpg'

const services = [
    { name: 'Food Delivery', image: FoodDelivery, bg: FoodDelivery },
    { name: 'Pera Padala', image: PeraPadala, bg: PeraPadala },
    { name: 'Hatid Sundo', image: HatidSundo, bg: HatidSundo }
];

const FeaturedServices = () => {
    return (
        <section className="bg-white p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-center items-center space-y-2 text-white rounded-2xl bg-black bg-cover bg-center h-[350px]"
                    style={{ backgroundImage: `url(${service.bg})` }}
                >
                    <div className='w-full h-full bg-black opacity-50'></div>
                    <h2 className="text-lg font-semibold">{service.name}</h2>
                </div>
            ))}
        </section>
    );
};

export default FeaturedServices;