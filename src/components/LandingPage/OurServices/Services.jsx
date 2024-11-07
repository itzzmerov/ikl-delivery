import React from 'react';
import ImageSample from '../../../images/logo.png'

const serviceItems = [
    { name: 'Food Delivery', price: '₱100 - 150', image: ImageSample },
    { name: 'Pamalengke', price: '₱100 - 150', image: ImageSample },
    { name: 'Bill Payments', price: '₱100 - 150', image: ImageSample },
    { name: 'Hatid Sundo', price: '₱100 - 150', image: ImageSample },
    { name: 'Parcel Pickup', price: '₱100 - 150', image: ImageSample },
    { name: 'Special Delivery', price: '₱100 - 150', image: ImageSample }
];

const Services = () => (
    <section className="bg-white p-8 text-center" id="services">
        <h2 className="text-3xl font-bold mb-6">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceItems.map((service, index) => (
                <div key={index} className="bg-[#226710] text-white p-4 rounded flex flex-col items-center justify-center space-y-2">
                    <img src={service.image} alt={service.name} className="w-[200px]" />
                    <h3 className="font-semibold">{service.name}</h3>
                    <p>{service.price}</p>
                    <button className="bg-white text-[#226710] px-4 py-2 rounded">Avail Now</button>
                </div>
            ))}
        </div>
    </section>
);

export default Services;