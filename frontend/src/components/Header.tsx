import type { FC } from 'react';
import './Header.css';

interface Props {
  chatOrVideo: boolean;
  setChatOrVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<Props> = ({ chatOrVideo, setChatOrVideo }) => {
  return (
    <div className="header-container">
      <h2
        className={chatOrVideo ? 'selected' : ''}
        onClick={() => {
          setChatOrVideo(true);
        }}
      >
        AIチャット
      </h2>
      <h2
        className={chatOrVideo ? '' : 'selected'}
        onClick={() => setChatOrVideo(false)}
      >
        ビデオ会議
      </h2>
    </div>
  );
};
