
/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink, UncontrolledCollapse } from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {
      isOpenState: this.props.isOpen
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
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  toggle = () => {
    const { isOpenState } = this.state;
    this.setState({
      isOpenState: !isOpenState
    })
  }


  render() {
    const { bgColor, routes, logo } = this.props;

    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
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
                    to={prop.subs ? prop.subs[0].layout + prop.subs[0].path : prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p id={prop.name.split(" ")[0]}>{prop.name}</p>
                    {
                      prop.subs && prop.subs.map((item, key) => {
                        return (
                          <UncontrolledCollapse toggler={prop.name.split(" ")[0]}>
                            <li
                              className={
                                item.subSubs ? null : this.activeRoute(item.path) +
                                  (prop.pro ? " active-pro" : "")
                              }
                              key={key}
                            >
                              <NavLink
                                to={item.layout + item.path}
                                className="nav-link"
                                activeClassName="active"
                                onClick={this.props.toggleSidebar}
                              >
                                <i className={item.icon} />
                                <p id={item.name.split(" ")[0]}>{item.name}</p>
                                {
                                  item.subSubs && item.subSubs.map((elm, Key) => {
                                    debugger
                                    return (
                                      <UncontrolledCollapse toggler={item.name.split(" ")[0]}>
                                        <li
                                          className={
                                            this.activeRoute(elm.path) +
                                            (prop.pro ? " active-pro" : "")
                                          }
                                          key={Key}
                                        >
                                          <NavLink
                                            to={elm.layout + elm.path}
                                            className="nav-link"
                                            activeClassName="active"
                                            onClick={this.props.toggleSidebar}
                                          >
                                            <i className={elm.icon} />
                                            <p>{elm.name}</p>
                                          </NavLink>
                                        </li>
                                      </UncontrolledCollapse>
                                    );
                                  })
                                }
                              </NavLink>
                            </li>
                          </UncontrolledCollapse>
                        );
                      })
                    }
                  </NavLink>
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
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
