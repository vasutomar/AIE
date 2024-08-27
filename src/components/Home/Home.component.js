import React, { useEffect, useState } from "react";
import Discussions from "../Discussions/Discussions.component";

import discuss from '../../assets/images/discuss.png';
import news from '../../assets/images/news.png';
import study from '../../assets/images/study.png';
import test from '../../assets/images/test.png';

import "./Home.scss";
import StudyGroups from "../StudyGroups/StudyGroups.component";
function Home() {
  const [currentPage, setCurrentPage] = useState("Discussion zone");
  const features = [
    {
      name: "Discussion zone",
      logo: discuss,
    },
    {
      name: "Study groups",
      logo: study,
    },
    {
      name: "Practice",
      logo: test,
    },
    {
      name: "News",
      logo: news,
    },
  ];
  const getComponent = () => {
    switch(currentPage) {
        case 'Discussion zone': {
            return <Discussions />;
        }
        case 'Study groups': {
            return <StudyGroups/>;
        }
        // case 'Practice': {
        //     return <Practice/>;
        // }
        // case 'News': {
        //     return <News/>;
        // }
    }
  };

  useEffect(() => {
    /* Do nothing */
  }, [currentPage]);

  return (
    <div className="home-layout">
      <div className="sidebar">
        {features.map((f) => {
          return <img className={f.name === currentPage ? 'selected': ''} title={f.name} src={f.logo} onClick={() => setCurrentPage(f.name)} />;
        })}
      </div>
      {getComponent()}
    </div>
  );
}

export default Home;
