import React from 'react';
import YouTube from 'react-youtube';
import './Chapter.css';

class Chapter extends React.Component{

      currentChapterSample = {
          chapterId: "PFN-001",
          courseId: "001",
          chapterNumber: "1",
          title: "Why Personal Finance",
          type: "VIDEO",
          videoLink: "link to video",
          quizId: null,
          description: "PFN-1 description"
      }

      constructor(props){
        super();
        this.state={
          currentChapter: this.currentChapterSample,
          onLoading: true,
          courseId: props.courseId
        };
      }

    async componentDidMount(){
      const getChapterRequest = {
        "courseId": this.props.courseId,
        "chapterNumber": '1'
      }
      const response = await fetch('/v1/chapters/by/request', {
          method: 'POST',
          headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(getChapterRequest)
      });
      const body = await response.json();
      this.setState({
          currentChapter: body,
          onLoading: false
      });      
    }


    componentDidUpdate(prevProps){
      if(this.props.courseId !== prevProps.courseId){
          this.setState({
            courseId: this.props.courseId
          });
          (async () => {
            await this.componentDidMount();
          })();
      }
    }

    onVideoEnd(event){
      // add progress tracker
    }

    render(){
        const opts = {
            height: '80vh',
            width: '185vh',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
            },
          };
        
        const {currentChapter, onLoading} = this.state;

        if(onLoading) {
          return(
            <div>Fetching data. Please wait...</div>
          )
        }
        return (
          <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
            <div className="video-wrapper">
                <div className="container-fluid">
                  <div className="video-sub-Wrapper">
                    <YouTube videoId={currentChapter.videoLink} opts={opts} onEnd={this.onVideoEnd} />
                  </div>
                </div>
            </div>

            <div className="description-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-9 description-sub-wrapper">
                    <h1>{currentChapter.chapterNumber} - {currentChapter.title}</h1>
                    <p>{currentChapter.description}</p>
                  </div>
                  <div className="col-md-2 files-wrapper">
                    {/* <!-- Dummy content, should be upload image link, as of now, we put image --> */}
                    <img src={require("./icons/Related-Files.png")} alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


export default Chapter;