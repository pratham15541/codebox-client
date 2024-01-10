import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getUserCount } from '../../helpers/helper';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const {usersCount} = await getUserCount();
        setTotalUsers(usersCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      {/* Box to display total users */}
      <Box
        border={1}
        borderColor="primary.main"
        borderRadius={4}
        p={2}
        mt={2}
      >
        <h3>Total Users: {totalUsers !== null ? totalUsers : 'Loading...'}</h3>
      </Box>
    </div>
  );
};

export default Dashboard;
