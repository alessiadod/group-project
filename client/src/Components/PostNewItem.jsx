import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import "./PostNewItem.css";

function PostNewItemPage() {
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "tools", "outdoor", "kitchenware", "cleaning", "electronics",
    "sports", "furniture", "events", "childrens", "seasonal",
    "crafts", "media", "vehicles", "misc"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setItemData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", itemData.title);
    formData.append("description", itemData.description);
    formData.append("category", itemData.category);
    formData.append("status", "available"); // temporary default
    formData.append("image", itemData.image);

    try {
      await axios.post("http://localhost:4000/api/items/post-new-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/home");
    } catch (err) {
      console.error("Failed to post item:", err);
      setError(err.response?.data?.message || "Failed to post item.");
    }
  };

  return (
    <div className="form-container-postnewitem">
      <div className="form-postnewitem">
        <h1 className="postnewitem-title">Post a New Item</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={itemData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
          <br />

          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            name="description"
            id="description"
            value={itemData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
          <br />

          <label htmlFor="category" className="form-label">Category:</label>
          <select
            name="category"
            id="category"
            value={itemData.category}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <br />

          <label htmlFor="image" className="form-label">Image:</label>
          <ImageUploader onFileSelect={handleFileSelect} />
          <br />

          <input type="submit" value="Post Item" className="form-input" />
        </form>
      </div>
    </div>
  );
}

export default PostNewItemPage;