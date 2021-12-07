import React from 'react';
import YouTube from 'react-youtube';
import './Chapter.css';
import Quiz from './Quiz';

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

      analysisMessage = "80% of students who maintain >3 courses per day finishes with score above 90 !"

      constructor(props){
        super();
        this.state={
          currentChapter: this.currentChapterSample,
          chapterNumber: '1',
          onLoading: true,
          courseId: props.courseId,
          chapterFinished: false,
          chapterRefreshed: false
        };

        this.onVideoEnd = this.onVideoEnd.bind(this);
        this.goToNextChapter = this.goToNextChapter.bind(this);
        this.goToPrevChapter = this.goToPrevChapter.bind(this);
      }

    async componentDidMount(){
      const getChapterRequest = {
        "courseId": this.props.courseId,
        "chapterNumber": this.state.chapterNumber
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
      if((this.props.courseId !== prevProps.courseId) || this.state.chapterRefreshed){
          console.log("calling DB...")
          this.setState({
            courseId: this.props.courseId
          });
          (async () => {
            await this.componentDidMount();
          })();

          if(this.state.chapterRefreshed){
            this.setState({
              chapterRefreshed: false
            })
          }
      }
    }

    onVideoEnd(event){
      this.setState({
        chapterFinished: true
      })
    }

    goToNextChapter(event){
      console.log(this.state.chapterNumber);
      this.setState({
        chapterNumber: Number(this.state.chapterNumber) + 1,
        chapterRefreshed: true,
        chapterFinished: false
      })
    }

    goToPrevChapter(event){
      this.setState({
        chapterFinished: false
      })
    }

    render(){
        const opts = {
            height: '80vh',
            width: '185vh',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
            },
          };
        
        const {currentChapter, onLoading, chapterFinished} = this.state;

        const chapterType = currentChapter.type;

        if(onLoading) {
          return(
            <div>Fetching data. Please wait...</div>
          )
        }

        // if(chapterFinished){
        //   return(
        //     <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
        //         <div className="chapter-wrapper">
        //           <div className="container-fluid">
        //             <div className="chapter-sub-Wrapper">                      
        //               <Quiz chapterId={currentChapter.chapterId}></Quiz>
        //             </div>
        //           </div>
        //       </div>

        //       <div className="description-wrapper">
        //         <div className="container-fluid">
        //           <div className="row">
        //             <div className="col-md-9 description-sub-wrapper">
        //               <h1>{currentChapter.chapterNumber} - {currentChapter.title}</h1>
        //               <p>{currentChapter.description}</p>
        //             </div>
        //             <div className="col-md-2 files-wrapper">
        //               {/* <!-- Dummy content, should be upload image link, as of now, we put image --> */}
        //               <img src={require("./icons/Related-Files.png")} alt=""/>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   )
        // }

        // Show the progress tracker page
        if(chapterFinished){
          return(
            <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
                <div className="chapter-wrapper">
                  <div className="container-fluid">
                    <div className="chapter-sub-Wrapper">
                      <div className="progress-container">
                        <h5>Well Done ! Keep up the good work</h5>
                        <h6>{this.analysisMessage}</h6>
                        <h6>Are you ready to move on to the next chapter?</h6>
                        <div className="progress-navigation">
                          <button onClick={this.goToPrevChapter}>Go Back</button>
                          <button onClick={this.goToNextChapter}>Next Chapter</button>
                        </div>
                      </div>
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

        console.log(chapterType);

        // show the chapter content
        if(chapterType === "VIDEO"){
          return(
            <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
              <div className="chapter-wrapper">
                  <div className="container-fluid">
                    <div className="chapter-sub-Wrapper">
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

        if(chapterType === "QUIZ"){
          return(
            <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
              <div className="chapter-wrapper">
                  <div className="container-fluid">
                    <div className="chapter-sub-Wrapper">
                      <Quiz chapterId={currentChapter.chapterId}></Quiz>
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
        return (
          <div id="wrapper" className={this.props.menuDisplayed ? "menuDisplayed" : ""}>
            <div className="chapter-wrapper">
                <div className="container-fluid">
                  <div className="chapter-sub-Wrapper">
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