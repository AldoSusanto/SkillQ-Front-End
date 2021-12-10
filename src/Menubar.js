import React from "react";
// import logo from './logo.svg';
import "./Menubar.css";
import { Nav } from "reactstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

class Menubar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      courses: [],
      reload: false,
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/v1/courses/");
    const body = await response.json();
    this.setState({
      courses: body,
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { courses } = this.state;
    return (
      <>
        <nav className={`offcanvas ${this.state.isOpen ? "d-block" : "d-none"}`}>
          <span className="close-button">
            <button onClick={this.toggle}>X</button>
          </span>
          <div className="canvas-center">
            <div className="dropdown dropdown-canvas nav-item canvas-item">
              <DropdownButton variant="dark" id="dropdown-basic-button" title="Browse Courses">
                {courses.map((course) => (
                  <Dropdown.Item color="light" as={Link} to={`/study/${course.courseId}`} key={course.courseId}>
                    {course.courseName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <button className="btn canvas-item" href="/">
              Pricing
            </button>
            <button className="btn canvas-item" href="/">
              Contact Us
            </button>
            <button className="btn canvas-item" href="/">
              About Us
            </button>
            <button className="btn canvas-item" href="/">
              Products
            </button>
          </div>
        </nav>
        <Nav className="navbar navbar-expand-md navbar-light menubarStyle">
          <div className="container-fluid">
            <div className="navbar-brand logo" href="/">
              LOGO
            </div>
            <button onClick={this.toggle} className="btn d-block d-md-none">
              <img className="menu-icon" src={require("./icons/menu.png")} alt="" />
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler">
              <div className="navbar-nav">
                <div className="dropdown nav-item">
                  <DropdownButton variant="Secondary" id="dropdown-basic-button" title="Browse Courses">
                    {courses.map((course) => (
                      <Dropdown.Item as={Link} to={`/study/${course.courseId}`} key={course.courseId}>
                        {course.courseName}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
                <button className="btn" href="/">
                  Pricing
                </button>
                <button className="btn" href="/">
                  Contact Us
                </button>
                <button className="btn" href="/">
                  About Us
                </button>
                <button className="btn" href="/">
                  Products
                </button>
              </div>
            </div>
          </div>
        </Nav>
      </>
    );
  }
}

export default Menubar;
