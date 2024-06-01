import React from "react";

const RestaurantLogin = () => {
  const containerStyle = {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    marginRight: '10px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    borderRadius: '3px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <h1>Login Page</h1>
      <div>
        <label style={labelStyle}>Email Id:</label>
        <input type="text" style={inputStyle} placeholder="Enter an Email"/>
        <br/>
        <label style={labelStyle}>Password:</label>
        <input type="password" style={inputStyle} placeholder="Enter a Password"/>
        <br/>
        <button style={buttonStyle}>Submit</button>
      </div>
    </div>
  );
};

export default RestaurantLogin;
