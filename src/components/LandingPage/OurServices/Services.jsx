import React from 'react';

const serviceItems = [
    { name: 'Food Delivery', price: '₱100 - 150' },
    { name: 'Pamalengke', price: '₱100 - 150' },
    { name: 'Bill Payments', price: '₱100 - 150' },
    { name: 'Hatid Sundo', price: '₱100 - 150' },
    { name: 'Parcel Pickup', price: '₱100 - 150' },
    { name: 'Special Delivery', price: '₱100 - 150' }
];

const Services = () => (
    <section className="bg-white p-8 text-center" id="services">
        <h2 className="text-3xl font-bold mb-6">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceItems.map((service, index) => (
                <div key={index} className="bg-[#226710] text-white p-4 rounded text-center space-y-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <p>{service.price}</p>
                    <button className="bg-white text-[#226710] px-4 py-2 rounded">Avail Now</button>
                </div>
            ))}
        </div>
    </section>
);

export default Services;