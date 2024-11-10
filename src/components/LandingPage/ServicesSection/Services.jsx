import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FoodDelivery from '../../../images/food-delivery.jpg';
import PeraPadala from '../../../images/pera-padala.jpg';
import HatidSundo from '../../../images/hatid-sundo.jpg';
import Pamalengke from '../../../images/pamalengke.jpg';
import BillPayment from '../../../images/bill-payment.jpeg';
import ParcelPickup from '../../../images/parcel-pickup.jpg';
import OrderForm from '../../OrderForm/CustomerOrderForm';

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
        <section className=" bg-lightWhite flex items-center justify-center" id="services">
            <div className='flex flex-col justify-center w-full lg:w-[85%] p-8'>
                <h2 className="text-[32px] md:text-[42px] font-Montserrat text-center font-bold mt-20 mb-10">OUR SERVICES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {serviceItems.map((service, index) => (
                        <div
                            key={index}
                            className="relative rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-lg"
                        >
                            <img src={service.image} alt={service.name} className="w-full h-[400px] object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-darkGreen text-lightWhite p-4 flex flex-col items-center space-y-1">
                                <h3 className="font-semibold text-[20px] font-Montserrat">{service.name}</h3>
                                <p className="text-[16px]">{service.price}</p>
                                <button className="border-lightWhite border-2 hover:bg-lightWhite hover:text-darkBlack text-lightWhite px-4 py-1 rounded-lg mt-2" onClick={openOrderForm}>Avail Now</button>

                                {isOrderFormVisible && (
                                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

};

export default Services;
