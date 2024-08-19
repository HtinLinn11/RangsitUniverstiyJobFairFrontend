import React, { useState } from 'react';
import JobTable from "../../components/aj/JobTable";
import JobTableFaculty from "../../components/aj/JobTableFaculty";

const JobApprove: React.FC = () => {
  // State to manage the visibility
  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsTableVisible(prevVisibility => !prevVisibility);
  };

  return (
    
    <div className="w-full h-screen pt-24 flex flex-col items-center">
      
      <button 
        onClick={toggleVisibility} 
        className="mb-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        style={{ backgroundColor: '#5A7131'}}>
        {isTableVisible ? 'Show Approved Jobs' : 'Show All Jobs'}
      </button>
      {/* Button to toggle visibility */}
      
      {/* Conditionally render the JobTable or Lorem Ipsum text */}
      {isTableVisible ? (
        <JobTable faculty="COLLEGE_OF_DIGITAL_INNOVATION_TECH" />
      ) : (
        <JobTableFaculty faculty="COLLEGE_OF_DIGITAL_INNOVATION_TECH" />
      )}
    </div>
  );
};

export default JobApprove;
