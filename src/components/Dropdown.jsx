import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dropdown({ title, data }) {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <li className={dropdownActive ? "dropdown open" : "dropdown"}>
      <div title={title} onClick={() => setDropdownActive(!dropdownActive)}>
        {title} <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul className={dropdownActive ? "active" : ""}>
        {data.map((item, key) => (
          <li key={key}>
            <NavLink to={item.link} title={item.title}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
