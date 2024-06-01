'use client';
import React, { useState } from 'react';
import RestaurantLogin from '../_components/RestaurantLogin';
import RestaurantSignUp from '../_components/RestaurantSignUp';
import RestaurantHeader from '../_components/RestaurantHeader';
import Footer from '../_components/Footer';

const Restaurantpage = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
          <RestaurantHeader />
    <div style={containerStyle}>
      <h1 style={titleStyle}>Restaurants Login and SignUp Page</h1>
      {login ? <RestaurantLogin /> : <RestaurantSignUp />}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => setLogin(!login)}>
          {login ? 'Do not have login? Sign Up' : 'Already have Account? Login'}
        </button>
      </div>
    </div>
    <Footer />

    </>
  );
};

// Inline styles
const containerStyle = {
  margin: '20px auto',
  padding: '20px',
  maxWidth: '600px',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const buttonContainerStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor:'white',
  color: 'blue',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
 
export default Restaurantpage;
