import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getDeletedUserCount, getUserCount } from '../../helpers/helper';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align items to the left
});

const DashboardBox = styled(Box)(({ theme }) => ({
  width: 300,
  margin: 10,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 4,
  padding: 16,
  boxShadow: theme.shadows[3],
  border: `2px solid ${theme.palette.primary.main}`,
  marginLeft:20,
}));

const DashboardText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  marginBottom: 5,
  fontWeight: 'bold',
  letterSpacing: 1,
}));

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [deletedUsers, setDeletedUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { usersCount } = await getUserCount();
        setTotalUsers(usersCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }

      try {
        const { usersCount } = await getDeletedUserCount();
        setDeletedUsers(usersCount);
      } catch (error) {
        console.error('Error fetching deleted users:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <DashboardContainer>
      {/* Box to display total users */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <DashboardBox>
          <AnimatePresence>
            {(totalUsers !== null && deletedUsers !== null) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DashboardText>
                  Main Users: <motion.span style={{ color: '#00ff99' }}>{totalUsers}</motion.span>
                </DashboardText>
                <DashboardText>
                  Deleted Users: <motion.span style={{ color: '#ffcc00' }}>{deletedUsers}</motion.span>
                </DashboardText>
                <DashboardText>
                  Total Users: <motion.span style={{ color: '#ff6699' }}>{totalUsers + deletedUsers}</motion.span>
                </DashboardText>
              </motion.div>
            )}
          </AnimatePresence>
        </DashboardBox>
      </motion.div>
    </DashboardContainer>
  );
};

export default Dashboard;
