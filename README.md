# 📑 **Clinical History Domain**

## 📖 Description
The **Clinical History** domain is responsible for storing and managing all medical records related to patients, including **consultations, prescriptions, and laboratory tests**. Each CRUD operation is implemented as an independent microservice to ensure **modularity, scalability, and maintainability**.

---

## 🔹 Microservices

### 🏥 **1. Medical Record Management**
- **📌 Description:** Creates, retrieves, updates, and deletes patient medical records.
- **🔹 Methods:** `POST`, `GET`, `PUT`, `DELETE`
- **🔗 Dependencies:**  
  - **Patient Management Domain** 🏥 (to validate patient information)  
  - **Doctor Management Domain** 🩺 (to validate doctor authorization)  
  - **Appointment Management Domain** 📅 (to link medical records to appointments)  
- **📥 Inputs:** `Patient ID`, `Doctor ID`, `Diagnosis`, `Observations`, `Treatment Plan`
- **📤 Outputs:** Medical record confirmation 📄  

### 💊 **2. Prescription Management**
- **📌 Description:** Manages patient prescriptions, including creation, retrieval, and updates.
- **🔹 Methods:** `GRAPQL`
- **🔗 Dependencies:**  
  - **Patient Management Domain** 🏥 (to link prescriptions to patients)  
  - **Doctor Management Domain** 🩺 (to authorize prescription creation)  
  - **Pharmacy System (Future Integration)** 💊 (to manage medication stock)  
- **📥 Inputs:** `Patient ID`, `Doctor ID`, `Medication`, `Dosage`, `Duration`
- **📤 Outputs:** Prescription details and confirmation ✅  

### 🧪 **3. Laboratory Test Management**
- **📌 Description:** Manages laboratory tests, including orders, results, and updates.
- **🔹 Methods:** `POST`, `GET`, `PUT`, `DELETE`
- **🔗 Dependencies:**  
  - **Patient Management Domain** 🏥 (to link tests to patients)  
  - **Doctor Management Domain** 🩺 (to authorize test requests)  
  - **Laboratory System (Future Integration)** 🔬 (to process and retrieve test results)  
- **📥 Inputs:** `Patient ID`, `Doctor ID`, `Test Type`, `Results`, `Observations`
- **📤 Outputs:** Test order confirmation and result retrieval 📊  

---

## 🛠️ **Technologies Used**
- **⚙️ Backend:** Python, FastApi 💻  
- **🗄️ Database:** Dynamo 🌌

---

## 🔗 **Integrations**
- **🏥 Patient Management Domain:** Links medical records, prescriptions, and tests to registered patients.  
- **🩺 Doctor Management Domain:** Ensures only authorized doctors update medical histories.  
- **📅 Appointment Management Domain:** Medical records are updated after consultations.  


