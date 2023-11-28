import React, { useState } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import "./createItem.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";

function AddItem({ getAllItems }) {
  let token = localStorage.getItem("token");
  const [item, setItem] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [imageUpload, setImageUpload] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const validForm = () => {
    return (
      item.title.trim() !== "" &&
      item.price.trim() !== "" &&
      item.description.trim() !== "" &&
      item.category.trim() !== ""
    );
  };

  const uploadFile = async () => {
    if (imageUpload == null) return null;
  
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const imageUrl = await getDownloadURL(imageRef);
  
      console.log("Image URL:", imageUrl); // Log the image URL
  
      return imageUrl;
    } catch (error) {
      console.log("Error uploading file:", error);
      return null;
    }
  };

  const addNewItem = async (e) => {
    e.preventDefault();
    if (!validForm()) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const imageUrl = await uploadFile();
      console.log("Returned image URL:", imageUrl);
      setImageUpload(imageUrl);
      const newItem = {
        ...item,
        imageUrl: imageUrl,
      };
      console.log("Added item:", newItem);
      await axios.post("http://localhost:8000/create", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAllItems();

      // Clear the form
      setItem({
        title: "",
        price: "",
        description: "",
        category: "",
      });

      // Log the entire item object
      console.log("Added item:", newItem);
    } catch (error) {
      console.log("Error adding item:", error);
    }
  };

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  return (
    <div>
      <div className="inputDiv">
        <form className="form1" onSubmit={addNewItem}>
          <div class="form-row">
            <label for="createInput">Title:</label>
            <input
              type="text"
              name="title"
              id="createInput"
              placeholder="Title"
              onChange={handleInputChange}
              value={item.title}
            />
          </div>
          <div class="form-row">
            <label for="createInput">Price:</label>
            <input
              type="text"
              name="price"
              id="createInput"
              placeholder="Price"
              onChange={handleInputChange}
              value={item.price}
            />
          </div>
          <div class="form-row">
            <label for="createInput">Description:</label>
            <input
              type="text"
              name="description"
              id="createInput"
              placeholder="Description"
              onChange={handleInputChange}
              value={item.description}
          />
          </div>
          <div class="form-row">
            <label for="createInput">Category:</label>
            <input
              type="text"
              name="category"
              id="createInput"
              placeholder="Category"
              onChange={handleInputChange}
              value={item.category}
            />
          </div>
          <div class="form-row">
            <input type="file" onChange={handleFileChange} />
          </div>
          <div class="form-row">
          <Stack direction="row" spacing={2}>
            <Button type="submit" className="addItemtBtn" variant="outlined" color="success" >
              ADD
            </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;