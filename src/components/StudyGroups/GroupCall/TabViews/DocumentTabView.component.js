import React from "react";

import pdf from "../../../../assets/images/pdf.png";

function DocumentTabView({ documents }) {
  return (
    <div className="document-tab-view">
      <div className="documents">
        {documents.map((document, index) => {
          return (
            <div className="document-details">
              <div>
                {index+1}. {document.name}
              </div>
              <img src={pdf} />
            </div>
          );
        })}
      </div>
      <button>Upload Document</button>
    </div>
  );
}

export default DocumentTabView;
