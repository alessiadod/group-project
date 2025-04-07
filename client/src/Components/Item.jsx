import React, { use } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./item.css";
import "./styles.css";
import defaultImage from "../assets/images/default_image.png";
import { toast } from "react-toastify";

const formatDate = (date) => {
  if (!(date instanceof Date)) return "";
  return date.toISOString().split("T")[0];
};

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    console.log("Updated item state:", item);
  }, [id]);

  const getItem = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/items/${id}`);
      console.log("Fetched item:", response.data);

      if (response.status !== 200) {
        console.error("Error fetching item:", response.statusText);
        return;
      }
      setItem(response.data); // Set the fetched item
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // Request to borrow item
  // Rewrite this to use the token
  const requestItem = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:4000/api/interactions`,
        {
          item_id: parseInt(id),
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Interaction response:", res.data);
      toast.success("Request submitted! The owner will review it soon.");
    } catch (err) {
      console.err("Error requesting item:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div className="item-card-container">
      <div className="card">
        <div className="container mt-5">
          <div className="item-img-container">
            <Image
              src={item.imageUrl ? item.imageUrl : defaultImage}
              alt="Item Image"
              className="card-img"
            />
          </div>
          <h3>{item.title}</h3>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p
            className={
              item.status === "available"
                ? "status-available"
                : "status-unavailable"
            }
          >
            <strong>{item.status}</strong>
          </p>
          <p>
            <strong>Owner:</strong> {item.owner_name}
          </p>
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
              <button className="button" onClick={requestItem}>
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
