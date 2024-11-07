import React from 'react';
import ImageSample from '../../../images/logo.png'

const services = [
    { name: 'Food Delivery', image: ImageSample },
    { name: 'Pera Padala', image: ImageSample },
    { name: 'Hatid Sundo', image: ImageSample }
  ];

const FeaturedServices = () => {
    return (
        <section className="bg-white p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service, index) => (
                <div key={index} className="flex flex-col justify-center items-center space-y-2">
                    <img src={service.image} alt={service.name} className="w-[200px]" />
                    <h2 className="text-lg font-semibold">{service.name}</h2>
                </div>
            ))}
        </section>
    );
};

export default FeaturedServices;