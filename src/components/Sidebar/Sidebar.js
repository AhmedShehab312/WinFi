
/*eslint-disable*/
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { PropTypes } from "prop-types";
import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
// reactstrap components
import { Nav, UncontrolledCollapse } from "reactstrap";
import './SidebarStyle.scss';


var ps;

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
    if (collapseIcon) {
      myElement[0].style.paddingLeft = '130px'
    }
    else {
      myElement[0].style.paddingLeft = '280px'
    }

  }


  render() {
    const { bgColor, routes, logo } = this.props;
    const { collapseIcon } = this.state;

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
      <div className="sidebar" data={bgColor} style={collapseIcon ? { width: '5%' } : null}>
        <div className="backIconContainer" onClick={() => { this.collapseToIcon() }}>
          {collapseIcon ? <i className="fa fa-arrow-circle-right"></i> : <i className="fa fa-arrow-circle-left"></i>}
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          {!collapseIcon ? logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null : null}
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
                    prop.subs && prop.subs.map((item, key) => {
                      return (
                        <UncontrolledCollapse toggler={prop.name.split(" ")[0]} style={{ background: '#556082' }}>
                          <li
                            className={
                              item.subSubs ? null : this.activeRoute(item.path) +
                                (prop.pro ? " active-pro" : "")
                            }
                            key={key}
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
                              item.subSubs && item.subSubs.map((elm, Key) => {
                                return (
                                  <UncontrolledCollapse toggler={item.name.split(" ")[0]} style={{ background: '#074444' }}>
                                    <li
                                      className={
                                        this.activeRoute(elm.path) +
                                        (prop.pro ? " active-pro" : "")
                                      }
                                      key={Key}
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
  rtlActive: false,
  bgColor: "light-green",
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

export default withRouter(Sidebar);
