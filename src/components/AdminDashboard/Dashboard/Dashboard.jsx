import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-8 flex-1 h-screen overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p className="mb-8">Hi User, welcome back to IKL Admin</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill().map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-md h-32"></div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;