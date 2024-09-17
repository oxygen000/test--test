import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    police: { type: String, required: true },
    code: { type: String, required: true },
    assignment: { type: String, required: true },
    vacationStartDate: { type: Date },
    vacationEndDate: { type: Date },
    lastReturnDate: { type: Date },
    number: { type: String, required: true },
    branch: { type: String, required: true },
    hiringDate: { type: Date, required: true },
    departureDate: { type: Date },
    
    condition: { type: String, required: true, enum: ['service', 'vacation', 'prison'] }
});

export default mongoose.model('User', userSchema);
