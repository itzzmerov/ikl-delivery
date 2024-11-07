import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FoodDelivery from '../../../images/food-delivery.jpg';
import PeraPadala from '../../../images/pera-padala.jpg';
import HatidSundo from '../../../images/hatid-sundo.jpg';
import Pamalengke from '../../../images/pamalengke.jpg';
import BillPayment from '../../../images/bill-payment.jpeg';
import ParcelPickup from '../../../images/parcel-pickup.jpg';
import OrderForm from '../../OrderForm/OrderForm';

const serviceItems = [
    { name: 'Food Delivery', price: '₱100 - 150', image: FoodDelivery },
    { name: 'Pera Padala', price: '₱100 - 150', image: PeraPadala },
    { name: 'Hatid Sundo', price: '₱100 - 150', image: HatidSundo },
    { name: 'Pamalengke', price: '₱100 - 150', image: Pamalengke },
    { name: 'Bill Payments', price: '₱100 - 150', image: BillPayment },
    { name: 'Parcel Pickup', price: '₱100 - 150', image: ParcelPickup },
];

const Services = () => {
    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false)

    const openOrderForm = () => {
        setIsOrderFormVisible(true);
    };

    const closeOrderForm = () => {
        setIsOrderFormVisible(false);
    };

    return (
        <section className=" bg-white flex items-center justify-center" id="services">
            <div className='flex flex-col justify-center w-[85%] p-8'>
                <h2 className="text-[48px] font-Montserrat text-center font-bold mt-20 mb-10">OUR SERVICES</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {serviceItems.map((service, index) => (
                        <div
                            key={index}
                            className="relative rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-lg"
                        >
                            <img src={service.image} alt={service.name} className="w-full h-[400px] object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-[#226710] text-white p-4 flex flex-col items-center space-y-1">
                                <h3 className="font-semibold text-[20px] font-Montserrat">{service.name}</h3>
                                <p className="text-[16px]">{service.price}</p>
                                <button className="border-white border-2 hover:bg-white hover:text-black text-white px-4 py-1 rounded-lg mt-2" onClick={openOrderForm}>Avail Now</button>

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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

};

export default Services;
