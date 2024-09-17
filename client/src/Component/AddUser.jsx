import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser() {
    const [value, setValue] = useState({
        name: '',
        police: '',
        code: '',
        assignment: '',
        vacationStartDate: '',
        vacationEndDate: '',
        lastReturnDate: '',
        number: '',
        branch: '',
        hiringDate: '',
        departureDate: '',
        condition: '',
    });

    const handleOnchange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleRadioChange = (value) => {
        setValue((prevValue) => ({
            ...prevValue,
            condition: value,
        }));
        console.log("Condition selected:", value); // تحقق من القيمة المختارة
    };

    const CloseRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(value); // تحقق من القيم قبل الإرسال
        
        try {
            const adduser = await axios.post('http://localhost:8000/api/create', value);
            const response = adduser.data;
            if (response.success) {
                toast.success(response.message);
                CloseRef.current.click();
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Soldier</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true" ref={CloseRef}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={value.name} name="name" onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Police</label>
                                    <input type="text" value={value.police} name="police" onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Code</label>
                                    <input type="text" value={value.code} name="code" onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Assignment</label>
                                    <input type="text" value={value.assignment} name="assignment" onChange={handleOnchange} className="form-control" required />
                                </div>
                                
                                {/* Soldier Status Radio Buttons */}
                                <div className="flex flex-col mt-4">
                                    <label>Soldier Status</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="condition"
                                                value="service"
                                                checked={value.condition === 'service'}
                                                onChange={(e) => handleRadioChange(e.target.value)}
                                            />{' '}
                                            In Service
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="condition"
                                                value="vacation"
                                                checked={value.condition === 'vacation'}
                                                onChange={(e) => handleRadioChange(e.target.value)}
                                            />{' '}
                                            On Vacation
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="condition"
                                                value="prison"
                                                checked={value.condition === 'prison'}
                                                onChange={(e) => handleRadioChange(e.target.value)}
                                            />{' '}
                                            In Prison
                                        </label>
                                    </div>
                                </div>

                                {/* Conditional Fields */}
                                {value.condition === 'service' && (
                                    <div className="form-group">
                                        <label>Last Return Date</label>
                                        <input
                                            type="date"
                                            value={value.lastReturnDate}
                                            name="lastReturnDate"
                                            onChange={handleOnchange}
                                            className="form-control"
                                        />
                                    </div>
                                )}

                                {value.condition === 'vacation' && (
                                    <>
                                        <div className="form-group">
                                            <label>Vacation Start Date</label>
                                            <input
                                                type="date"
                                                value={value.vacationStartDate}
                                                name="vacationStartDate"
                                                onChange={handleOnchange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Vacation End Date</label>
                                            <input
                                                type="date"
                                                value={value.vacationEndDate}
                                                name="vacationEndDate"
                                                onChange={handleOnchange}
                                                className="form-control"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* No extra fields for "In Prison" condition */}
                                
                                <div className="form-group">
                                    <label>Number</label>
                                    <input
                                        type="text"
                                        value={value.number}
                                        name="number"
                                        onChange={handleOnchange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Branch</label>
                                    <input
                                        type="text"
                                        value={value.branch}
                                        name="branch"
                                        onChange={handleOnchange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hiring Date</label>
                                    <input
                                        type="date"
                                        value={value.hiringDate}
                                        name="hiringDate"
                                        onChange={handleOnchange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Departure Date</label>
                                    <input
                                        type="date"
                                        value={value.departureDate}
                                        name="departureDate"
                                        onChange={handleOnchange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-primary" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
