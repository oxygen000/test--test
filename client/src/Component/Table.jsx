import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Table({ deleteUser, updateUserData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/get');
                setData(response.data.users || []); // Ensure data is an array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Manage <b>Soldiers</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <a href="#" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                                    <i className="material-icons">&#xE147;</i> <span>Add New Soldier</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Police</th>
                                <th>Code</th>
                                <th>Assignment</th>
                                <th>vacationStartDate</th>
                                <th>vacationEndDate</th>
                                <th>lastReturnDate</th>
                                <th>Branch</th>
                                <th>Number</th>
                                <th>Hiring Date</th>
                                <th>Departure Date</th>
                                <th>Condition</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elem, index) => (
                                <tr key={elem._id}>
                                    <td>{index + 1}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.police}</td>
                                    <td>{elem.code}</td>
                                    <td>{elem.assignment}</td>
                                    <td>{elem.status}</td>
                                    <td>{elem.vacationStartDate}</td>
                                    <td>{elem.vacationEndDate}</td>
                                    <td>{elem.lastReturnDate}</td>
                                    <td>{elem.branch}</td>
                                    <td>{elem.number}</td>
                                    <td>{new Date(elem.hiringDate).toLocaleDateString()}</td>
                                    <td>{elem.departureDate ? new Date(elem.departureDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>{elem.condition}</td>
                                    <td>
                                        <a href="#" className="edit cursor-pointer" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onClick={() => updateUserData(elem._id)}>
                                            <i className="material-icons" data-bs-toggle="tooltip" title="Edit">&#xE254;</i>
                                        </a>
                                        <a href="#" className="delete cursor-pointer" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" onClick={() => deleteUser(elem._id)}>
                                            <i className="material-icons" data-bs-toggle="tooltip" title="Delete">&#xE872;</i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
