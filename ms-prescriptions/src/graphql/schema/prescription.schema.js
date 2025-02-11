const { gql } = require('graphql-tag');

module.exports = gql`
  type Prescription {
    prescription_id: String!
    patient_id: String!
    doctor_id: String!
    medication: String!
    dosage: String!
    date_prescribed: String!
    notes: String
  }

  type Query {
    getPrescription(prescription_id: String!): Prescription
    listPrescriptions: [Prescription]
    searchPrescriptions(patient_id: String, doctor_id: String, medication: String): [Prescription]
  }

  type Mutation {
    addPrescription(
      patient_id: String!
      doctor_id: String!
      medication: String!
      dosage: String!
      notes: String
    ): Prescription

    updatePrescription(
      prescription_id: String!
      patient_id: String
      doctor_id: String
      medication: String
      dosage: String
      notes: String
    ): Prescription

    deletePrescription(prescription_id: String!): String
  }
`;