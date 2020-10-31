import React, { Component } from 'react';

class NavbarDash extends Component {
    
  handleLogout = () => {
    window.localStorage.clear();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/AgentDashboard">
            IRS Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <p >
                  Hi, {localStorage.getItem("firstname")}
                </p>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarDash;