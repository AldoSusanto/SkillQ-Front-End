import React from "react";
import "./HomePage.css";
import Menubar from "../Menubar";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  getChapterRequest = {
    courseId: "0",
    chapterNumber: "0",
  };

  constructor(props) {
    super();

    this.state = {
      getChapterRequest: this.getChapterRequest,
    };
  }

  render() {
    const courseName = "PERSONAL FINANCE";
    const courseId = "001";
    return (
      <div>
        <Menubar />
        <div className="jumbotron jumbotron-fluid bg-light">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 mx-sm-auto mx-lg-5 welcome-text">
              <h1 className="">KEMBANGKAN DIRIMU MULAI DARI SINI</h1>
              <p className="lead">Mulai Belajar</p>
              <Link to={`/study/${courseId}`}>
                <button type="button" name="button" className="btn btn-secondary">
                  {courseName}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="opening col-12 col-md-9 p-4 mx-auto d-flex flex-column flex-md-row-reverse justify-content-around align-items-center">
            <div className="opening-text mb-4 mb-md-0">
              <h1>Mulai dengan akses gratis 1 bulan</h1>
              <ul>
                <li>Jelajahi & akses semua kursus di SkillQ</li>
                <li>Dapatkan sertifikat kursusmu setelah menyelesaikan kursus</li>
                <li>Banyak topik pembelajaran terkini & metode belajar menarik</li>
              </ul>
            </div>
            <button className="btn btn-success px-5 font-weight-bold">Coba SkillQ</button>
          </div>
        </div>
        <div className="description-parent row justify-center my-4">
          <div className="col-12 col-md-4 p-5 ml-auto my-auto">
            <img className="w-100" src={require("./img/teaching.svg")} alt="Great Teachers" />
          </div>
          <div className="description col-12 col-md-6 p-4 mx-auto d-flex flex-row justify-content-around align-items-center">
            <div className="description-text">
              <h1>Pengajar profesional dan berpengalaman di bidangnya</h1>
              <br />
              <span className="description-border">&nbsp; &nbsp; &nbsp;</span>
              <br />
              <span>Belajar dengan pengajar hebat yang membuat kamu menjadi lebih mudah memahami pelajaran dan tentunya membuat belajar menjadi seru dan menyenangkan</span>
            </div>
          </div>
        </div>
        <div className="description-parent row justify-center my-4 d-flex flex-md-row-reverse">
          <div className="col-12 col-md-4 p-5 mr-auto my-auto">
            <img className="w-100" src={require("./img/online.svg")} alt="Great Teachers" />
          </div>
          <div className="description col-12 col-md-6 p-4 mx-auto d-flex flex-row justify-content-around align-items-center">
            <div className="description-text">
              <h1>Belajar dimanapun & kapanpun</h1>
              <br />
              <span className="description-border">&nbsp; &nbsp; &nbsp;</span>
              <br />
              <span>Akses kursus anda dimanapun anda berada. Modul & video pembelajaran dapat anda unduh agar dapat diakses kapanpun walau tanpa koneksi internet</span>
            </div>
          </div>
        </div>
        <div className="description-parent row justify-center my-4">
          <div className="col-12 col-md-4 p-5 ml-auto my-auto">
            <img className="w-100" src={require("./img/explore.svg")} alt="Great Teachers" />
          </div>
          <div className="description col-12 col-md-6 p-4 mx-auto d-flex flex-row justify-content-around align-items-center">
            <div className="description-text">
              <h1>Pelajari skill baru dan kembangkan pengetahuanmu</h1>
              <br />
              <span className="description-border">&nbsp; &nbsp; &nbsp;</span>
              <br />
              <span>Lebih dari 20+ macam topik menarik untuk kamu pelajari dan modul belajar terkini. kembangkan skill mu dan raih kesuksesan di dunia kerja.</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <span>&copy; SkillQ. Inc. 2021 - All Rights Reserved</span>
        </div>
      </div>
    );
  }
}

export default HomePage;
