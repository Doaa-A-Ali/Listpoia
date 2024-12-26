// import React, { useEffect, useState } from 'react';
// import GroceryForm from './GroceryForm';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'];

// const GroceryList = ({ groceries = [], updateGrocery, deleteGrocery, addGrocery }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//     const [currentGrocery, setCurrentGrocery] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [quantityRange, setQuantityRange] = useState([0, 100]);
//     const [history, setHistory] = useState([]);

//     // Load history from local storage on component mount
//     useEffect(() => {
//         const savedHistory = JSON.parse(localStorage.getItem('groceryHistory'));
//         if (savedHistory) {
//             setHistory(savedHistory);
//         }
//     }, []);

//     const logHistory = (action, grocery) => {
//         if (!grocery) return; // Prevent logging if grocery is undefined
//         const newEntry = { action, grocery, date: new Date() };
//         const updatedHistory = [...history, newEntry];
//         setHistory(updatedHistory);
//         localStorage.setItem('groceryHistory', JSON.stringify(updatedHistory)); // Save to local storage
//     };

//     const handleAddGrocery = async (newItem) => {
//         try {
//             await addGrocery(newItem);
//             logHistory('Added', newItem);
//             toast.success('Grocery item added successfully!');
//             setIsModalOpen(false); // Close modal after adding
//         } catch (error) {
//             toast.error('Failed to add grocery item.');
//         }
//     };

//     const handleUpdateGrocery = async (id, updatedItem) => {
//         try {
//             await updateGrocery(id, updatedItem);
//             logHistory('Updated', updatedItem);
//             toast.success('Grocery item updated successfully!');
//             setIsModalOpen(false); // Close modal after updating
//         } catch (error) {
//             toast.error('Failed to update grocery item.');
//         }
//     };

//     const handleDeleteGrocery = async (id) => {
//         const groceryToDelete = groceries.find(grocery => grocery._id === id);
//         if (!groceryToDelete) return;

//         try {
//             await deleteGrocery(id);
//             logHistory('Deleted', groceryToDelete);
//             toast.success('Grocery item deleted successfully!');
//         } catch (error) {
//             toast.error('Failed to delete grocery item.');
//         }
//     };

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredGroceries = groceries.filter(grocery => {
//         const inName = grocery.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const inCategory = categoryFilter ? grocery.category === categoryFilter : true;
//         const inQuantity = grocery.quantity >= quantityRange[0] && grocery.quantity <= quantityRange[1];
//         return inName && inCategory && inQuantity;
//     });

//     return (
//         <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//             <ToastContainer />
//             <h1 className="text-5xl font-bold text-center mb-6 text-green-700">Grocery List</h1>

//             <div className="flex flex-col md:flex-row mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />

//                 <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded">
//                     <option value="">All Categories</option>
//                     {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>

//                 <input
//                     type="number"
//                     placeholder="Min Quantity"
//                     value={quantityRange[0]}
//                     onChange={(e) => setQuantityRange([Number(e.target.value), quantityRange[1]])}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max Quantity"
//                     value={quantityRange[1]}
//                     onChange={(e) => {
//                         const newMax = Number(e.target.value);
//                         if (newMax >= quantityRange[0]) {
//                             setQuantityRange([quantityRange[0], newMax]);
//                         }
//                     }}
//                     className="mb-4 md:mb-0 p-3 border border-gray-300 rounded"
//                 />
//             </div>

//             <button
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all mb-6 relative z-10"
//                 onClick={() => {
//                     setCurrentGrocery(null);
//                     setIsModalOpen(true);
//                 }}
//             >
//                 + Add Grocery Item
//             </button>

//             {isModalOpen && (
//                 <GroceryForm
//                     grocery={currentGrocery}
//                     closeModal={() => setIsModalOpen(false)}
//                     updateGrocery={handleUpdateGrocery}
//                     addGrocery={handleAddGrocery}
//                     categories={categories} // Pass categories to GroceryForm
//                 />
//             )}

//             <button 
//                 onClick={() => setIsHistoryOpen(true)} 
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded mb-4">
//                 View History
//             </button>

//             {/* History Modal */}
//             {isHistoryOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
//                         <h2 className="text-xl font-bold mb-4">Action History</h2>
//                         <button 
//                             onClick={() => setIsHistoryOpen(false)} 
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                         >
//                             &times; {/* Close icon */}
//                         </button>
//                         <div className="max-h-60 overflow-y-auto">
//                             {history.map((entry, index) => (
//                                 <div key={index} className="border-b py-2">
//                                     <span className="text-gray-600">{entry.date.toLocaleString()}</span>: {entry.action} - <span className="font-semibold">{entry.grocery.name}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredGroceries.map((grocery) => (
//                     <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
//                         <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
//                         <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                         <p className="text-gray-600">Category: {grocery.category}</p>
//                         <p className="text-gray-600">Expiration: {grocery.expirationDate || 'N/A'}</p>
//                         <div className="flex justify-between mt-4">
//                             <button
//                                 onClick={() => {
//                                     setCurrentGrocery(grocery);
//                                     setIsModalOpen(true);
//                                 }}
//                                 className="text-green-500 hover:text-green-700"
//                             >
//                                 <FaEdit size={20} />
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteGrocery(grocery._id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 <FaTrashAlt size={20} />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default GroceryList;



// import React, { useEffect, useState, useCallback } from 'react';
// import GroceryForm from './GroceryForm';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'];

// const GroceryList = ({ token }) => {
//     const [groceries, setGroceries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//     const [currentGrocery, setCurrentGrocery] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [quantityRange, setQuantityRange] = useState([0, 100]);
//     const [history, setHistory] = useState([]);

//     // Fetch groceries on component mount
//     useEffect(() => {
//         const fetchGroceries = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch('http://localhost:5000/api/groceries', {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Include token in the request headers
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch groceries');
//                 }
//                 const data = await response.json();
//                 setGroceries(data);
//             } catch (error) {
//                 setError('Error fetching groceries: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchGroceries();
//     }, [token]);

//     // Load history from local storage
//     useEffect(() => {
//         const savedHistory = JSON.parse(localStorage.getItem('groceryHistory')) || [];
//         setHistory(savedHistory);
//     }, []);

//     const logHistory = (action, grocery) => {
//         const newEntry = { action, grocery, date: new Date() };
//         const updatedHistory = [...history, newEntry];
//         setHistory(updatedHistory);
//         localStorage.setItem('groceryHistory', JSON.stringify(updatedHistory));
//     };

//     const handleAddGrocery = useCallback(async (newItem) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/groceries', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//                 body: JSON.stringify(newItem),
//             });
//             if (!response.ok) throw new Error('Failed to add grocery');
//             const addedItem = await response.json();
//             setGroceries(prevGroceries => [...prevGroceries, addedItem]);
//             logHistory('Added', addedItem);
//             toast.success('Grocery item added successfully!');
//             setIsModalOpen(false); // Close modal after adding
//         } catch (error) {
//             toast.error('Failed to add grocery item: ' + error.message);
//         }
//     }, [token]);

//     const handleUpdateGrocery = useCallback(async (id, updatedItem) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//                 body: JSON.stringify(updatedItem),
//             });
//             if (!response.ok) throw new Error('Failed to update grocery');
//             const updatedGrocery = await response.json();
//             setGroceries(prevGroceries => prevGroceries.map(grocery => (grocery._id === id ? updatedGrocery : grocery)));
//             logHistory('Updated', updatedGrocery);
//             toast.success('Grocery item updated successfully!');
//             setIsModalOpen(false); // Close modal after updating
//         } catch (error) {
//             toast.error('Failed to update grocery item: ' + error.message);
//         }
//     }, [token]);

//     const handleDeleteGrocery = useCallback(async (id) => {
//         const groceryToDelete = groceries.find(grocery => grocery._id === id);
//         if (!groceryToDelete) return;

//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'DELETE',
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (!response.ok) throw new Error('Failed to delete grocery');
//             setGroceries(prevGroceries => prevGroceries.filter(grocery => grocery._id !== id));
//             logHistory('Deleted', groceryToDelete);
//             toast.success('Grocery item deleted successfully!');
//         } catch (error) {
//             toast.error('Failed to delete grocery item: ' + error.message);
//         }
//     }, [groceries, token]);

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredGroceries = groceries.filter(grocery => {
//         const inName = grocery.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const inCategory = categoryFilter ? grocery.category === categoryFilter : true;
//         const inQuantity = grocery.quantity >= quantityRange[0] && grocery.quantity <= quantityRange[1];
//         return inName && inCategory && inQuantity;
//     });

//     return (
//         <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//             <ToastContainer />
//             <h1 className="text-5xl font-bold text-center mb-6 text-green-700">Grocery List</h1>

//             {loading && <p>Loading groceries...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             <div className="flex flex-col md:flex-row mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded">
//                     <option value="">All Categories</option>
//                     {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     placeholder="Min Quantity"
//                     value={quantityRange[0]}
//                     onChange={(e) => setQuantityRange([Number(e.target.value), quantityRange[1]])}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max Quantity"
//                     value={quantityRange[1]}
//                     onChange={(e) => setQuantityRange([quantityRange[0], Number(e.target.value)])}
//                     className="mb-4 md:mb-0 p-3 border border-gray-300 rounded"
//                 />
//             </div>

//             <button
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all mb-6"
//                 onClick={() => {
//                     setCurrentGrocery(null);
//                     setIsModalOpen(true);
//                 }}
//             >
//                 + Add Grocery Item
//             </button>

//             {isModalOpen && (
//                 <GroceryForm
//                     grocery={currentGrocery}
//                     closeModal={() => setIsModalOpen(false)}
//                     updateGrocery={handleUpdateGrocery}
//                     addGrocery={handleAddGrocery}
//                     categories={categories}
//                 />
//             )}

//             <button 
//                 onClick={() => setIsHistoryOpen(true)} 
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded mb-4">
//                 View History
//             </button>

//             {isHistoryOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
//                         <h2 className="text-xl font-bold mb-4">Action History</h2>
//                         <button 
//                             onClick={() => setIsHistoryOpen(false)} 
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                         >
//                             &times;
//                         </button>
//                         <div className="max-h-60 overflow-y-auto">
//                             {history.map((entry, index) => (
//                                 <div key={index} className="border-b py-2">
//                                     <span className="text-gray-600">{entry.date.toLocaleString()}</span>: {entry.action} - <span className="font-semibold">{entry.grocery.name}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredGroceries.map((grocery) => (
//                     <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
//                         <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
//                         <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                         <p className="text-gray-600">Category: {grocery.category}</p>
//                         <p className="text-gray-600">Expiration: {grocery.expirationDate || 'N/A'}</p>
//                         <div className="flex justify-between mt-4">
//                             <button
//                                 onClick={() => {
//                                     setCurrentGrocery(grocery);
//                                     setIsModalOpen(true);
//                                 }}
//                                 className="text-green-500 hover:text-green-700"
//                             >
//                                 <FaEdit size={20} />
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteGrocery(grocery._id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 <FaTrashAlt size={20} />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default GroceryList;

// import React, { useEffect, useState, useCallback } from 'react';
// import GroceryForm from './GroceryForm';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'];

// const GroceryList = ({ token, refreshToken, setToken }) => {
//     const [groceries, setGroceries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentGrocery, setCurrentGrocery] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [quantityRange, setQuantityRange] = useState([0, 100]);

//     // Fetch groceries on component mount
//     useEffect(() => {
//         const fetchGroceries = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch('http://localhost:5000/api/groceries', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.status === 401) {
//                     await refreshAccessToken();
//                     return fetchGroceries();
//                 }

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch groceries');
//                 }
//                 const data = await response.json();
//                 setGroceries(data);
//             } catch (error) {
//                 setError('Error fetching groceries: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchPublicGroceries = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch('http://localhost:5000/api/public-groceries'); // New endpoint for public groceries
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch public groceries');
//                 }
//                 const data = await response.json();
//                 setGroceries(data); // Set public groceries
//             } catch (error) {
//                 setError('Error fetching public groceries: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPublicGroceries(); // Fetch public groceries on mount
//         fetchGroceries(); // Fetch user-specific groceries if token is available
//     }, [token, refreshToken]);

//     // Token refresh logic remains unchanged
//     const refreshAccessToken = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/token', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ token: refreshToken }),
//             });

//             if (!response.ok) throw new Error('Failed to refresh token');

//             const { accessToken } = await response.json();
//             setToken(accessToken);
//         } catch (error) {
//             console.error('Token refresh error:', error);
//             toast.error('Session expired. Please log in again.');
//         }
//     };

//     const handleAddGrocery = useCallback(async (newItem) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/groceries', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(newItem),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(errorText || 'Failed to add grocery');
//             }

//             const addedItem = await response.json();
//             setGroceries((prevGroceries) => [...prevGroceries, addedItem]);
//             toast.success('Grocery item added successfully!');
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Add grocery error:', error);
//             toast.error('Failed to add grocery item: ' + error.message);
//         }
//     }, [token]);

//     const handleUpdateGrocery = useCallback(async (id, updatedItem) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(updatedItem),
//             });
//             if (!response.ok) throw new Error('Failed to update grocery');
//             const updatedGrocery = await response.json();
//             setGroceries((prevGroceries) =>
//                 prevGroceries.map((grocery) => (grocery._id === id ? updatedGrocery : grocery))
//             );
//             toast.success('Grocery item updated successfully!');
//             setIsModalOpen(false);
//         } catch (error) {
//             toast.error('Failed to update grocery item: ' + error.message);
//         }
//     }, [token]);

//     const handleDeleteGrocery = useCallback(async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!response.ok) throw new Error('Failed to delete grocery');
//             setGroceries((prevGroceries) => prevGroceries.filter((grocery) => grocery._id !== id));
//             toast.success('Grocery item deleted successfully!');
//         } catch (error) {
//             toast.error('Failed to delete grocery item: ' + error.message);
//         }
//     }, [token]);

//     const filteredGroceries = groceries.filter((grocery) => {
//         const inName = grocery.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const inCategory = categoryFilter ? grocery.category === categoryFilter : true;
//         const inQuantity = grocery.quantity >= quantityRange[0] && grocery.quantity <= quantityRange[1];
//         return inName && inCategory && inQuantity;
//     });

//     return (
//         <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//             <ToastContainer />
//             <h1 className="text-5xl font-bold text-center mb-6 text-green-700">Grocery List</h1>

//             {loading && <p>Loading groceries...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             <div className="flex flex-col md:flex-row mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <select
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded"
//                 >
//                     <option value="">All Categories</option>
//                     {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     placeholder="Min Quantity"
//                     value={quantityRange[0]}
//                     onChange={(e) => setQuantityRange([Number(e.target.value), quantityRange[1]])}
//                     className="mb-4 md:mb-0 md:mr-4 p-3 border border-gray-300 rounded"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max Quantity"
//                     value={quantityRange[1]}
//                     onChange={(e) => setQuantityRange([quantityRange[0], Number(e.target.value)])}
//                     className="mb-4 md:mb-0 p-3 border border-gray-300 rounded"
//                 />
//             </div>

//             <button
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all mb-6"
//                 onClick={() => {
//                     setCurrentGrocery(null);
//                     setIsModalOpen(true);
//                 }}
//             >
//                 + Add Grocery Item
//             </button>

//             {isModalOpen && (
//                 <GroceryForm
//                     grocery={currentGrocery}
//                     closeModal={() => setIsModalOpen(false)}
//                     updateGrocery={handleUpdateGrocery}
//                     addGrocery={handleAddGrocery}
//                     categories={categories}
//                 />
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredGroceries.map((grocery) => (
//                     <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
//                         <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
//                         <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                         <p className="text-gray-600">Category: {grocery.category}</p>
//                         <p className="text-gray-600">Expiration: {grocery.expirationDate || 'N/A'}</p>
//                         <div className="flex justify-between mt-4">
//                             <button
//                                 onClick={() => {
//                                     setCurrentGrocery(grocery);
//                                     setIsModalOpen(true);
//                                 }}
//                                 className="text-green-500 hover:text-green-700"
//                             >
//                                 <FaEdit size={20} />
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteGrocery(grocery._id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 <FaTrashAlt size={20} />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default GroceryList;



// import React, { useEffect, useState, useCallback } from 'react';
// import GroceryForm from './GroceryForm';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'];

// const GroceryList = ({ token, refreshToken, setToken }) => {
//     const [groceries, setGroceries] = useState([]);
//     const [publicGroceries, setPublicGroceries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentGrocery, setCurrentGrocery] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [quantityRange, setQuantityRange] = useState([0, 100]);
//     const [publicLimit, setPublicLimit] = useState(5);
//     const [showGroceryForm, setShowGroceryForm] = useState(false);

//     // Load groceries from local storage
//     useEffect(() => {
//         const storedGroceries = JSON.parse(localStorage.getItem('groceryHistory')) || [];
//         setGroceries(storedGroceries);
//     }, []);

//     // Fetch public groceries on component mount
//     useEffect(() => {
//         const fetchPublicGroceries = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch('http://localhost:5000/api/public-groceries');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch public groceries');
//                 }
//                 const data = await response.json();
//                 setPublicGroceries(data);
//             } catch (error) {
//                 setError('Error fetching public groceries: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPublicGroceries();
//     }, []);

//     const handleAddGrocery = useCallback(async (newItem) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/groceries', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(newItem),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(errorText || 'Failed to add grocery');
//             }

//             const addedItem = await response.json();
//             setGroceries((prevGroceries) => {
//                 const updatedGroceries = [...prevGroceries, addedItem];
//                 localStorage.setItem('groceryHistory', JSON.stringify(updatedGroceries));
//                 return updatedGroceries;
//             });
//             toast.success('Grocery item added successfully!');
//             setShowGroceryForm(false);
//         } catch (error) {
//             console.error('Add grocery error:', error);
//             toast.error('Failed to add grocery item: ' + error.message);
//         }
//     }, [token]);

//     const handleShowMore = () => {
//         setPublicLimit((prevLimit) => prevLimit + 5);
//     };

//     const handleDeleteGrocery = useCallback(async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!response.ok) throw new Error('Failed to delete grocery');
//             setGroceries((prevGroceries) => {
//                 const updatedGroceries = prevGroceries.filter((grocery) => grocery._id !== id);
//                 localStorage.setItem('groceryHistory', JSON.stringify(updatedGroceries));
//                 return updatedGroceries;
//             });
//             toast.success('Grocery item deleted successfully!');
//         } catch (error) {
//             toast.error('Failed to delete grocery item: ' + error.message);
//         }
//     }, [token]);

//     const displayedPublicGroceries = publicGroceries.slice(0, publicLimit);

//     return (
//         <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//             <ToastContainer />
//             <h1 className="text-5xl font-bold text-center mb-6 text-green-700">Grocery List</h1>

//             {loading && <p>Loading groceries...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             <button
//                 onClick={() => setShowGroceryForm(true)}
//                 className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//             >
//                 Add Grocery
//             </button>

//             {showGroceryForm && (
//                 <GroceryForm
//                     categories={categories} // Pass categories as a prop
//                     onAddGrocery={handleAddGrocery}
//                     onClose={() => setShowGroceryForm(false)}
//                 />
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {groceries.map((grocery) => (
//                     <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
//                         <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
//                         <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                         <p className="text-gray-600">Category: {grocery.category}</p>
//                         <p className="text-gray-600">Expiration: {grocery.expirationDate || 'N/A'}</p>
//                         <div className="flex justify-between mt-4">
//                             <button
//                                 onClick={() => {
//                                     setCurrentGrocery(grocery);
//                                     setIsModalOpen(true);
//                                 }}
//                                 className="text-green-500 hover:text-green-700"
//                             >
//                                 <FaEdit size={20} />
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteGrocery(grocery._id)}
//                                 className="text-red-500 hover:text-red-700"
//                             >
//                                 <FaTrashAlt size={20} />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <h2 className="text-3xl font-bold mt-8 mb-4 text-green-700">Public Groceries</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {displayedPublicGroceries.map((grocery) => (
//                     <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
//                         <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
//                         <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                         <p className="text-gray-600">Category: {grocery.category}</p>
//                         <p className="text-gray-600">Expiration: {grocery.expirationDate || 'N/A'}</p>
//                         <button
//                             onClick={() => handleAddGrocery(grocery)}
//                             className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//                         >
//                             Add to My List
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {publicLimit < publicGroceries.length && (
//                 <button
//                     onClick={handleShowMore}
//                     className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//                 >
//                     Show More
//                 </button>
//             )}
//         </div>
//     );
// };

// export default GroceryList;
import React, { useEffect, useState } from 'react';
import GroceryForm from './GroceryForm';
import EditGroceryModal from './EditGroceryModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
import rob from "../asset/rdd.png";
import NavBar from '../components/NavBar';

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'];

const GroceryList = ({ token }) => {
    const [groceries, setGroceries] = useState([]);
    const [publicGroceries, setPublicGroceries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGroceryForm, setShowGroceryForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentGrocery, setCurrentGrocery] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCountMyGroceries, setDisplayCountMyGroceries] = useState(4);
    const [showMoreMyGroceries, setShowMoreMyGroceries] = useState(false);
    const [displayCountPublicGroceries, setDisplayCountPublicGroceries] = useState(6);
    const [showMorePublicGroceries, setShowMorePublicGroceries] = useState(false);

    useEffect(() => {
        const storedGroceries = JSON.parse(localStorage.getItem('groceryHistory')) || [];
        setGroceries(storedGroceries);
    }, []);

    useEffect(() => {
        const fetchPublicGroceries = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/api/public-groceries');
                if (!response.ok) {
                    throw new Error('Failed to fetch public groceries');
                }
                const data = await response.json();
                setPublicGroceries(data);
            } catch (error) {
                setError('Error fetching public groceries: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicGroceries();
    }, []);

    const filteredGroceries = groceries.filter((grocery) =>
        grocery.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const filteredPublicGroceries = publicGroceries.filter((grocery) =>
        grocery.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    const handleShowMoreMyGroceries = () => {
        setShowMoreMyGroceries((prev) => !prev);
        setDisplayCountMyGroceries(showMoreMyGroceries ? 4 : groceries.length);
    };

    const handleShowMorePublicGroceries = () => {
        setShowMorePublicGroceries((prev) => !prev);
        setDisplayCountPublicGroceries(showMorePublicGroceries ? 6 : publicGroceries.length);
    };

    const handleAddGrocery = (grocery) => {
        const updatedGroceries = [...groceries, grocery];
        setGroceries(updatedGroceries);
        localStorage.setItem('groceryHistory', JSON.stringify(updatedGroceries));
        toast.success('Grocery added successfully!');
    };

    const handleDeleteGrocery = (id) => {
        const updatedGroceries = groceries.filter((grocery) => grocery._id !== id);
        setGroceries(updatedGroceries);
        localStorage.setItem('groceryHistory', JSON.stringify(updatedGroceries));
        toast.success('Grocery deleted successfully!');
    };

    const handleUpdateGrocery = (updatedGrocery) => {
        const updatedGroceries = groceries.map((grocery) =>
            grocery._id === updatedGrocery._id ? updatedGrocery : grocery
        );
        setGroceries(updatedGroceries);
        localStorage.setItem('groceryHistory', JSON.stringify(updatedGroceries));
        setShowEditModal(false);
        toast.success('Grocery updated successfully!');
    };

    return (
        <div className="container mx-auto h-screen p-8 rounded-lg relative">
            <ToastContainer />
            <h1 className="text-5xl font-bold text-center mb-6 text-orange-500 drop-shadow-lg">Grocery List</h1>

            {loading && <p className="text-center text-lg text-teal-600">Loading groceries...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-3 flex items-center text-teal-500">
                    <CiSearch className="h-5 w-5" />
                </span>
                <input
                    type="text"
                    placeholder="Search groceries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-green-500 rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <button
                onClick={() => setShowGroceryForm((prev) => !prev)}
                className="mb-4 bg-green-500 hover:bg-orange-500 text-white px-4 py-2 rounded transition duration-300 hover:drop-shadow-lg"
            >
                {showGroceryForm ? 'Cancel' : 'Add Grocery'}
            </button>

            {showGroceryForm && (
                <GroceryForm
                    categories={categories}
                    onAddGrocery={handleAddGrocery}
                    onClose={() => setShowGroceryForm(false)}
                />
            )}

            {showEditModal && currentGrocery && (
                <EditGroceryModal
                    grocery={currentGrocery}
                    onUpdateGrocery={handleUpdateGrocery}
                    onClose={() => setShowEditModal(false)}
                />
            )}

            <h2 className="text-3xl font-bold mt-8 mb-4 text-orange-500">My Groceries</h2>
            <div className="flex flex-wrap justify-start space-x-4 ml-40">
                <div className="flex flex-wrap">
                    {filteredGroceries.slice(0, displayCountMyGroceries).map((grocery) => (
                        <div
                            key={grocery._id}
                            className="bg-white rounded-lg w-2/4 shadow-md p-4 mb-4 transition-transform transform hover:scale-105 flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
                                <p className="text-gray-600">Quantity: {grocery.quantity}</p>
                                <p className="text-gray-600">Category: {grocery.category}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setCurrentGrocery(grocery);
                                            setShowEditModal(true);
                                        }}
                                        className="text-teal-500 hover:text-teal-700"
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteGrocery(grocery._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-1/4 flex items-center justify-center">
                    {/* <img
                        src={rob}
                        alt="Robot"
                        className="w-full  h-full mr-4 transition-opacity duration-200  hover:opacity-100"                     /> */}
                     <img
    src={rob}
    alt="Robot"
    className="w-full max-w-md h-auto transition-opacity duration-200 hover:opacity-100 animate-oblique"
/>
                </div>
            </div>

            {filteredGroceries.length > 2 && (
                <button
                    onClick={handleShowMoreMyGroceries}
                    className="mt-4 bg-green-500 hover:bg-orange-500 text-white px-4 py-2 rounded transition duration-300"
                >
                    {showMoreMyGroceries ? 'Show Less' : 'Show More'}
                </button>
            )}

            <h2 className="text-3xl font-bold mt-8 mb-4 text-orange-500">Public Groceries</h2>
            <div className="flex flex-wrap justify-start space-x-4">
                {publicGroceries.slice(0, displayCountPublicGroceries).map((grocery) => (
                    <div key={grocery._id} className="bg-white rounded-lg shadow-md p-4">
                                <img
                src={grocery.image}
                alt={grocery.name}
                className="w-full h-40 object-cover rounded-md mb-2 transition-transform transform hover:scale-105"
            />

                        <h3 className="text-lg font-semibold text-gray-800">{grocery.name}</h3>
                        <p className="text-gray-600">Quantity: {grocery.quantity}</p>
                        <p className="text-gray-600">Category: {grocery.category}</p>
                        <button
                            onClick={() => handleAddGrocery(grocery)}
                            className="mt-4 px-4 py-2 rounded bg-green-500 hover:bg-orange-500 text-white"
                        >
                            Add to My List
                        </button>
                    </div>
                ))}
            </div>

            {publicGroceries.length > 6 && (
                <button
                    onClick={handleShowMorePublicGroceries}
                    className="mt-4 bg-green-500 hover:bg-orange-500 text-white px-4 py-2 rounded transition duration-300"
                >
                    {showMorePublicGroceries ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default GroceryList;
