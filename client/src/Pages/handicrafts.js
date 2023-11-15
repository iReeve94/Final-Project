import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ItemComponent from '../components/itemComponent';


const HandicraftsPage =() => {
    const [handicrafts, setHandicrafts] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/category/${category}`);
            setHandicrafts(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [category]);

      return (
        <div>
          {handicrafts.map((item) => (
            <ItemComponent key={item._id} item={item} />
          ))}
        </div>
      );
    };
    
    export default HandicraftsPage;
