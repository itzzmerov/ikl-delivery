import React from 'react';

const services = [
    { name: 'FOOD DELIVERY', image: 'https://via.placeholder.com/150' },
    { name: 'PERA PADALA', image: 'https://via.placeholder.com/150' },
    { name: 'HATID SUNDO', image: 'https://via.placeholder.com/150' },
];

const FeaturedServices = () => {
    return (
        <section id="services" className="bg-white p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                    {/* <img src={service.image} alt={service.name} className="w-full h-full object-cover opacity-80" /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h3 className="text-white font-bold text-xl">{service.name}</h3>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default FeaturedServices;