import { useEffect, useRef } from 'react';
import './VideoPlayer.css';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className="video-player-container">
      <p>Uid: {user.uid}</p>
      <div ref={ref} className="region"></div>
      <a className="leave" href="/">
        退出
      </a>
    </div>
  );
};
