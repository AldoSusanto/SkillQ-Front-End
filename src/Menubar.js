import React from 'react';
// import logo from './logo.svg';
import './Menubar.css';
import { Nav } from 'reactstrap';
import { Dropdown, DropdownButton }  from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Menubar extends React.Component{

  constructor(props){
    super();
    this.state = {
        courses: [],
        reload: false
    }
}

async componentDidMount(){
    const response = await fetch("/v1/courses/")
    const body = await response.json();
    this.setState({
        courses: body
    });
}

  render(){
    const {courses} = this.state
    return (
      <Nav className="navbar navbar-expand-md navbar-light menubarStyle fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="/">LOGO</a>
          <div className="navbar-collapse">
            <div className="navbar-nav">
              <div className="dropdown nav-item">
                <DropdownButton variant='Secondary' id="dropdown-basic-button" title="Browse Courses">
                  {
                    courses.map( course => 
                    <Dropdown.Item as={Link} to={`/study/${course.courseId}`} key={course.courseId} >{course.courseName}</Dropdown.Item>
                    )
                  }
                </DropdownButton>
              </div>
              <button className="btn" href="/">Pricing</button>
            </div>
          </div>
        </div>
      </Nav>
    )
  }
}

export default Menubar