import React from 'react';
// import './NowLoading.css'; // Create a CSS file for styling

const NowLoading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
    );
};

export default NowLoading;