import {BrowserRouter as Router,NavLink, Link, Route, Switch} from 'react-router-dom';
import './Navbar.css';

function Nav_bar() {
  return (
    <nav className="navbar">
        <div className="nav-conainer">
               <NavLink excat to="/" className="nav-logo"> Form</NavLink>
               <ul className="nav-menu">
                   <li className="nav-item">
                   <NavLink excat to="/Create" activeClassName="active" className="nav-link"> Create</NavLink>
                   </li>
                   <li className="nav-item">
                   <NavLink excat to="/View" activeClassName="active" className="nav-link"> View</NavLink>
                   </li>
               </ul>


        </div>

    </nav>
      
    

  );
}
export default Nav_bar;
