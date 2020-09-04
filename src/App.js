import React, { useState, useRef } from 'react';
import { createClient } from 'pexels';
import './App.scss';

const API_KEY = "563492ad6f91700001000001c993770909174db98ac2ec5061ee0cf6";


function App() {
  const client = createClient(API_KEY);
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState();
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  const handleChange = (e) =>{
    const newValue = e.target.value;

    setValue(newValue);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const query = value;
    client.photos.search({ query, per_page: 50 }).then(result => {
      setPhotos(result.photos);
      setIsActive(true);
      ref.current.value = "";
    });
  } 

  const scrollToTop = () =>{
    window.scrollTo({
      top : 0,
      left : 0,
      behavior : "smooth"
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="search-field">
        <input type="text" onChange={handleChange} required ref={ref}/>
        <button type="submit">Find</button>
      </form>
      <div className="masonry">
        {
          photos?
          photos.map(photo => {
            return (
              <div key={photo.id} className="image-container">
              <a href={photo.src.original} target="_blank">
                <img src={photo.src.large} alt="Gambar"/>
              </a>
              </div>
            )
          }):
          <p>Loading...</p>
        }
      </div>
      {
        isActive?
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="fa fa-arrow-up"></i>
        </button>
        : null
      }
      
    </div>
  );
}

export default App;


