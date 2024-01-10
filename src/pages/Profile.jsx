import React from 'react'
import SEO from "../seo/Seo";
import ProfileComponent from '../components/Auth/Profile';
const Profile = () => {
  return (
    <>
    <SEO title="CodeBox - Profile" description="CodeBox - Profile" name="CodeBox - Profile" type="Website" />
    <ProfileComponent />    
    </>
  )
}

export default Profile