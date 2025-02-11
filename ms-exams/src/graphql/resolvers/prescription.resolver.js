const Prescription = require('../../models/Prescription');

// Resolver functions for handling GraphQL queries and mutations
module.exports = {
  Query: {
    // Get a single prescription by ID
    async getPrescription(_, { prescription_id }) {
      return await Prescription.findOne({ prescription_id });
    },

    // List all prescriptions
    async listPrescriptions() {
      return await Prescription.find();
    },

    // Search prescriptions based on filters
    async searchPrescriptions(_, { patient_id, doctor_id, medication }) {
      const filter = {};
      if (patient_id) filter.patient_id = { $regex: new RegExp(patient_id), $options: 'i' }; 
      if (doctor_id) filter.doctor_id = { $regex: new RegExp(doctor_id), $options: 'i' };   
      if (medication) filter.medication = { $regex: new RegExp(medication), $options: 'i' };
      return await Prescription.find(filter);
    },
  },

  Mutation: {
    // Add a new prescription
    async addPrescription(_, { prescription_id, patient_id, doctor_id, medication, dosage, notes }) {
      if (await Prescription.findOne({ prescription_id })) {
        throw new Error('Prescription already exists');
      }

      const prescription = new Prescription({ prescription_id, patient_id, doctor_id, medication, dosage, notes });
      return await prescription.save();
    },

    // Update an existing prescription
    async updatePrescription(_, { prescription_id, patient_id, doctor_id, medication, dosage, notes }) {
      const updateData = { patient_id, doctor_id, medication, dosage, notes };
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      const prescription = await Prescription.findOneAndUpdate({ prescription_id }, updateData, { new: true });
      if (!prescription) {
        throw new Error('Prescription not found');
      }
      return prescription;
    },

    // Delete a prescription
    async deletePrescription(_, { prescription_id }) {
      const prescription = await Prescription.findOneAndDelete({ prescription_id });
      if (!prescription) {
        throw new Error('Prescription not found');
      }
      return 'Prescription deleted successfully';
    },
  },
};