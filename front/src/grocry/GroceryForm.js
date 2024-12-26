// import React, { useState, useEffect } from 'react';

// const GroceryForm = ({ grocery, closeModal, updateGrocery, addGrocery }) => {
//     const [name, setName] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [category, setCategory] = useState('');

//     useEffect(() => {
//         if (grocery) {
//             setName(grocery.name);
//             setQuantity(grocery.quantity);
//             setCategory(grocery.category);
//         } else {
//             setName('');
//             setQuantity('');
//             setCategory('');
//         }
//     }, [grocery]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const item = { name, quantity, category };
//         if (grocery) {
//             updateGrocery(grocery._id, item);
//         } else {
//             addGrocery(item);
//         }
//         closeModal(); // Close the modal after submission
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-40">
//             <form className="bg-white rounded shadow-lg p-6 w-1/3 z-50" onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-bold mb-4 z-40">{grocery ? 'Edit Item' : 'Add Item'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Item Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="border rounded p-2 mb-4 w-full"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Quantity"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     required
//                     className="border rounded p-2 mb-4 w-full"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                     className="border rounded p-2 mb-4 w-full"
//                 />
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
//                     {grocery ? 'Update Item' : 'Add Item'}
//                 </button>
//                 <button
//                     type="button"
//                     onClick={closeModal}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full mt-2"
//                 >
//                     Cancel
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default GroceryForm;
// import React, { useState } from 'react';

// const GroceryForm = ({ categories, onAddGrocery, onClose }) => {
//     const [name, setName] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [category, setCategory] = useState(categories[0]); // Default to the first category
//     const [expirationDate, setExpirationDate] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newGrocery = {
//             name,
//             quantity,
//             category,
//             expirationDate,
//         };
//         onAddGrocery(newGrocery);
//         setName('');
//         setQuantity(1);
//         setCategory(categories[0]); // Reset to the first category
//         setExpirationDate('');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Add Grocery Item</h2>
//             <div>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="border rounded p-2 w-full"
//                 />
//             </div>
//             <div>
//                 <label>Quantity:</label>
//                 <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(Number(e.target.value))}
//                     min="1"
//                     required
//                     className="border rounded p-2 w-full"
//                 />
//             </div>
//             <div>
//                 <label>Category:</label>
//                 <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="border rounded p-2 w-full"
//                 >
//                     {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label>Expiration Date:</label>
//                 <input
//                     type="date"
//                     value={expirationDate}
//                     onChange={(e) => setExpirationDate(e.target.value)}
//                     className="border rounded p-2 w-full"
//                 />
//             </div>
//             <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
//                 Add Item
//             </button>
//             <button
//                 type="button"
//                 onClick={onClose}
//                 className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//             >
//                 Cancel
//             </button>
//         </form>
//     );
// };

// export default GroceryForm;
import React, { useState } from 'react';

const GroceryForm = ({ categories, onAddGrocery, onClose }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [buyDate, setBuyDate] = useState(''); // Use buyDate

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGrocery({ name, quantity, category, buyDate }); // Send buyDate
        setName('');
        setQuantity('');
        setBuyDate('');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Grocery Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded p-2 w-full mb-2 outline-orange-500"
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="border rounded p-2 w-full mb-2 outline-orange-500"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded p-2 w-full mb-2 outline-orange-500"
            >
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
            <input
                type="date"
                placeholder="When to Buy"
                value={buyDate}
                onChange={(e) => setBuyDate(e.target.value)} // Capture buyDate
                required
                className="border rounded p-2 w-full mb-2 outline-orange-500"
            />
            <button type="submit" className="bg-green-500 hover:bg-orange-500 text-white px-4 py-2 rounded hover:drop-shadow-lg">
                Add Grocery
            </button>
        </form>
    );
};

export default GroceryForm;