import Spellchecker from "hunspell-spellchecker";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RestaurantSignUp = () => {
  const containerStyle = {
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "400px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    marginRight: "10px",
    fontWeight: "bold",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    width: "100%",
    borderRadius: "3px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };
  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
  };

  const [data, setData] = useState({});
  const [passwordError, setPasswordError] = useState(false);
  const [spellErrors, setSpellErrors] = useState({});
  const [spellChecker, setSpellChecker] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const affResponse = await fetch("/dictionary/index.aff");
        const dicResponse = await fetch("/dictionary/index.dic");
  
        const affData = await affResponse.text();
        const dicData = await dicResponse.text();
  
        console.log("Aff data:", affData);
        console.log("Dic data:", dicData);
  
        const spellChecker = new Spellchecker();
        const dict = spellChecker.parse({ aff: affData, dic: dicData });
  
        spellChecker.use(dict);
        console.log("Spellchecker initialized:", spellChecker);
        setSpellChecker(spellChecker);
      } catch (error) {
        console.error("Error loading dictionary files:", error);
      }
    };
  
    loadDictionary();
  }, []);
  

  const validateSpelling = (text, field) => {
    console.log("Validating spelling for field:", field);
    if (!spellChecker) {
      console.log("Spellchecker not initialized");
      return;
    }
  
    const words = text.split(" ");
    const errors = {};
  
    words.forEach((word) => {
      if (!spellChecker.check(word)) {
        const suggestions = spellChecker.suggest(word);
        console.log("Suggestions for", word, ":", suggestions);
        errors[word] = suggestions.length > 0 ? suggestions : ["No suggestions"];
      }
    });
  
    console.log("Spelling errors:", errors);
  
    setSpellErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errors,
    }));
  };
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    validateSpelling(value, name);
  };

  const handleSubmit = async () => {
    if (data.password !== data.confirmPass) {
      setPasswordError(true);
    } else {
      setPasswordError(false);

      try {
        let response = await fetch("/api/restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        response = await response.json();
        if (response.success) {
          const { result } = response;
          delete result.password;
          localStorage.setItem("restaurantUser", JSON.stringify(result));
          router.push("restaurant/dashboard");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Sign Up Page</h1>
      <div>
        <label style={labelStyle}>Restaurant Name:</label>
        <input
          type="text"
          style={inputStyle}
          name="restaurantName"
          placeholder="Enter Restaurant Name"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.restaurantName && Object.keys(spellErrors.restaurantName).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.restaurantName).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        <label style={labelStyle}>City Name:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter City Name"
          name="cityName"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.cityName && Object.keys(spellErrors.cityName).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.cityName).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        <label style={labelStyle}>Full Address:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter Full Address"
          name="address"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.address && Object.keys(spellErrors.address).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.address).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        <label style={labelStyle}>Contact No.:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter Contact No"
          name="contact"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.contact && Object.keys(spellErrors.contact).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.contact).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        <label style={labelStyle}>Email:</label>
        <input
          type="text"
          style={inputStyle}
          name="email"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.email && Object.keys(spellErrors.email).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.email).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        <label style={labelStyle}>Enter Password:</label>
        <input
          type="password"
          style={inputStyle}
          name="password"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        <br />
        <label style={labelStyle}>Confirm Password:</label>
        <input
          type="password"
          style={inputStyle}
          name="confirmPass"
          onChange={(event) => {
            setData({ ...data, [event.target.name]: event.target.value });
            validateSpelling(event.target.value, event.target.name);
          }}
          required
        />
        {spellErrors.confirmPass && Object.keys(spellErrors.confirmPass).length > 0 && (
          <div style={{ color: "red" }}>
            {Object.entries(spellErrors.confirmPass).map(([word, suggestions]) => (
              <div key={word}>
                {word}: {suggestions.join(', ')}
              </div>
            ))}
          </div>
        )}
        <br />
        {passwordError && (
          <div style={{ color: "red" }}>
            Confirm password not matching with password
          </div>
        )}
        <br />
        <button type="submit" onClick={handleSubmit} style={buttonStyle}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default RestaurantSignUp;
