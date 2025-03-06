
import React, { act, useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import { useTranslation } from 'react-i18next'; 
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';


const Name = () => {
  const { user, updateUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // Track which modal is open
  const { t, i18n } = useTranslation();
  const [translatedTitles, setTranslatedTitles] = useState({});
 

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    gender: user.gender || '',
    dob: user.dob || '',
    height: user.height || '',
    weight: user.weight || ''
  });


  useEffect(() => {
    const updateTranslations = async () => {
      const translations = {
        contactUs: await translateText('Contact Us', i18n.language),
        privacyPolicy: await translateText('Privacy Policy', i18n.language),
        settings: await translateText('Settings', i18n.language),
        language: await translateText('Language', i18n.language),
        other: await translateText('Other', i18n.language),
        account: await translateText('Account', i18n.language),
        personalData: await translateText('Personal Data', i18n.language),
        achievement: await translateText('Achievement', i18n.language),
        activityHistory: await translateText('Activity History', i18n.language),
        workoutProgress: await translateText('Workout Progress', i18n.language),
        profile: await translateText('Profile', i18n.language),
        height: await translateText('Height', i18n.language),
        weight: await translateText('Weight', i18n.language),
        age: await translateText('Age', i18n.language),
        gender: await translateText('Gender', i18n.language),
        name: await translateText('Name', i18n.language),
        email: await translateText('Email', i18n.language),
        userDetails: await translateText('User Details', i18n.language),
        changePassword: await translateText('Change Password', i18n.language),
        dob: await translateText('Date of Birth', i18n.language),
        updateProfile: await translateText('Update Profile Information', i18n.language),
        send: await translateText('Send', i18n.language),
        close: await translateText('Close', i18n.language),
        message: await translateText('Message', i18n.language),
        updateProfileInfo: await translateText('Update Profile Information', i18n.language),
      };
      setTranslatedTitles(translations);
    };

    updateTranslations();
  }, [i18n.language]);



  useEffect(() => {
    setProfileInfo({
      name: user.name || '',
      email: user.email || '',
      gender: user.gender || '',
      dob: user.dob || '',
      height: user.height || '',
      weight: user.weight || ''
    });
  }, [user]);

  const openModal = (modalName) => {
    if (!activeModal) {
      setActiveModal(modalName);
    }
  };

  const closeModal = () => {
    if (activeModal === 'contact') {
        setEmail('');
        setMessage('');
    }
    setActiveModal(null);
  };




  const handleSend = async () => {
    if (!email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not logged in. Please log in and try again.');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/contact`,
        { email, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          theme: 'dark',
        });
        setEmail('');
        setMessage('');
        closeModal(); // Close the modal after submission
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Contact API Error:', error.response);
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      toast.error('Please enter a new password.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not logged in. Please log in and try again.');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully!', {
          position: 'top-right',
          theme: 'dark',
        });
        setNewPassword('');
        closeModal();
      } else {
        toast.error('Failed to change password.');
      }
    } catch (error) {
      console.error('Change Password API Error:', error.response);
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not logged in. Please log in and try again.');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
        profileInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!', {
          position: 'top-right',
          theme: 'dark',
        });
        updateUser({ ...user, ...profileInfo }); // Merge the updated profile info with the existing user data
        closeModal();
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Update Profile API Error:', error.response);
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="rounded flex items-center py-4 px-3">
        <i className="ri-arrow-left-s-line text-4xl" onClick={() => navigate('/home')}></i>
        <div className="text-center w-full font-bold text-3xl">
          <h1>{translatedTitles.profile}</h1>
          </div>
      </div>

      {/* User Info Section */}
      <div className="p-4 glass flex flex-col rounded-lg mx-5 gap-4">
        <div className="flex items-center justify-around">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <img src="/public/welcome.png" alt="User Avatar" />
            </div>
          </div>
          <div className='bg-black bg-opacity-5 py-6 px-8 rounded-lg text-center'>
            <h2 className="text-2xl text-blue-400 font-semibold"> {user.name || 'Guest'}</h2>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="flex items-center gap-4 justify-around w-full">
          <div className="p-2 bg-black bg-opacity-50 w-1/3 rounded-lg text-center">
            <p className="text-xl text-blue-400 font-semibold">{user.height || 'N/A'} ft</p>
            <p className="text-base text-gray-200">{ translatedTitles.height }</p>
          </div>
          <div className="p-2 bg-black bg-opacity-50 w-1/3 rounded-lg text-center">
            <p className="text-xl text-blue-400 font-semibold">{user.weight || 'N/A'} kg</p>
            <p className="text-base text-gray-200">{translatedTitles.weight}</p>
          </div>
          <div className="p-2 bg-black bg-opacity-50 w-1/3 rounded-lg text-center">
            <p className="text-xl text-blue-400 font-semibold">
              {user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : 'N/A'} yo
            </p>
            <p className="text-base text-gray-200">{translatedTitles.age}</p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="p-4 bg-black bg-opacity-50 rounded-lg mx-5 mt-8">
        <h2 className="font-bold text-2xl mb-4">{translatedTitles.account}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal('personalData')}>
            <div className="flex items-center gap-2">
              <i className="ri-user-line text-blue-400 text-2xl"></i>
              <span className="text-2xl text-blue-400 mb-2">{translatedTitles.personalData}</span>
            </div>
            <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
          </div>
        </div>

        <div className="flex justify-between items-center cursor-pointer" onClick={() => navigate('/achievement')}>
          <div className="flex items-center gap-2">
            <i className="ri-award-line text-blue-400 text-2xl"></i>
            <span className="text-2xl text-blue-400 mb-2">{translatedTitles.achievement }</span>
          </div>
          <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
        </div>

        <div className="flex justify-between items-center cursor-pointer" onClick={() => navigate('/activity-history')}>
          <div className="flex items-center gap-2">
            <i className="ri-history-line text-blue-400 text-2xl"></i>
            <span className="text-2xl text-blue-400 mb-2">{translatedTitles.activityHistory}</span>
          </div>
          <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
        </div>

        <div className="flex justify-between items-center cursor-pointer" onClick={() => navigate('/workout-progress')}>
          <div className="flex items-center gap-2">
            <i className="ri-bar-chart-line text-blue-400 text-2xl"></i>
            <span className="text-2xl text-blue-400 mb-2">{translatedTitles.workoutProgress}</span>
          </div>
          <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
        </div>
      </div>

      {/* Modal for Personal Data */}
      {activeModal === 'personalData' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{translatedTitles.personalData}</h2>
            <ul className="space-y-2">
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.name}:</strong> {user.name || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.email}:</strong> {user.email || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.gender}:</strong> {user.gender || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.dob}:</strong> {user.dob ? new Date(user.dob).toLocaleDateString('en-GB') : 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.height}:</strong> {user.height || 'N/A'} ft</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{translatedTitles.weight}:</strong> {user.weight || 'N/A'} kg</li>
              {user.logs && Array.isArray(user.logs) ? (
                <li>
                  <strong>Logs:</strong>
                  <ul>
                    {user.logs.map((log, index) => (
                      <li key={index}>
                        <p>{JSON.stringify(log)}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
              {translatedTitles.close}
            </button>
          </div>
        </div>
      )}




          {/* Contact Us Modal */}
        
                 <div className="p-4 bg-black bg-opacity-50 rounded-lg mx-5 mt-8">
                 <h2 className="font-bold text-2xl mb-4">{translatedTitles.other}</h2>
            
                 <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal('contact')}>
                     <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-2xl text-blue-400"></i>
                       <span className="text-2xl text-blue-400 mb-2">{translatedTitles.contactUs}</span>
                     </div>
                    <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
                 </div>
                
                
                 <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal('policy')}>
                     <div className="flex items-center gap-2">
                       <i className="ri-award-line text-blue-400 text-2xl"></i>
                       <h2 className="text-2xl text-blue-400 mb-2">{translatedTitles.privacyPolicy}</h2>
                     </div>
                     <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
                 </div>
                
        
                 <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal('setting')}>
                     <div className="flex items-center gap-2">
                     <i className="ri-settings-2-line text-2xl text-blue-400"></i>
                      <span className="text-2xl text-blue-400 mb-2">{translatedTitles.settings}</span>
                     </div>
                     <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
                 </div>

                 <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal('language')}>
          <div className="flex items-center gap-2">
            <i className="ri-global-line text-2xl text-blue-400"></i>
            <span className="text-2xl text-blue-400 mb-2">{translatedTitles.language}</span>
          </div>
          <i className="ri-arrow-right-s-line text-3xl text-blue-400"></i>
        </div>
        </div>


      {/* Contact Us Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{translatedTitles.contactUs}</h2>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{translatedTitles.email}:</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{translatedTitles.message}:</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              className="w-full bg-blue-400 text-white py-2 rounded-lg"
              onClick={handleSend}
            >
             {translatedTitles.send}
            </button>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
              {translatedTitles.close}
            </button>
          </div>
        </div>
      )}

      

 {/* Language Selection Modal */}
 {/* {activeModal === 'language' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{t('Select Language')}</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('en')}>English</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('es')}>Español</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('fr')}>Français</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('de')}>Deutsch</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('hi')}>हिन्दी</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('ur')}>اردو</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('zh')}>中文</li>
              <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('ar')}>العربية</li>
            </ul>
            <button className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full" onClick={closeModal}>{t('Close')}</button>
          </div>
        </div>
      )} */}


      {/* {activeModal === 'language' && <LanguageModal closeModal={closeModal} />} */}
      {activeModal === 'language' && <LanguageModal closeModal={() => setActiveModal(null)} />}

      {/* Modal for Privacy Policy */}
      {activeModal === 'policy' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{ translatedTitles.privacyPolicy}</h2>
            <p>
              {/* Add your privacy policy content here */}
            </p>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
             {translatedTitles.close}
            </button>
          </div>
        </div>
      )}

      {/* Modal for Settings */}
      {activeModal === 'setting' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{translatedTitles.settings}</h2>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{translatedTitles.changePassword}:</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                className="w-full bg-blue-400 text-white py-2 rounded-lg mt-2"
                onClick={handleChangePassword}
              >
                {translatedTitles.changePassword}
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{translatedTitles.updateProfileInfo}:</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.name}
                onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                placeholder="Enter new name"
              />
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.email}
                onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                placeholder="Enter new email"
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.gender}
                onChange={(e) => setProfileInfo({ ...profileInfo, gender: e.target.value })}
                placeholder="Enter new gender"
              />
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.dob}
                onChange={(e) => setProfileInfo({ ...profileInfo, dob: e.target.value })}
                placeholder="Enter new date of birth"
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.height}
                onChange={(e) => setProfileInfo({ ...profileInfo, height: e.target.value })}
                placeholder="Enter new height"
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white mb-2"
                value={profileInfo.weight}
                onChange={(e) => setProfileInfo({ ...profileInfo, weight: e.target.value })}
                placeholder="Enter new weight"
              />
              <button
                className="w-full bg-blue-400 text-white py-2 rounded-lg"
                onClick={handleUpdateProfile}
              >
                {translatedTitles.updateProfile}
              </button>
            </div>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
             {translatedTitles.close}
            </button>
          </div>
          </div>
        )}
        <ToastContainer />
    </>
  );
};

export default Name;





