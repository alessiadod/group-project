import React, { use } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (date) => {
  if (!(date instanceof Date)) return "";
  return date.toISOString().split("T")[0];
};

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  // Message for
  const [message, setMessage] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    console.log("Updated item state:", item);
  }, [id]);

  const getItem = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/items/${id}`);
      console.log("Axios response:", response);

      const fetchedItem = response.data[0];
      console.log("Fetched item:", fetchedItem);

      if (response.status !== 200) {
        console.error("Error fetching item:", response.statusText);
        return;
      }
      setItem(fetchedItem);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // Request to borrow item
  const requestItem = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/api/interactions`, {
        borrower_id: 2, // TODO: Replace with actual user from token later
        item_id: parseInt(id),
        start_date: startDate,
        end_date: endDate,
      });

      console.log("Interaction response:", res.data);
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error requesting item:", error);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card" style={{ width: "18rem" }}>
        <div className="container mt-5">
          <h3>Title: {item.title}</h3>
          <p>Item Description: {item.description}</p>
          <p>Category: {item.category}</p>
          <p>Status: {item.status}</p>

          <Link to="/home" className="btn btn-outline-primary">
            Back to Home
          </Link>

          {/* Set date and request */}
          {item.status === "available" && (
            <div>
              <label>Start date</label>
              <input
                type="date"
                className="form-control mb-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label>End Date:</label>
              <input
                type="date"
                className="form-control mb-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button className="btn btn-primary" onClick={requestItem}>
                Request to borrow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
