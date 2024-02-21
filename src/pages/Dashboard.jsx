import React from "react";
import SEO from "../seo/Seo";
import UserDashboard from '../components/dashboard/Dashboard'

const Dashboard = () => {
  return (
    <div>
      <SEO
        title="CodeBox - Dashboard"
        description="CodeBox - Dashboard"
        name="CodeBox - Dashboard"
        type="Website"
      />
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
