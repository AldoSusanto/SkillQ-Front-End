import React from 'react';
import './HomePage.css';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';

class HomePage extends React.Component{

    getChapterRequest = {
        "courseId": '0',
        "chapterNumber": '0'
    }

    constructor(props){
        super();

        this.state = {
            getChapterRequest: this.getChapterRequest
        }
    }

    render(){

        const courseName = 'PERSONAL FINANCE'
        const courseId = "001"
        return ( 
        <div>
            <Menubar />
            <div className="jumbotron jumbotron-fluid bg-light">
                <div className="row">
                    <div className="col-sm-4 welcome-text">
                    <h1 className="">KEMBANGKAN DIRIMU MULAI DARI SINI</h1>
                    <p className="lead">Mulai Belajar</p>
                    <Link to={`/study/${courseId}`}><button type="button" name="button" className="btn btn-secondary">{courseName}</button></Link>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default HomePage