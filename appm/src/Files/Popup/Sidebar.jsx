import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [formDropdownOpen, setFormDropdownOpen] = useState(false);
 

  return (
    <div className={`sidebar-container ${ "open" }`}>
      <div className="model-container-sidebar">
        <button className="close" onClick={props.pass}>
          {" "}
          X
        </button>
        <div className="logo-sidebar">
          <img src="img/home1/hitech2.jpg" alt="hi-tech" />
        </div>
        <div className="menu-sidebar">
          <NavLink className="menu-item-sidebar" to="/">
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink className="menu-item-sidebar" to="/About">
            <FaUsers />
            <span>About</span>
          </NavLink>

          <NavLink className="menu-item-sidebar" to="/Service">
            <MdOutlineMiscellaneousServices />
            <span>Services</span>
          </NavLink>

          
          <div
            className="menu-item-sidebar user-dropdown"
            onClick={() => {
                setUserDropdownOpen(!userDropdownOpen)
                setFormDropdownOpen(false)

            }}
          >
            <FaUser />
            <span>Case</span> &nbsp;
            <div className="dropdown-icon-sidebar">
              {userDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>

          {userDropdownOpen && (
            <div className="submenu-sidebar">
              <NavLink className="submenu-item-sidebar" to="/Case">
              Case
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/CaseD">
              CaseD
              </NavLink>
            </div>
          )}
          <div
            className="menu-item-sidebar user-dropdown-sidebar"
            onClick={() => {
                setFormDropdownOpen(!formDropdownOpen)
                setUserDropdownOpen(false)

            }}
          >
            <FaFileAlt />
            <span>ShortCode</span> &nbsp;
            <div className="dropdown-icon-sidebar">
              {formDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {formDropdownOpen && (
            <div className="submenu-sidebar">
              <NavLink className="submenu-item-sidebar" to="/Tracking">
              Tracking
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/List">
              List
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Team">
              Team
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Gimg">
                Image box
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Gallery">
              Gallery
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Step">
              Process Steps
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Contact">
              Contact
              </NavLink>
              <NavLink className="submenu-item-sidebar" to="/Map">
              Map
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
