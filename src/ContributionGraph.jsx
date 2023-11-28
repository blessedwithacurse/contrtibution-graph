import React, { useEffect, useState } from 'react';
import './styles.scss';
import Tooltip from './components/Tooltip';

const ContributionGraph = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetch('https://dpg.gg/test/calendar.json')
      .then(response => response.json())
      .then(data => setContributions(data))
      .catch(error => console.error('Error fetching contributions:', error));
  }, []);

  const weekdays = ['Mon', 'Wed', 'Fri'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();
  const contributionDataArray = Object.entries(contributions).map(([date, count]) => ({
    date,
    count
  }));
  return (
    <div className='wrapper'>
     <div className='days-of-week'>
        {weekdays.map((day, index) => (
          <div key={index} className="day-of-week">{day}</div>
        ))}
      </div>
      <div id="contributionGraph">
       <div className='month-container'>{months.map((month, index) => (
          <div key={index} className="month">{month}</div>
        ))}</div>
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 51 }, (_, col) => {
              const cellDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (col + row * 51));
              const dateString = cellDate.toISOString().split('T')[0];
          
              const contributionData = contributionDataArray.find(entry => entry.date == dateString);
              const count = contributionData ? contributionData.count : 0;
              return (
                <Tooltip 
                  key={`${row}-${col}`} 
                  text={<div className='additional-info'>
                          <span className='count-info'>{`${count} Contributions`}</span>
                          <span className='date-info'>{dateString} </span>
                        </div>}
                >
                   <div
                    className="contribution-cell"
                    style={{ backgroundColor: getBackgroundColor(count) }}
                  >
                  </div>
                </Tooltip>
              );
            })
          )}
      </div>
    </div>
  );
};

function getBackgroundColor(count) {
  if (count === 0) {
    return '#EDEDED';
  } else if (count >= 1 && count <= 9) {
    return '#ACD5F2';
  } else if (count >= 10 && count <= 19) {
    return '#7FA8C9';
  } else if (count >= 20 && count <= 29) {
    return '#527BA0';
  } else {
    return '#254E77';
  }
}

export default ContributionGraph;
