import React, { useState, useEffect } from 'react';

const EditGroceryModal = ({ grocery, onUpdateGrocery, onClose }) => {
    const [name, setName] = useState(grocery.name);
    const [quantity, setQuantity] = useState(grocery.quantity);
    const [category, setCategory] = useState(grocery.category);

    useEffect(() => {
        setName(grocery.name);
        setQuantity(grocery.quantity);
        setCategory(grocery.category);
    }, [grocery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateGrocery({ ...grocery, name, quantity, category });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Grocery</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="border rounded p-2 w-full mb-2"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded p-2 w-full mb-4"
                    >
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Meat">Meat</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Update Grocery
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditGroceryModal;