const Prescription = require('../../models/Prescription');

module.exports = {
  Query: {
    async getPrescription(_, { prescription_id }) {
      return await Prescription.findOne({ prescription_id });
    },

    async listPrescriptions() {
      return await Prescription.find();
    },

    async searchPrescriptions(_, { patient_id, doctor_id, medication }) {
      const filter = {};
      if (patient_id) filter.patient_id = { $regex: new RegExp(patient_id), $options: 'i' };
      if (doctor_id) filter.doctor_id = { $regex: new RegExp(doctor_id), $options: 'i' };
      if (medication) filter.medication = { $regex: new RegExp(medication), $options: 'i' };
      return await Prescription.find(filter);
    },
  },

  Mutation: {
    async addPrescription(_, { patient_id, doctor_id, medication, dosage, notes }) {
      const prescription = new Prescription({ patient_id, doctor_id, medication, dosage, notes });
      return await prescription.save();
    },

    async updatePrescription(_, { prescription_id, patient_id, doctor_id, medication, dosage, notes }) {
      const updateData = { patient_id, doctor_id, medication, dosage, notes };
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      const prescription = await Prescription.findOneAndUpdate({ prescription_id }, updateData, { new: true });
      if (!prescription) {
        throw new Error('Prescription not found');
      }
      return prescription;
    },

    async deletePrescription(_, { prescription_id }) {
      const prescription = await Prescription.findOneAndDelete({ prescription_id });
      if (!prescription) {
        throw new Error('Prescription not found');
      }
      return 'Prescription deleted successfully';
    },
  },
};