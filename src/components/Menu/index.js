import React, { useState } from "react";
import styles from "./menu.module.scss"; // Import css modules stylesheet as styles
import { sectionsData as sectionsData } from "../../data/data";

const Menu = ({ contextValue }) => {
  const { setCurrentSection } = contextValue;
  const [active, setActive] = useState(false);
  const onClick = () => {
    console.log("click on menu");
    setActive(!active);
  };
  const clickSection = (value) => {
    console.log("clickSection on menu", value);
    setCurrentSection(value);
    setActive(false);
  };
  return (
    <div id={styles.menu}>
      <div className={styles.hamburgericon} onClick={onClick} id="icon">
        <div
          className={`${styles.icon1} ${active ? styles.a : null}`}
          id="a"
        ></div>
        <div
          className={`${styles.icon2} ${active ? styles.c : null}`}
          id="b"
        ></div>
        <div
          className={`${styles.icon3} ${active ? styles.b : null}`}
          id="c"
        ></div>
        <div className={styles.clear}></div>
      </div>

      <nav id="nav" className={`${active ? styles.show : null}`}>
        <ul>
          <li onClick={() => clickSection(0)}>HOME</li>

          {sectionsData.sections.map((section, index) => {
            return (
              <li onClick={() => clickSection(index + 1)}>{section.section}</li>
            );
          })}
        </ul>
      </nav>

      <div
        className={`${styles.darkblue} ${active ? styles.slide : null}`}
        id="blue"
      ></div>
    </div>
  );
};

export default Menu;
