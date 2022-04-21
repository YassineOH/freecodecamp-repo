const soundKeys = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const App = () => {
  return (
    <div id="main">
      <KeysContainer keys={soundKeys} />
    </div>
  );
};

const passKey = (e) => {
  if (e.target.id === "") {
    return e.keyCode;
  } else {
    return e.target.id;
  }
};

const KeysContainer = ({ keys }) => {
  const [soundName, setSoundName] = React.useState("hello");
  document.addEventListener("keydown", (e) => runAudio(e));
  const handlClick = (e) => {
    runAudio(e);
  };
  const runAudio = (e) => {
    let test = passKey(e);
    let isKeyExist = keys.filter((key) => {
      return key.keyCode === Number(test);
    });
    if (isKeyExist) {
      e.target.querySelector("audio").play();
      let sound = isKeyExist[0];
      setSoundName(sound.id);
    }
  };
  return (
    <div id="drum-machine">
      <div id="keys">
        {keys.map((key) => (
          <Key
            key={key.keyCode}
            keyInfo={key}
            runAudio={runAudio}
            handlClick={handlClick}
          />
        ))}
      </div>
      <DisplaySound soundName={soundName} />
    </div>
  );
};

const Key = ({ keyInfo, runAudio, handlClick }) => {
  return (
    <div
      className="drum-pad"
      id={keyInfo.keyCode}
      onKeyPress={runAudio}
      onClick={handlClick}
    >
      <span>{keyInfo.keyTrigger}</span>

      <audio src={keyInfo.url} className="clip" id={keyInfo.keyTrigger} />
    </div>
  );
};

const DisplaySound = ({ soundName }) => (
  <div id="display">
    <span>{soundName}</span>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
