import React from "react";
import { Link } from 'react-router-dom';
import "./header.css";
function Header(props) {
  return (
    <React.Fragment>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to='#' className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></Link>
            </li>
            {/* <li className="nav-item d-none d-sm-inline-block">
                <Link to='/' className="nav-link">Home</Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <Link to='/about' className="nav-link">About</Link>
            </li> */}
        </ul>
        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
            {/* <!-- Navbar Search --> */}
            <li className="nav-item">
                <Link className="nav-link" data-widget="navbar-search" to='#' role="button">
                    <i className="fas fa-search" />
                </Link>
                <div className="navbar-search-block">
                    <form className="form-inline">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar" type="submit">
                                    <i className="fas fa-search" />
                                </button>
                                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </li>

           
            <li className="nav-item">
                <Link className="nav-link" data-widget="fullscreen" to="#" role="button">
                <i className="fas fa-expand-arrows-alt" />
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" data-widget="control-sidebar" data-slide="false" to="#" role="button">
                    <i className="fas fa-th-large" />
                </Link>
            </li>


        </ul>
      </nav>
    </React.Fragment>
  );
}
export default Header;
