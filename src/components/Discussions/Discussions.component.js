import React from "react";
import "./Discussions.scss";
import Card from "../../atoms/Card/Card";
import { getbgColorFromType, getFontColorFromType } from "../../utils/util";

import create from "../../assets/images/create.png";
import face from "../../assets/images/face_4.png";
import tick from "../../assets/images/checklist.png";
import folder from "../../assets/images/folder_copy.png";
import cloud from "../../assets/images/wb_cloudy.png";


function Discussions() {

  const data = [{
      owner: "BloodRaven",
      type: "Shares",
      title: "Cleared UPSC CSE 2024 Prelims. Ask me anything!",
      content: "I’m excited to announce that I’ve successfully cleared the UPSC exam! It’s been a long and challenging journey, filled with countless hours of study, determination, and perseverance. From choosing the right optional subject to managing time effectively, every step was crucial. I’m here to share my experiences, strategies, and the challenges I encountered along the way. Whether you’re an aspirant or simply curious about the process, feel free to ask me anything. I hope my insights can inspire and guide others on their own UPSC journey. Looking forward to your questions!"
    }, {
      owner: "BTB0Y",
      type: "Advice",
      title: "Confused about drishti and vision ias",
      content: "I'm currently deciding between Vision IAS and Drishti IAS for my UPSC coaching, and I'm feeling a bit confused. Both institutes have strong reputations, but I’m unsure which one would be the best fit for my preparation style and goals. Vision IAS is known for its comprehensive test series and online resources, while Drishti IAS is praised for its Hindi medium support and detailed guidance. If anyone has experience with either of these coaching centers, I would really appreciate your insights. Which one would you recommend, and why? Your advice could help me make the right choice."
    }, {
      owner: "IDeathBedI",
      type: "Shares",
      title: "Importance of plan B",
      content: "While full commitment to UPSC preparation is crucial, having a Plan B is equally important. The journey is challenging and unpredictable, and a backup plan ensures you have options in case things don’t go as expected. It’s not about doubting your abilities, but about being practical and prepared for any outcome. A Plan B can reduce stress and provide peace of mind, allowing you to focus on your preparation with a clear head. Remember, success can come in many forms, and being adaptable is key to achieving your goals."
    }, {
      owner: "Esco",
      type: "Celebrates",
      title: "Reached 500 followers!",
      content: "Excited to share that my YouTube study channel has reached 500+ followers! 🎉 A huge thank you to everyone who has supported and believed in this journey. Your encouragement keeps me motivated to create more helpful content. Let’s keep learning and growing together! More to come—stay tuned!"
    }, {
      owner: "BloodRaven",
      type: "Shares",
      title: "Cleared UPSC CSE 2024 Prelims. Ask me anything!",
      content: "I’m excited to announce that I’ve successfully cleared the UPSC exam! It’s been a long and challenging journey, filled with countless hours of study, determination, and perseverance. From choosing the right optional subject to managing time effectively, every step was crucial. I’m here to share my experiences, strategies, and the challenges I encountered along the way. Whether you’re an aspirant or simply curious about the process, feel free to ask me anything. I hope my insights can inspire and guide others on their own UPSC journey. Looking forward to your questions!"
    }, {
      owner: "BTB0Y",
      type: "Advice",
      title: "Confused about drishti and vision ias",
      content: "I'm currently deciding between Vision IAS and Drishti IAS for my UPSC coaching, and I'm feeling a bit confused. Both institutes have strong reputations, but I’m unsure which one would be the best fit for my preparation style and goals. Vision IAS is known for its comprehensive test series and online resources, while Drishti IAS is praised for its Hindi medium support and detailed guidance. If anyone has experience with either of these coaching centers, I would really appreciate your insights. Which one would you recommend, and why? Your advice could help me make the right choice."
    }, {
      owner: "IDeathBedI",
      type: "Shares",
      title: "Importance of plan B",
      content: "While full commitment to UPSC preparation is crucial, having a Plan B is equally important. The journey is challenging and unpredictable, and a backup plan ensures you have options in case things don’t go as expected. It’s not about doubting your abilities, but about being practical and prepared for any outcome. A Plan B can reduce stress and provide peace of mind, allowing you to focus on your preparation with a clear head. Remember, success can come in many forms, and being adaptable is key to achieving your goals."
    }, {
      owner: "Esco",
      type: "Celebrates",
      title: "Reached 500 followers!",
      content: "Excited to share that my YouTube study channel has reached 500+ followers! 🎉 A huge thank you to everyone who has supported and believed in this journey. Your encouragement keeps me motivated to create more helpful content. Let’s keep learning and growing together! More to come—stay tuned!"
    }
  ];
  
  return (
    <div className="discussion-layout">
      <div className="user-panel">
        <img src={tick} alt="todo list" title="todo list"/>
        <img src={face}/>
        <img src={create}/>
        <img src={cloud}/>
        <img src={folder}/>
      </div>
      <div className="cards-container">
      {data.map((cardData) => {
        return <Card 
          title={[cardData.owner,' ',cardData.type,': ',cardData.title].join('')}
          body={cardData.content}
          bgColor={getbgColorFromType(cardData.type)}
          fontColor={getFontColorFromType(cardData.type)}
        />
      })}
      </div>
    </div>
  );
}

export default Discussions;
