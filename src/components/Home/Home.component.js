import React, { useEffect, useState } from "react";
import Discussions from "../Discussions/Discussions.component";

import discuss from "../../assets/images/discuss.png";
import news from "../../assets/images/news.png";
import study from "../../assets/images/study.png";
import test from "../../assets/images/test.png";

import create from "../../assets/images/create.png";
import face from "../../assets/images/face_4.png";
import tick from "../../assets/images/checklist.png";
import folder from "../../assets/images/folder_copy.png";
import cloud from "../../assets/images/wb_cloudy.png";

import "./Home.scss";
import StudyGroups from "../StudyGroups/StudyGroups.component";
import CreateModal from "../../molecules/CreateModal/CreateModal";
import Construction from "../Construction/Construction.component";
import Todo from "../Todo/Todo.component";

function Home({ page, subPage }) {
  const [currentPage, setCurrentPage] = useState("Discussion zone");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const features = [
    {
      name: "Discussion zone",
      url: "discussions",
      logo: discuss,
    },
    {
      name: "Study groups",
      url: "groups",
      logo: study,
    },
    {
      name: "Todo",
      logo: test,
      url: "todo",
    },
    {
      name: "News",
      logo: news,
      url: "construction/news",
    },
  ];

  const pageOptions = [
    {
      src: face,
      alt: "profile",
      key: "profile",
    },
    {
      src: create,
      alt: "create post",
      key: "create",
    },
    {
      src: folder,
      alt: "my bookmarks",
      key: "bookmark",
    },
    {
      src: cloud,
      alt: "my files",
      key: "files",
    },
  ];

  const getPageOptions = () => {
    if (currentPage === features[0].name) {
      return pageOptions;
    } else {
      let pageOptionCopy = [...pageOptions].filter((option) => {
        return option.alt !== pageOptions[2].alt;
      });
      return pageOptionCopy;
    }
  };

  const getComponent = () => {
    switch (page) {
      case "discussions": {
        return <Discussions />;
      }
      case "groups": {
        return <StudyGroups pageToRender={subPage} />;
      }
      case "construction": {
        return <Construction />;
      }
      case "todo": {
        return <Todo />;
      }
      default: {
        return <></>;
      }
    }
  };

  function handleFeatureChange(featurePath) {
    window.location.href = window.location.origin + "/aie/" + featurePath;
  }

  const handleOnClickPageOption = (option) => {
    switch (option) {
      case "create": {
        setShowCreateModal(true);
        break;
      }
      case "todo": {
        window.location.href = `/aie/todo`;
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const isOnboardingComplete = localStorage.getItem("isOnboardingComplete");
    if (!isOnboardingComplete)
      localStorage.setItem("isOnboardingComplete", true);
  }, []);

  useEffect(() => {
    /* Do nothing */
  }, [currentPage, showCreateModal]);

  return (
    <>
      {showCreateModal && (
        <CreateModal
          closeModal={() => setShowCreateModal(false)}
          type={page === "todo" ? "todo" : "post"}
        />
      )}
      <div className={"home-layout"}>
        <div className="sidebar">
          {features.map((f) => {
            return (
              <img
                alt={f.name}
                key={f.name}
                className={window.location.pathname.split('aie/')[1] === f.url ? "selected" : ""}
                title={f.name}
                src={f.logo}
                onClick={() => handleFeatureChange(f.url)}
              />
            );
          })}
        </div>
        <div className={showCreateModal?  "backdrop" : "full-page"}>
          <div className="flex-column w-100-perc">
            <div className="user-panel">
              {getPageOptions().map((option) => {
                return (
                  <img
                    src={option.src}
                    key={option.key}
                    alt={option.alt}
                    onClick={() => handleOnClickPageOption(option.key)}
                  />
                );
              })}
            </div>
            {getComponent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
