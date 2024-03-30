import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { Riple } from 'react-loading-indicators';

const getLocalStorageValue = (key) => localStorage.getItem(key);
const setLocalStorageValue = (key, value) => localStorage.setItem(key, value);
const removeLocalStorageValue = (key) => localStorage.removeItem(key);

const Completionist = () => (
  <span>
    <Riple color="#0411b0" size="small" text="" textColor="" />
  </span>
);

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
const completed = (Item) => {};

const CountDown = ({ Seconds, Item, id, closeIt }) => {
  const [timeDone, setTimeDone] = useState(false);
  const [data, setData] = useState({
    date: Date.now(),
    delay: Seconds * 1000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your fetch logic here...
      } catch (error) {
        // console.error('Error making GET request', error);
        // Handle error
      }
    };

    fetchData(); // Call the fetch function when the component mounts or when Seconds prop changes
  }, [Seconds]);

  useEffect(() => {
    const savedDate = getLocalStorageValue(`end_date_${id}`);
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > data.delay) {
        // Clear the saved end date if the countdown is completed
        if (localStorage.getItem(`end_date_${id}`).length > 0)
          removeLocalStorageValue(`end_date_${id}`);
      } else {
        // Update the end date with the current date
        setData((prevData) => ({
          ...prevData,
          date: currentTime,
          delay: delta,
        }));
      }
    }
  }, [data.delay, id]);

  return (
    <div>
      <div>
        <Countdown
          date={data.date + data.delay}
          renderer={renderer}
          onStart={(delta) => {
            // Save the end date
            if (getLocalStorageValue(`end_date_${id}`) == null)
              setLocalStorageValue(
                `end_date_${id}`,
                JSON.stringify(data.date + data.delay),
              );
          }}
          onComplete={() => {
            // Remove the end date from localStorage when the countdown is completed

            if (getLocalStorageValue(`end_date_${id}`) != null)
              removeLocalStorageValue(`end_date_${id}`);
            try {
              Axios.post(
                `https://test.safepauleni.site/api/porto/Finished/`,
                Item,
              )
                // Redirect to '/' route
                .catch((err) => console.log(''));
              // console.log(Item)
              Axios.post(
                `https://test.safepauleni.site/api/porto/wait/${Item['_id']}`,
              )
                .then((res) => {
                  console.log('Done');
                  closeIt();
                })
                // Redirect to '/' route
                .catch((err) => console.log(''));
            } catch (error) {
              // console.error('Error making POST request', error);
              // Handle error
            }
          }}
        />
      </div>
    </div>
  );
};

export default CountDown;
