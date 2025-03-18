# 🏥✨MedSync - Smart Hospital Management System✨🏥

**🚀 Revolutionizing Healthcare - Your all-in-one solution for managing OPD queues, real-time bed tracking, and inventory management.**
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🌟 Why MedSync?
**Imagine a world where patients never wait endlessly in OPD queues, hospitals always know their bed availability in real-time, and inventory never runs out of essential supplies. MedSync makes this a reality by integrating AI, real-time data, and predictive analytics to create a seamless experience for patients and healthcare providers.**
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🚀 Key Features
### 🏥 1. OPD Queue Management
- Real-time Tracking: Monitor patient queues and track waiting times.
- Online Appointment Scheduling: Allow patients to book appointments online.
- Patient Notifications & Alerts: Send updates to patients regarding their appointment status.
- Digital Registration: Patients can register.

### 🛏️ 2. Real-time Bed Availability
- Live Monitoring: View real-time occupancy status for each bed.
- Emergency Bed Allocation: Allocate beds quickly in critical situations.
- Sorting & Filtering: Filter beds based on status (occupied, vacant, under maintenance).


### 🩺 3. Patient Admission System
- Streamlined Process: Automate and simplify patient admissions for efficient processing.
- Integrated Patient Info: Store patient history and medical information for quick access.
- Coordination Tools: Integrated tools for doctor-nurse collaboration on patient care.

### 📦 4. Inventory Management
- Stock Monitoring: Track inventory levels of medicines and consumables.
- Automated Alerts: Receive notifications when stock is low or nearing expiry.
- Usage Analytics: Generate reports on inventory usage, helping with future stock forecasting.


### 🔐 5. User Roles and Authentication
- Role-Based Access: Different roles for Doctors, Patients, Nurses, and Admins.
- Secure Authentication: Secure login and data encryption for all users.
- Admin Control: Admins can manage user roles and system settings.

### 🌍 6. City-Wide Integration
- Data Sharing Across Hospitals: Centralized data sharing for a cohesive city-wide health management system.
- Scalable Architecture: Designed to scale across multiple hospitals and medical facilities in a city.

### 🤖 7. AI chatbot Integration
- Real-Time Healthcare Information: The chatbot offers up-to-date details on nearby hospitals and clinics, including specialties, contact information, operating hours, and locations.  

- Seamless Appointment Booking: Users can schedule online consultations or in-person visits by viewing and selecting available time slots with instant confirmation.  

- Bed and Slot Availability: The integration provides real-time updates on hospital bed availability and clinic appointment slots for better decision-making during emergencies or planned visits.
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">



## 🛠️ Tech Stack
### Frontend 🖥️
   - React.js
   - Redux
   - React Router
   - Axios
   - CSS3 / SASS
### Backend 💻
   - Node.js
   - Express.js
   - MongoDB (or PostgreSQL/MySQL)
   - RESTful APIs
   - JWT
### Deployment 🚀
   - Render
   - Netlify
### Other Tools 🔧
   -  Git & GitHub
   - Postman
   - ESLint & Prettier
   - TensorFlow (Python)
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🛠️ Installation Guide
### 🧩 Setup Steps
### 1. Clone the Repository
```bash
git clone https://github.com/btwshivam/MedSync.git
cd medsync
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run start
```

## Environment Variables Setup

### Backend (.env file)
Create a `.env` file in the `backend` directory with the following structure:

```env
DB_CONNECTION_STRING=
```

## Development

### Backend Development Server
```bash
cd server
npm run dev
```

### Frontend Development Server
```bash
cd client
npm start
```
- Start the Frontend Server
The frontend application should be running at `http://localhost:3000`
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## ⚠️ Troubleshooting
### Common Issues

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running locally or on the specified server.
   - Double-check your MongoDB connection string in the `.env` file to make sure it’s correct.
   - Verify that your firewall or network settings are not blocking the connection.
2. **Node Module Issues**
   - Try deleting node_modules and package-lock.json
   - Run `npm install` again

3. **Port Conflicts**
   - Check if ports 3001 and 3000 are available

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 📜 License
### This project is licensed under the [MIT License](LICENSE).

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

### ❤️ If you find this project helpful, please give us a ⭐ and share it with others!

