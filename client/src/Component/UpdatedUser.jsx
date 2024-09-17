import React from 'react';

export default function UpdatedUser({ handleOnSubmit, value, handleChange }) {

    // Ensure handleChange is properly handling radio button changes
    const handleRadioChange = (e) => {
        handleChange(e); // Use the passed handleChange function
    };

    return (
        <>
            <div id="editEmployeeModal" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleOnSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Update User</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={value.name}
                                        name="name"
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Police</label>
                                    <input
                                        type="text"
                                        value={value.police}
                                        name="police"
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Code</label>
                                    <input
                                        type="text"
                                        value={value.code}
                                        name="code"
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Assignment</label>
                                    <input
                                        type="text"
                                        value={value.assignment}
                                        name="assignment"
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
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
                                                onChange={handleRadioChange}
                                            />{' '}
                                            In Service
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="condition"
                                                value="vacation"
                                                checked={value.condition === 'vacation'}
                                                onChange={handleRadioChange}
                                            />{' '}
                                            On Vacation
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="condition"
                                                value="prison"
                                                checked={value.condition === 'prison'}
                                                onChange={handleRadioChange}
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
                                            onChange={handleChange}
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
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Vacation End Date</label>
                                            <input
                                                type="date"
                                                value={value.vacationEndDate}
                                                name="vacationEndDate"
                                                onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
