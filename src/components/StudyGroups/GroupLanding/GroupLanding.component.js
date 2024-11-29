import React, {useState} from "react";
import "./GroupLanding.scss";
import Card from "../../../atoms/Card/Card";
import VerticalLine from "../../../atoms/VerticalLine/VerticalLine";

function GroupLanding({
    setGroupToCreate,
    cardData
}) {
  const extraClasses = {
    cardClasses: "padding-1-1-2-1 min-height-200 cursor-pointer",
    titleClasses: "font-center",
  };

  function showCreateScreen(type) {
    setGroupToCreate(type);
    window.location.href = "create";
  }

  return (
    <>
      <select>
        <option value={[]}>Search for a study group...</option>
      </select>
      <div className="card-bracket">
        {cardData.map((card_data, index) => {
          return (
            <>
              <div className="card-image-block" onClick={() => showCreateScreen(card_data.title)}>
                <Card
                  title={card_data.title}
                  body={card_data.content}
                  bgColor={{
                    title: "E2DCDE",
                    body: "E2DCDE",
                  }}
                  fontColor={"black"}
                  hideButtons
                  extraClasses={extraClasses}
                />
                <img src={card_data.image} />
              </div>
              {index < 3 && <VerticalLine height={300} />}
            </>
          );
        })}
      </div>
    </>
  );
}

export default GroupLanding;
