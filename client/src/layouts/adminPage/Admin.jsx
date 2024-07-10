import React, { useState, useEffect } from 'react';
import axios from '../../services/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/auth/users');
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    const handleInputChange = (e, user, field) => {
        const value = e.target.value;
        if (user) {
            setEditingUser({ ...user, [field]: value });
        } else {
            setNewUser({ ...newUser, [field]: value });
        }
    };

    const handleSaveUser = async () => {
        try {
            if (editingUser && editingUser._id) {
                await axios.put(`/auth/users/${editingUser._id}`, editingUser);
                toast.success("User updated successfully");
            } else {
                await axios.post('/auth/users', newUser);
                toast.success("User added successfully");
            }
            setEditingUser(null);
            setNewUser({ name: '', email: '', password: '' });
            fetchUsers();
        } catch (error) {
            toast.error("Failed to save user");
        }
    };
    

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`/auth/users/${id}`);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5 text-center mt-5">Manager User</h1>
            <ToastContainer />
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200 text-black">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Password</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => handleInputChange(e, user, 'name')}
                                        className="w-full border border-gray-300 rounded p-1  text-black"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="email"
                                        value={editingUser.email}
                                        onChange={(e) => handleInputChange(e, user, 'email')}
                                        className="w-full border border-gray-300 rounded p-1  text-black"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="password"
                                        value={editingUser.password}
                                        onChange={(e) => handleInputChange(e, user, 'password')}
                                        className="w-full border border-gray-300 rounded p-1 text-black"
                                    />
                                ) : (
                                    '******'
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingUser && editingUser._id === user._id ? (
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={handleSaveUser}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingUser(null)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr className="text-center">
                        <td className="border border-gray-300 px-4 py-2 text-black">
                            <input
                                type="text"
                                value={newUser.name}
                                onChange={(e) => handleInputChange(e, null, 'name')}
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded p-1"
                            />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-black">
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => handleInputChange(e, null, 'email')}
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded p-1"
                            />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-black">
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => handleInputChange(e, null, 'password')}
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded p-1"
                            />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                                onClick={handleSaveUser}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}    

export default Admin;
