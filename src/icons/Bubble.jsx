import React, { useEffect } from 'react';

const Bubble = ({color}) => {
  useEffect(() => {
    console.log(color);
  }, [color]);

  return(
  <svg width="50" height="50" viewBox="0 0 50 50" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path 
    d="M7.2915 39.5833C8.12031 39.5833 8.91516 39.9126 9.50121 40.4986C10.0873 41.0847 10.4165 41.8795 10.4165 42.7083C10.4165 43.5371 10.0873 44.332 9.50121 44.918C8.91516 45.5041 8.12031 45.8333 7.2915 45.8333C6.4627 45.8333 5.66785 45.5041 5.0818 44.918C4.49574 44.332 4.1665 43.5371 4.1665 42.7083C4.1665 41.8795 4.49574 41.0847 5.0818 40.4986C5.66785 39.9126 6.4627 39.5833 7.2915 39.5833ZM17.7082 33.3333C19.0895 33.3333 20.4143 33.8821 21.391 34.8588C22.3678 35.8356 22.9165 37.1603 22.9165 38.5417C22.9165 39.923 22.3678 41.2478 21.391 42.2245C20.4143 43.2013 19.0895 43.75 17.7082 43.75C16.3268 43.75 15.0021 43.2013 14.0253 42.2245C13.0486 41.2478 12.4998 39.923 12.4998 38.5417C12.4998 37.1603 13.0486 35.8356 14.0253 34.8588C15.0021 33.8821 16.3268 33.3333 17.7082 33.3333ZM30.2082 31.25C27.729 31.25 25.479 30.2083 23.9582 28.4375C22.4373 30.2083 20.1873 31.25 17.7082 31.25C13.6248 31.25 10.229 28.3125 9.52067 24.4583C7.94734 23.8499 6.59441 22.7805 5.63905 21.3902C4.6837 19.9999 4.17044 18.3536 4.1665 16.6667C4.1665 14.4565 5.04448 12.3369 6.60728 10.7741C8.17008 9.21131 10.2897 8.33333 12.4998 8.33333C13.0415 8.33333 13.5415 8.39583 14.104 8.47917C15.6248 7.10417 17.604 6.25 19.7915 6.25C22.2707 6.25 24.5207 7.29167 26.0415 9.0625C27.5623 7.29167 29.8123 6.25 32.2915 6.25C36.3748 6.25 39.7707 9.1875 40.479 13.0417C42.0523 13.6501 43.4053 14.7195 44.3606 16.1098C45.316 17.5001 45.8292 19.1464 45.8332 20.8333C45.8332 23.0435 44.9552 25.1631 43.3924 26.7259C41.8296 28.2887 39.71 29.1667 37.4998 29.1667L35.8957 29.0208C34.3748 30.3958 32.3957 31.25 30.2082 31.25Z" 
    />
  </svg>
);
}

export default Bubble;