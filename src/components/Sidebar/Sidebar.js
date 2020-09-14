
import PerfectScrollbar from "perfect-scrollbar";
import { PropTypes } from "prop-types";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Nav, UncontrolledCollapse } from "reactstrap";
import './SidebarStyle.scss';


let ps;
let DeviceWidth = window.matchMedia("(max-width: 700px)")

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {
      collapseIcon: false
    }
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }


  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  componentDidUpdate() {
    this.checkCurrentScreen();
  }


  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  collapseToIcon() {
    const { collapseIcon } = this.state;
    this.setState({ collapseIcon: !collapseIcon }, () => this.checkCurrentScreen())
  }


  checkCurrentScreen() {
    const { collapseIcon } = this.state;
    let myElement = document.getElementById('MainPanel').getElementsByClassName('content');
    if (!DeviceWidth.matches) {
      if (collapseIcon) {
        myElement[0].style.paddingLeft = '130px'
      }
      else {
        myElement[0].style.paddingLeft = '280px'
      }
    }
    else {
      myElement[0].style.paddingLeft = '15px'
    }
  }


  render() {
    const { bgColor, routes, logo } = this.props;
    const { collapseIcon } = this.state;
    return (
      <div className="sidebar" data={bgColor} style={collapseIcon ? { width: '5%' } : null}>
        <div className="backIconContainer" onClick={() => { this.collapseToIcon() }}>
          {!DeviceWidth.matches && collapseIcon ? <i className="fa fa-arrow-circle-right"></i> : <i className="fa fa-arrow-circle-left"></i>}
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav style={collapseIcon ? { marginTop: 50 } : null}>
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    prop.subs ? null : this.activeRoute(prop.path) +
                      (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.subs ? prop.subs[0].path : prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />

                    <p id={prop.name.split(" ")[0]} className={collapseIcon ? "hideTitle" : null}>{prop.name}</p>
                  </NavLink>
                  {
                    prop.subs && prop.subs.map((item, ItemKey) => {
                      return (
                        <UncontrolledCollapse toggler={prop.name.split(" ")[0]} style={{ background: '#737373' }}>
                          <li
                            className={
                              item.subSubs ? null : this.activeRoute(item.path) +
                                (prop.pro ? " active-pro" : "")
                            }
                            key={ItemKey}
                          >
                            <NavLink
                              to={item.path}
                              className="nav-link"
                              activeClassName="active"
                              onClick={this.props.toggleSidebar}
                            >
                              <i className={item.icon} />
                              <p id={item.name.split(" ")[0]} className={collapseIcon ? "hideTitle" : null}>{item.name}</p>
                            </NavLink>
                            {
                              item.subSubs && item.subSubs.map((elm, index) => {
                                return (
                                  <UncontrolledCollapse toggler={item.name.split(" ")[0]} style={{ background: '#074444' }}>
                                    <li
                                      className={
                                        this.activeRoute(elm.path) +
                                        (prop.pro ? " active-pro" : "")
                                      }
                                      key={index}
                                    >
                                      <NavLink
                                        to={elm.path}
                                        className="nav-link"
                                        activeClassName="active"
                                        onClick={this.props.toggleSidebar}
                                      >
                                        <i className={elm.icon} />
                                        <p className={collapseIcon ? "hideTitle" : null}>{elm.name}</p>
                                      </NavLink>
                                    </li>
                                  </UncontrolledCollapse>
                                );
                              })
                            }
                          </li>
                        </UncontrolledCollapse>
                      );
                    })
                  }
                </li>
              );
            })}

          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "light-green",
  routes: [{}]
};

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(Sidebar);
