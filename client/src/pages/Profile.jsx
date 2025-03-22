import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../store/userContext';
import '../styles/UserProfile.css';
import { databaseUrls } from '../data/databaseUrls';
import { FaUser, FaEdit, FaCalendarAlt, FaUserMd, FaPlus, FaPhone } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const ProfilePage = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle the modal visibility
  const [editData, setEditData] = useState({}); // For storing the editable data
  const [isAddingDoctor, setIsAddingDoctor] = useState(false); // To toggle the Add doctor modal visibility
  const [doctorData, setDoctorData] = useState({}); // For storing the new doctor data
  const [isLoading, setIsLoading] = useState(true);
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  useEffect(() => {
    // Fetch the user data if authenticated
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          setIsLoading(true);
          const response = await fetch(databaseUrls.auth.profile, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token'),
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  // Fallback for when user data is not available yet
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading profile information...</span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-page">
        <h2>No profile data available</h2>
        <p>Unable to retrieve your profile information at this time.</p>
      </div>
    );
  }

  const isHospital = userData.departments && userData.availableServices;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...userData }); // Populate the edit form with current user data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorDataChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorScheduleDataChange = (e) => {
    var { name, value } = e.target;
    const day = name.split('-')[0];
    if (value === ' ') {
      value = '';
    }

    setDoctorData((prevData) => {
      const prevSchedule = prevData.opdSchedule ? prevData.opdSchedule : {};
      prevSchedule[day] = value;
      return { ...prevData, opdSchedule: prevSchedule };
    });
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const handleConfirmEdit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(databaseUrls.auth.editProfile, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Update the local state with the edited data
        setIsEditing(false); // Close the modal
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAddDoctor = async () => {
    try {
      setIsLoading(true);
      const postData = {
        id: userData.id,
        doctor: doctorData,
      };
      const response = await fetch(databaseUrls.auth.addDoctor, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Update the local state with the edited data
        setIsAddingDoctor(false); // Close the modal
        setDoctorData({}); // Reset doctor data
      } else {
        console.error('Failed to add new doctor');
      }
    } catch (error) {
      console.error('Error adding new doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Close the modal without saving changes
  };

  const handleCancelAddDoctor = () => {
    setIsAddingDoctor(false); // Close the modal without saving changes
    setDoctorData({}); // Reset doctor data
  };

  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Get status badge class based on appointment status
  const getStatusBadgeClass = (status) => {
    status = status.toLowerCase();
    if (status === 'confirmed') return 'status-badge status-confirmed';
    if (status === 'pending') return 'status-badge status-pending';
    if (status === 'cancelled') return 'status-badge status-cancelled';
    return 'status-badge';
  };

  return (
    <>
      <div className="user-page">
        <div className="header">
          <h2>{isHospital ? 'Hospital Profile' : 'User Profile'}</h2>
          <button className="edit-btn" onClick={handleEditClick}>
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* User Profile Grid */}
        <div className="profile-grid">
          {/* Avatar Section */}
          <div className="profile-avatar">
            <div className="avatar-image">
              {getInitial(userData.name)}
            </div>
            <h3 className="profile-name">{userData.name}</h3>
            <p className="profile-role">{isHospital ? 'Healthcare Provider' : 'Patient'}</p>
            
            <div className="mt-4">
              <p><MdEmail /> {userData.email}</p>
              <p><FaPhone /> {userData.phone || 'No phone number'}</p>
              {isHospital && userData.address && (
                <p><MdLocationOn /> {`${userData.address?.city || ''}, ${userData.address?.state || ''}`}</p>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="user-info">
            <h3>Personal Information</h3>
            
            <div className="info-grid">
              {isHospital ? (
                <>
                  <p>
                    <strong>Full Address</strong>
                    {`${userData.address?.street || 'N/A'}, ${
                      userData.address?.city || 'N/A'
                    }, ${userData.address?.state || 'N/A'}`}
                  </p>
                  <p>
                    <strong>Rating</strong>
                    {userData.ratings || 'N/A'}/5
                  </p>
                  <p>
                    <strong>Departments</strong>
                    {userData.departments.join(', ') || 'N/A'}
                  </p>
                  <p>
                    <strong>Available Services</strong>
                    {userData.availableServices.join(', ') || 'N/A'}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Date of Birth</strong>
                    {new Date(userData.dob).toLocaleDateString() || 'N/A'}
                  </p>
                  <p>
                    <strong>Gender</strong>
                    {userData.gender || 'N/A'}
                  </p>
                  <p>
                    <strong>Medical History</strong>
                    {userData.medicalHistory?.join(', ') || 'None'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-section">
          <h3>
            <FaCalendarAlt /> Appointments
          </h3>
          {userData.appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>{isHospital ? 'Patient' : 'Hospital'}</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      {isHospital
                        ? appointment.userId?.name || 'N/A'
                        : appointment.hospitalId?.name || 'N/A'}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(appointment.status)}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Doctors Section */}
        <div className="doctors-section">
          <div className="doctors-header">
            <h3>
              <FaUserMd /> Doctors
            </h3>
            <button
              className="add-btn"
              onClick={() => {
                setIsAddingDoctor(true);
              }}
            >
              <FaPlus /> Add Doctor
            </button>
          </div>
          
          {!userData.doctors || userData.doctors.length === 0 ? (
            <p>No doctors added.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {userData.doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.department}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      {doctor.opdSchedule &&
                      Object.values(doctor.opdSchedule).some(
                        (value) => value !== null,
                      ) ? (
                        <p>
                          {Object.keys(doctor.opdSchedule)
                            .filter((day) => doctor.opdSchedule[day] !== null)
                            .map((day) => capitalizeFirstLetter(day))
                            .join(', ')}
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {!isHospital && (
              <>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={
                      editData.dob
                        ? new Date(editData.dob).toISOString().substr(0, 10)
                        : ''
                    }
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                  >
                    <option value="N/A">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}
            
            {isHospital && (
              <>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address.street"
                    value={editData.address?.street || ''}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          street: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={editData.address?.city || ''}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          city: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={editData.address?.state || ''}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          state: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </>
            )}
            
            <div className="modal-actions">
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleConfirmEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {isAddingDoctor && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Doctor</h3>
            
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="name"
                value={doctorData.name || ''}
                onChange={handleDoctorDataChange}
                placeholder="Enter doctor's name"
              />
            </div>
            
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={doctorData.department || ''}
                onChange={handleDoctorDataChange}
                placeholder="Enter doctor's department"
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={doctorData.phone || ''}
                onChange={handleDoctorDataChange}
                placeholder="Enter doctor's phone number"
              />
            </div>
            
            <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>OPD Schedule</h4>
            
            {days.map((day) => (
              <div className="form-group" key={day}>
                <label>{capitalizeFirstLetter(day)}</label>
                <input
                  type="text"
                  name={`${day}-schedule`}
                  value={
                    doctorData.opdSchedule && doctorData.opdSchedule[day]
                      ? doctorData.opdSchedule[day]
                      : ''
                  }
                  onChange={handleDoctorScheduleDataChange}
                  placeholder="e.g. 9:00 AM - 5:00 PM"
                />
              </div>
            ))}
            
            <div className="modal-actions">
              <button onClick={handleCancelAddDoctor}>Cancel</button>
              <button onClick={handleConfirmAddDoctor}>Add Doctor</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
