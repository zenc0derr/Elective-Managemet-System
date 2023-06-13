import React from 'react';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-[#333] shadow-md p-[1px] text-left rounded-[12px]">
          <div className="mx-[13px] my-[19px] ">
            <p className="font-semibold ">Elective: {payload[0].payload.name}</p>
              <p>Enrolled : {payload[0].payload.Total}</p>
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  export default CustomTooltip;