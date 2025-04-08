import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'; 
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';

const FeedbackComponent = () => {


  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.body.className = newMode ? 'dark-theme' : 'light-theme';
  };


  const correctPin = '2025';
  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) {
      setDarkMode(savedMode);
      document.body.className = savedMode ? 'dark-theme' : 'light-theme';
    }
    const authCookie = Cookies.get('feedbackAuth');
    if (authCookie) {
      setAuthenticated(true);
      fetchFeedbackData();
    }
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      setAuthenticated(true);
      Cookies.set('feedbackAuth', true, { expires: 1 });
      fetchFeedbackData();
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const fetchFeedbackData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://fallon-studio.onrender.com/Fallon/getFeedbacks');
      setFeedbackData(response.data.data);
    } catch (err) {
      setError('Failed to fetch feedback data. Please try again later.');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {  
    const colors = [
      '#FFE4E1', 
      '#E0FFFF', 
      '#F0FFF0', 
      '#FFF0F5', 
      '#F5F5DC', 
      '#E6E6FA', 
      '#FFF8DC', 
      ];
    return colors[Math.floor(Math.random() * colors.length)];
  };


  if (!authenticated) {
    return (
      <div className="pin-auth-container">
        <h2>Admin Dashboard</h2>
        <p>Please enter your 4-digit PIN to access feedback data</p>
        <form onSubmit={handlePinSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength="4"
            pattern="\d{4}"
            inputMode="numeric"
            required
            placeholder="Enter 4-digit PIN"
          />
          <button type="submit"> Submit </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`container-fluid feedback-container p-3 p-md-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
    <div className="row mb-3 mb-md-4">
        <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h1 className='fw-bold mb-0'>Admin Dashboard</h1>

                <div className="d-flex align-items-center">
                    <button 
                        onClick={() => toggleDarkMode()}
                        className={`btn btn-sm me-2 ${darkMode ? 'btn-light' : 'btn-dark'}`}
                    >
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={() => {
                            setAuthenticated(false);
                            Cookies.remove('feedbackAuth');
                            setPin('');
                        }}
                        className="btn btn-outline-danger btn-sm">
                        Logout
                    </button>
                </div>
            </div>
            <h2 className='fw-bold'>Customer Feedback</h2>
        </div>
    </div>

    <div className="row">
        <div className="col-12">
            {loading && <div className={`alert ${darkMode ? 'alert-info' : 'alert-primary'} d-flex text-center gap-4`}><Spinner/> <h3 className='text-danger'>Loading feedback data...</h3></div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    </div>

    <div className="row g-3">
        {feedbackData.length > 0 ? (
            feedbackData.map((feedback, index) => (
                <div 
                    key={index}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                    <div 
                        className={`card h-100 feedback-card ${darkMode ? 'bg-secondary text-white' : ''}`}
                        style={{ backgroundColor: darkMode ? '' : getRandomColor() }}
                    >
                        <div className="card-body">
                            <div className="feedback-header mb-2">
                                <h3 className={`h5 fw-bold mb-1 ${darkMode ? 'bg-secondary text-white' : ''}`}>{feedback.name}</h3>
                                <p className={`feedback-email mb-2 ${darkMode ? 'text-light' : 'text-muted'}`}>{feedback.email}</p>
                            </div>
                            <p className={`feedback-message mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
                                <b>Message:</b> {feedback.message}
                            </p>
                        </div>
                        <p >
                      <span className={`feedback-date ${darkMode ? 'text-light' : 'text-muted'}`}>
                        {new Date(feedback.date).toLocaleDateString()}
                      </span>{' '}
                      <span className={`feedback-time  ${darkMode ? 'text-light' : 'text-muted'}`}>
                        {new Date(feedback.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                      </span>
                    </p>

                    </div>
                </div>
            ))
        ) : (
            !loading && <div className="col-12 ">
                <div className={`alert ${darkMode ? 'alert-warning' : 'alert-info'}`}>No feedback data available</div>
            </div>
        )}
    </div>
</div>
  )
};

export default FeedbackComponent;


