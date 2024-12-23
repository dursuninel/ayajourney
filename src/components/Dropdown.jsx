import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dropdown({ title, data }) {
  const [dropdownActive, setDropdownActive] = useState(false);
useEffect(() => {
    console.log(data)
    return () => {
        
    };
}, []);
  return (
    <li className={dropdownActive ? "dropdown open" : "dropdown"}>
      <div title={title} onClick={() => setDropdownActive(!dropdownActive)}>
        {title} <i class="fa-solid fa-angle-down"></i>
      </div>
      <ul className={dropdownActive ? "active" : ""}>
        {data.map((item, key) => (
          <li key={key}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
