import React from "react";
import DOMPurify from "dompurify";

const ArticleContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  );
};

export default ArticleContent;
