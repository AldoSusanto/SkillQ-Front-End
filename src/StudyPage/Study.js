import React from 'react';
import './Study.css';
import Menubar from '../Menubar';
import Sidebar from './Sidebar';
import Chapter from './Chapter';

class Study extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            menuDisplayed: false
        };
        this.toggleSidebarParent = this.toggleSidebarParent.bind(this);
    }


    toggleSidebarParent() {
        this.setState({menuDisplayed : !this.state.menuDisplayed});
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.setState({
                courseId: this.props.match.params.id
            })
        }
    }

    render(){
        console.log(this.state.courseId);
        return(
            <div id="studyWrapper">
                <Menubar />
                <Sidebar updateMenuDisplayed={this.toggleSidebarParent}/>
                <Chapter menuDisplayed={this.state.menuDisplayed} courseId={this.state.courseId}/>
            </div>
        )
    }
}

export default Study;