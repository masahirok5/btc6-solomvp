import { useState, useRef, useEffect } from 'react';
import './App.css';
import { Members } from './components/Members';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { VideoRoom } from './components/VideoRoom';

function App() {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [joined, setJoined] = useState(false);

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
    <>
      <Members />

      <div id="react-speech-recognition">
        <p>入力: {listening ? 'on' : 'off'}</p>
        <button
          type="button"
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          入力開始
        </button>
        <button
          type="button"
          onClick={() => {
            SpeechRecognition.stopListening();
            setValue(transcript);
          }}
        >
          Stop
        </button>
        <button type="button" onClick={() => resetTranscript()}>
          リセット
        </button>
        <p>{transcript}</p>
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={(e) => handleChangeValue(e.target.value)}
          style={{ height: height ? `${height}px` : 'auto', border: 'none' }}
        />
        <button
          onClick={() => {
            console.log(value);
          }}
        >
          送信
        </button>
      </div>
      <div>
        <h1>Web conference</h1>
        {!joined && <button onClick={() => setJoined(true)}>Join Room</button>}
        {joined && <VideoRoom />}
      </div>
    </>
  );
}

export default App;
