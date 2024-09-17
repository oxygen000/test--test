import React, { useState, useEffect } from 'react';
import Table from '../Component/Table';
import AddUser from '../Component/AddUser';
import UpdatedUser from '../Component/UpdatedUser';
import DeletUser from '../Component/DeletUser';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserTable() {
    const [userId, setUserId] = useState(null);
    const [updatedUserId, setUpdatedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState({
        name: "",
        police: "",
        code: "",
        assignment: "",
        status: "",
        vacationStartDate: "",
        vacationEndDate: "",
        number: "",
        branch: "",
        hiringDate: "",
        departureDate: "",
        condition: ""
    });

    // Fetch users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/api/get');
                if (response.data.success) {
                    setUsers(response.data.users);
                } else {
                    toast.error("Failed to fetch users");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching users");
            }
        }
        fetchUsers();
    }, []);

    // Function to delete user
    const deleteUser = (userId) => {
        setUserId(userId);
    };

    const handleUserDelete = async () => {
        if (!userId) return;

        try {
            const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setUsers(users.filter(user => user._id !== userId)); // Remove user from local state
                setUserId(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    // Function to set updated user ID and populate form
    const updateUserData = (updatedUserId) => {
        setUpdatedUserId(updatedUserId);
        const userToUpdate = users.find(user => user._id === updatedUserId);
        if (userToUpdate) {
            setValue({
                name: userToUpdate.name || "",
                police: userToUpdate.police || "",
                code: userToUpdate.code || "",
                assignment: userToUpdate.assignment || "",
                status: userToUpdate.status || "",
                vacationStartDate: userToUpdate.vacationStartDate || "",
                vacationEndDate: userToUpdate.vacationEndDate || "",
                number: userToUpdate.number || "",
                branch: userToUpdate.branch || "",
                hiringDate: userToUpdate.hiringDate || "",
                departureDate: userToUpdate.departureDate || "",
                condition: userToUpdate.condition || ""
            });
        }
    };

    // Handle form submission for updating user
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!updatedUserId) return;

        try {
            const response = await axios.put(`http://localhost:8000/api/update/${updatedUserId}`, value);
            if (response.data.success) {
                toast.success(response.data.message);
                setUsers(users.map(user => user._id === updatedUserId ? response.data.updatedUser : user));
                setUpdatedUserId(null);
                setValue({
                    name: "",
                    police: "",
                    code: "",
                    assignment: "",
                    status: "",
                    vacationStartDate: "",
                    vacationEndDate: "",
                    number: "",
                    branch: "",
                    hiringDate: "",
                    departureDate: "",
                    condition: ""
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user.");
        }
    };

    return (
        <>
            <Table users={users} deleteUser={deleteUser} updateUserData={updateUserData} />
            <AddUser />
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} handleChange={handleChange} />
            <DeletUser handleUserDelete={handleUserDelete} />
        </>
    );
}
