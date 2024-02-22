import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Container, Grid } from '@mui/material';
import Dashboard from './Dashboard';
import User from './User';
import DeletedUser from './DeletedUser';
import GetAllUserCodes from './GetAllUserCodes';

const AdminMain = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  const handleSidebarItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Grid container >
      {/* Sidebar */}
      <Grid item style={{ width: 150 }}>
        <Sidebar onItemClick={handleSidebarItemClick} selectedComponent={selectedComponent} />
      </Grid>

      {/* Main Content */}
      <Grid item xs>
        <Container>
          {/* Render the selected component in the main content area */}
          {selectedComponent === 'dashboard' && <Dashboard />}
          {selectedComponent === 'user' && <User />}
          {selectedComponent === 'deletedUser' && <DeletedUser />}
          {selectedComponent === 'getAllCodesByUsername' && <GetAllUserCodes />}
        </Container>
      </Grid>
    </Grid>
  );
};

export default AdminMain;
