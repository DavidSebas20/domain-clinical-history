const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

// Define the Prescription schema
const prescriptionSchema = new mongoose.Schema({
  prescription_id: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  patient_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  date_prescribed: { type: Date, default: Date.now },
  notes: { type: String },
});

// Create and export the Prescription model
module.exports = mongoose.model('Prescription', prescriptionSchema);