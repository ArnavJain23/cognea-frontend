import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useMsal } from '@azure/msal-react';

const UserDetails = () => {
  const { accounts } = useMsal();
  const [userAccount, setUserAccount] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setUserAccount(accounts[0]);
    }
  }, [accounts]);
  return (
    <div>
      <div className="az-img-user">
        <img
          src={require("../../assets/images/profile.jpeg")}
          alt=""
        ></img>
      </div>
      {userAccount && <h6>{userAccount.idTokenClaims.given_name}</h6>}
    </div>
  );
};

function signOutClickHandler(instance) {
  const logoutRequest = {
    account: instance.getActiveAccount(),
    postLogoutRedirectUri: "https://www.cognea.ai",
  };
  instance.logoutRedirect(logoutRequest);
}

function SignOutButton() {
  const { instance } = useMsal();

  return (
    <button onClick={() => signOutClickHandler(instance)} className="dropdown-item">
      <i className="typcn typcn-power-outline"></i> Sign Out
    </button>
  );
}


export class Header extends Component {
  closeMenu(e) {
    e.target.closest(".dropdown").classList.remove("show");
    e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  render() {
    return (
      <div>
        <div className="az-header">
          <div className="container">
            <div className="az-header-left">
              <a href="https://cognea.ai" className="az-logo">
                Cognea
              </a>
              <a
                id="azMenuShow"
                onClick={event => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
            </div>
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <a href="https://cognea.ai" className="az-logo">
                  Cognea
                </a>
                <a
                  href="#/"
                  onClick={event => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              {!this.props.isInterview ?
              <ul className="nav">
                <li
                  className={
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dashboard" className="nav-link">
                    <i className="typcn typcn-chart-area-outline"></i> Dashboard
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/general-pages")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className="typcn typcn-document"></i> Pages
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub">
                      <Link
                        to="/general-pages/signin"
                        className={
                          this.isPathActive("/general-pages/signin")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/general-pages/signup"
                        className={
                          this.isPathActive("/general-pages/signup")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/general-pages/forgetpassword"
                        className={
                          this.isPathActive("/general-pages/forgetpassword")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Forget Password
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li> */}
                {/* <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/ui-elements") ||
                      this.isPathActive("/form") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className="typcn typcn-book"></i> Components
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub az-menu-sub-mega">
                      <div className="container">
                        <div>
                          <nav className="nav">
                            <span>UI Elements</span>
                            <Link
                              to="/ui-elements/buttons"
                              className={
                                this.isPathActive("/ui-elements/buttons")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Buttons
                            </Link>
                            <Link
                              to="/ui-elements/dropdowns"
                              className={
                                this.isPathActive("/ui-elements/dropdowns")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Dropdown
                            </Link>
                            <Link
                              to="/ui-elements/icons"
                              className={
                                this.isPathActive("/ui-elements/icons")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Icons
                            </Link>
                          </nav>
                        </div>
                        <div>
                          <nav className="nav">
                            <span>Forms</span>
                            <Link
                              to="/form/form-elements"
                              className={
                                this.isPathActive("/form/form-elements")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Form Elements
                            </Link>
                          </nav>
                        </div>
                        <div>
                          <nav className="nav">
                            <span>Charts</span>
                            <Link
                              to="/charts/chartjs"
                              className={
                                this.isPathActive("/charts/chartjs")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              ChartJS
                            </Link>
                          </nav>
                        </div>
                        <div>
                          <nav className="nav">
                            <span>Tables</span>
                            <Link
                              to="/tables/basic-table"
                              className={
                                this.isPathActive("/tables/basic-table")
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                            >
                              Basic Tables
                            </Link>
                          </nav>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </li> */}
              </ul>
              : <div></div>}
            </div>
            <div className="az-header-right">
              {/* <a href="#/" className="az-header-search-link">
                <i className="fas fa-search"></i>
              </a>
              <div className="az-header-message">
                <Link to="#/">
                  <i className="typcn typcn-messages"></i>
                </Link>
              </div> */}
              {/* <Dropdown className="az-header-notification">
                <Dropdown.Toggle as={"a"} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media new">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img2.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          Congratulate <strong>Socrates Itumay</strong> for work
                          anniversaries
                        </p>
                        <span>Mar 15 12:32pm</span>
                      </div>
                    </div>
                    <div className="media new">
                      <div className="az-img-user online">
                        <img
                          src={require("../../assets/images/img3.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Joyce Chua</strong> just created a new blog
                          post
                        </p>
                        <span>Mar 13 04:16am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img4.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Althea Cabardo</strong> just created a new
                          blog post
                        </p>
                        <span>Mar 13 02:56am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img5.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Adrian Monino</strong> added new comment on
                          your photo
                        </p>
                        <span>Mar 12 10:40pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown className="az-profile-menu">
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  <img
                    src={require("../../assets/images/profile.jpeg")}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={event => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <UserDetails />
                  </div>

                  {/* <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </a> */}
                  {/* <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-edit"></i> Edit Profile
                  </a>
                  <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-time"></i> Activity Logs
                  </a> */}
                  {/* <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-cog-outline"></i> Account Settings
                  </a> */}
                  <SignOutButton />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
