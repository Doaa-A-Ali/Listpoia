// import React, { useEffect, useState } from 'react';
// import GroceryList from './GroceryList';

// const Main = ({ token }) => {
//     const [groceries, setGroceries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchGroceries = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch('http://localhost:5000/api/groceries', {
//                     headers: {
//                         Authorization: `Bearer ${token}` // Include token in the request headers
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch groceries');
//                 }
//                 const data = await response.json();
//                 setGroceries(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchGroceries();
//     }, [token]);


//     const updateGrocery = async (id, updatedItem) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedItem),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to update grocery');
//             }
//             const updatedGrocery = await response.json();
//             setGroceries(groceries.map(grocery => (grocery._id === id ? updatedGrocery : grocery)));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const deleteGrocery = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/groceries/${id}`, { method: 'DELETE' });
//             if (!response.ok) {
//                 throw new Error('Failed to delete grocery');
//             }
//             setGroceries(groceries.filter(grocery => grocery._id !== id));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const addGrocery = async (newItem) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/groceries', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(newItem),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to add grocery');
//             }
//             const addedItem = await response.json();
//             setGroceries([...groceries, addedItem]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const reorderGroceries = (fromIndex, toIndex) => {
//         const updatedGroceries = [...groceries];
//         const [movedItem] = updatedGroceries.splice(fromIndex, 1);
//         updatedGroceries.splice(toIndex, 0, movedItem);
//         setGroceries(updatedGroceries);
//     };

//     return (
//         <div>
//             {loading && <p>Loading groceries...</p>}
//             {error && <p className="error">{error}</p>}
//             <GroceryList
//                 groceries={groceries}
//                 updateGrocery={updateGrocery}
//                 deleteGrocery={deleteGrocery}
//                 addGrocery={addGrocery}
//                 reorderGroceries={reorderGroceries}
//             />
//         </div>
//     );
// };

// export default Main;



import React from 'react';
import GroceryList from './GroceryList';

const Main = ({ token }) => {
    return (
        <div>
            <GroceryList token={token} />
        </div>
    );
};

export default Main;