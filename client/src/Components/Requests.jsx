import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {
  const [interactions, setInteractions] = useState([]);

  const fetchRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        //owner 0 is a placeholder for the owner id
        "http://localhost:4000/api/interactions/owner/0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInteractions(res.data.interactions);
    } catch (error) {
      console.error("Error fetching interactions:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleAccept = async (interactionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/interactions/${interactionId}/status`,
        {
          status: "requested",
          userType: "owner",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRequest(); // Refresh the list of interactions
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Incoming Requests</h2>
      {interactions.length === 0 ? (
        <p>No requests at the moment.</p>
      ) : (
        interactions.map(({ interaction }) => (
          <div key={interaction.id} className="card mb-3">
            <h5>{interaction.item.title}</h5>
            <p>
              <strong>Borrower:</strong> {interaction.borrower.username}
            </p>
            <p>
              <strong>From:</strong> {interaction.dates.start}
            </p>
            <p>
              <strong>To:</strong> {interaction.dates.end}
            </p>
            <p>
              <strong>Status:</strong> {interaction.status}
            </p>
            {interaction.status === "requested" && (
              <button
                className="btn btn-success"
                onClick={() => handleAccept(interaction.id)}
              >
                Accept Request
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Requests;
