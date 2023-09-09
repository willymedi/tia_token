import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Countdown({ initialTime, token, getToken }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  
  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
      else {
        getToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, getToken]);

  return (
    <div>
      <h1>{token}</h1>
      <p>Time remaining: {timeRemaining} seconds</p>
    </div>
  );
}

Countdown.propTypes = {
  initialTime: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default Countdown;
