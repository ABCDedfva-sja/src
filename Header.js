import React, { useState, useEffect } from "react";
import "./styles.css";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://tse1.mm.bing.net/th?id=OIP.9P5SF27RUSRuhsEIpt0z8AHaEK&pid=Api&P=0&h=180",
    "https://tse1.mm.bing.net/th?id=OIP.XIsv1S8HcEvucvCXNfK5_wHaEg&pid=Api&P=0&h=180", // Replace with your image URLs
    "https://tse1.mm.bing.net/th?id=OIP.985tD8I8Jl8cNNZlCKBqlgHaD3&pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th?id=OIP.lYSNaud4ioDGLetWJ952PwHaE8&pid=Api&P=0&h=180",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <header>
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide})`,
            }}
          ></div>
        ))}
      </div>
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo"></div>
        </div>
        <div className="nav-links">
          <a href="#home" className="border">
            Home
          </a>
          <a href="#about" className="border">
            About
          </a>
          <a href="#contact" className="border">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
