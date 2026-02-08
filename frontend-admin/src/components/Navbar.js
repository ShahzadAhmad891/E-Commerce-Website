import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" height="40" />
      <div>
        {auth && <span>Welcome, {auth.user?.name || auth.admin?.name}</span>}
        {auth && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
