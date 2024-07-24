import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 dark:bg-gray-800 p-4 flex justify-center items-center">
      <a href="https://www.instagram.com/theodearson_/" target="_blank" rel="noopener noreferrer" className="mx-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-8 h-8" />
      </a>
      <a href="https://theodrsp.github.io/techboard/" target="_blank" rel="noopener noreferrer" className="mx-4">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-8 h-8" />
      </a>
    </footer>
  );
};

export default Footer;
