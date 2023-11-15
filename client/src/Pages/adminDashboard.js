import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./adminDashboard.css";




function AddItem({ getAllItems }) {
    let token = localStorage.getItem("token");
    const [item, setItem] = useState({
        title: "",
        price: "",
        description: "",
        category: "",   
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    };

    const validForm = () => {
        return (
            item.title.trim() !== "" &&
            item.price.trim() !== "" &&
            item.description.trim() !== ""
        );
    };


    function addNewItem(e) {
        e.preventDefault();
        if (!validForm()) {
            alert("Please fill all the fields.");
            return;
        }

        axios
            .post("http://localhost:8000/create", item, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data);
                getAllItems();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    


    return (
        <div>
            <div className="sidebar">
                <a className="active">QQ</a>
                <a>QQ2</a>
            </div>
        <div className="inputDiv">
          <form className="form1" onSubmit={addNewItem}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              value={item.title}
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              onChange={handleInputChange}
              value={item.price}
            />
            <label>description:</label>
            <input
              type="text"
              name="description"
              placeholder="description"
              onChange={handleInputChange}
              value={item.description}
            />
            <label>Category:</label>
            <input
              type="text"
              name="category"
              placeholder="category"
              onChange={handleInputChange}
              value={item.category}
            />
            <button type="submit" className="addItemtBtn">
              ADD
            </button>
          </form>
        </div>
      </div>
    )
}

export default AddItem;