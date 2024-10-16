import React from "react";

const ArticleContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

export default ArticleContent;
