import { useState } from 'react';
import './App.css';
import { VideoRoom } from './components/VideoRoom';
import { Chat } from './components/Chat';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';

function App() {
  const [joined, setJoined] = useState(false);
  const [chatOrVideo, setChatOrVideo] = useState(true);

  return (
    <div className="app">
      <Header chatOrVideo={chatOrVideo} setChatOrVideo={setChatOrVideo} />
      {chatOrVideo ? (
        <>
          <ChatArea />
          <Chat />
        </>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <h1>Web conference</h1>
          {!joined && (
            <button onClick={() => setJoined(true)}>Join Room</button>
          )}
          {joined && <VideoRoom />}
        </div>
      )}
    </div>
  );
}

export default App;
