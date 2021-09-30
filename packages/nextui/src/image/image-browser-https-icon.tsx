import React from 'react';

const ImageBrowserHttpsIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 10.2H19V21H5V10.2Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12C13.933 12 15.5 10.3882 15.5 8.4C15.5 6.41177 13.933 4.8 12 4.8C10.067 4.8 8.5 6.41177 8.5 8.4C8.5 10.3882 10.067 12 12 12ZM12 13.8C14.8995 13.8 17.25 11.3823 17.25 8.4C17.25 5.41766 14.8995 3 12 3C9.10051 3 6.75 5.41766 6.75 8.4C6.75 11.3823 9.10051 13.8 12 13.8Z"
      />
    </svg>
  );
};

const MemoImageBrowserHttpsIcon = React.memo(ImageBrowserHttpsIcon);

export default MemoImageBrowserHttpsIcon;
