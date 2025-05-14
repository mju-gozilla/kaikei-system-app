import React, { useState } from 'react';

interface PasscodeProps {
    onUnlock: () => void;
}

const Passcode: React.FC<PasscodeProps> = ({ onUnlock }) => {
    const [passcode, setPasscode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasscode(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPasscode = import.meta.env.VITE_APP_PASSCODE;
        if (passcode === correctPasscode) {
            onUnlock();
            // Perform any additional actions here, like redirecting or closing the modal
        } else {
            setPasscode('');
            alert('パスコードが間違っています。');
        }
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">パスコードを入力</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="tel"
                        value={passcode}
                        onChange={handleChange}
                        maxLength={4}
                        placeholder="Enter passcode"
                        className="p-2 text-lg text-center border border-gray-300 rounded mb-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        ロック解除
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Passcode;
