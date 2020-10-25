import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component{

    constructor(props){
        super();
        this.state = { menuDisplayed: false };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({menuDisplayed : !this.state.menuDisplayed});
        this.props.updateMenuDisplayed();
    }

    render(){
        return(
            <div id="wrapper" className={this.state.menuDisplayed ? "menuDisplayed" : ""}>
                <div className="sidebar-wrapper">
                    <ul onMouseOut={this.toggleSidebar} onMouseOver={this.toggleSidebar} >
                    <li><a href="/"><img className="sidebar-icon" src={require("./icons/Navigation.png")} alt="" />
                        <span className="sidebar-icon-label">Navigation</span></a></li>
                    <li><a href="/"><img className="sidebar-icon" src={require("./icons/Chat-room.png")} alt="" />
                        <span className="sidebar-icon-label">Chat Rooms</span></a></li>
                    <li><a href="/"><img className="sidebar-icon" src={require("./icons/Forum.png")} alt="" />
                        <span className="sidebar-icon-label">Forum</span></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;