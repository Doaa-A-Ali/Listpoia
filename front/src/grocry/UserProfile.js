import React from 'react';
import Anwar from '../asset/House_Image.jpeg'
const UserProfile = () => {
    const user = {
        profileImage: {Anwar},
        firstName: 'Anwar',
        lastName: 'Ramo',
        email: 'Anwar@example.com',
        phoneNumber: '0932405999',
        gender: 'Male',
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <img
                    src={Anwar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4 object-cover"
                />
                <h2 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600 text-lg">{user.email}</p>
                <p className="text-gray-600 text-lg">{user.phoneNumber}</p>
                <p className="text-gray-600 text-lg">Gender: {user.gender}</p>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;