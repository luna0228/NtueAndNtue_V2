import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav({ school, semester }) {
  return (
    <nav className={styles.nav}>
      <ul>
        <div
          className={styles.a_active_box}
          style={school == "ntue" ? { right: "3px" } : { left: "3px" } || school == "ntut" ? { left: "3px" } : { right: "3px" }}
        >
        </div>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.a_active : styles.a_active_gray)}
            to={`/works/ntut/${semester}`}
          >
            NTUT
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.a_active_green : styles.a_active_gray)}
            to={`/works/ntue/${semester}`}
          >
            NTUE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;