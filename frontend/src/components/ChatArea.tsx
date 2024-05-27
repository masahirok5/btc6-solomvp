import type { FC } from 'react';
import { useEffect, useState } from 'react';
import './ChatArea.css';

// interface Chat {
//   id: number;
//   member_id: number;
//   partner: number;
//   content: string;
//   datetime: Date;
// }

export const ChatArea: FC = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('chat/1/0');
      const contexts = await res.json();
      const chatEls = contexts.map((obj, i) =>
        obj.member_id === 1 ? (
          <div key={i} className="me">
            <p>{obj.content}</p>
          </div>
        ) : (
          <div key={i} className="you">
            <p>{obj.content}</p>
            <input
              className="play"
              type="image"
              src="/play.png"
              alt="再生"
              onClick={() => {
                const msg = new SpeechSynthesisUtterance();
                msg.text = obj.content;
                window.speechSynthesis.speak(msg);
              }}
            />
          </div>
        )
      );
      setChat(chatEls);
    })();
  }, []);

  return (
    <>
      <article className="chatarea-container">
        <br />
        <br />
        <br />
        <br />
        {chat}
      </article>
    </>
  );
};
