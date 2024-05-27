import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './Chat.css';

export const Chat: FC = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      setHeight(0); // テキストエリアの高さを初期値に戻す
    }
  }, [value]);

  useEffect(() => {
    // 高さが初期値の場合にscrollHeightを高さに設定する
    if (!height && textAreaRef.current) {
      setHeight(textAreaRef.current.scrollHeight);
    }
  }, [height]);

  function handleChangeValue(value: string) {
    setValue(value);
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>ブラウザが音声認識未対応です</span>;
  }

  return (
    <div className="chat-container">
      {/* <span>入力: {listening ? 'on' : 'off'}</span> */}
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        style={{ height: height ? `${height}px` : 'auto', border: 'none' }}
      />
      {listening ? (
        <input
          className="microoff"
          type="image"
          src="/microoff.png"
          alt="終了"
          onClick={() => {
            SpeechRecognition.stopListening();
            setValue(transcript);
          }}
        />
      ) : (
        <input
          className="microon"
          type="image"
          src="/microon.png"
          alt="開始"
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        />
      )}
      <input
        className="reset"
        type="image"
        src="/reset.png"
        alt="リセット"
        onClick={() => resetTranscript()}
      />
      <input
        className="submit-btn"
        type="image"
        src="/send.png"
        alt="送信"
        onClick={() => {
          console.log(value);
          resetTranscript();
        }}
      />
    </div>
  );
};
