import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import backgroundImage from './imagem.jpg';

const PerfilReact = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data or use your authentication context to get the user information
    // For demonstration purposes, let's assume user data is fetched from an API
    fetch("http://localhost:8001/api/user") // Update the API endpoint
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>User Profile</h2>
      {userData ? (
        <Card style={{ width: "18rem", margin: "auto" }}>
          <Card.Body>
            <Card.Title>{userData.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {userData.email}
            </Card.Text>
            {/* Add more user details as needed */}
            <Button variant="primary">Edit Profile</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
    </div>

  );
};

export default PerfilReact;
