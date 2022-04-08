import React from "react";
// import { Link } from "gatsby";
import  "./menu.module.scss";

const Menu = () => {
  return (
    <div id="menu">
      <div class="hamburger-icon" id="icon">
        <div class="icon-1" id="a"></div>
        <div class="icon-2" id="b"></div>
        <div class="icon-3" id="c"></div>
        <div class="clear"></div>
      </div>

      <nav id="nav">
        <ul>
          <li>HOme</li>
          <li>About</li>
          <li>Contact</li>
          <li>Help</li>
        </ul>
      </nav>

      <div className="dark-blue" id="blue"></div>
    </div>
  );
};

export default Menu;
