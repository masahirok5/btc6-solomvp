import type { FC } from 'react';
import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import './VideoRoom.css';

const APP_ID = import.meta.env.VITE_APPID;
const TOKEN = import.meta.env.VITE_TOKEN;
const CHANNEL = 'dig';
const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom: FC = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);
    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (const localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      //   client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <div>
      <div className="video-room-container">
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
