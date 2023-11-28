import React, { useState } from 'react';
import './Tooltip.scss';

const Tooltip = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="tooltip-container">
      <div className="tooltip-trigger" onMouseOver={showTooltip} onMouseOut={hideTooltip}>
        {children}
      </div>
      {isTooltipVisible && (
        <div className="tooltip">
          <div className="tooltip-content">{text}</div>
          <div className="arrow-up"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;