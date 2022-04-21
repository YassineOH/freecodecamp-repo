const App = () => {
    return (
        <div id="main">
            <h1> clock 25+5 </h1>
            <Container />

        </div>
    );
};

const Container = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLenght] = React.useState(25);
    const [min, setMin] = React.useState(sessionLength);
    const [sec, setSec] = React.useState(0);
    const [start, setStart] = React.useState(false);
    const [isSession, setIssession] = React.useState(true)



    React.useEffect(() => {
        let timer = setInterval(
            () => {
                setSec((sec) => ((sec === 0) ? 59 : sec - 1))
            },
            1000
        );
        if (!start || (sec === 0 && min === 0)) {
            clearInterval(timer)
        }

        return () => clearInterval(timer)
    }, [start]);



    React.useEffect(() => {
        if (isSession) {
            setMin(sessionLength)
        } else {
            setMin(breakLength)
            setStart(true)
        }

    }, [isSession])


    React.useEffect(() => {
        if (sec === 59) {
            setMin((min) => min - 1);
        } else if (sec === 0 && min === 0) {
            setIssession(!isSession)
            document.querySelector("audio").play()
        }
    }, [sec]);




    React.useEffect(() => {
        if (!start) {
            setSec(0)
            setMin(sessionLength)
        }
    }, [breakLength, sessionLength])


    const startStop = () => {
        setStart(!start)
    }

    const reset = () => {
        setSec(0)
        setMin(sessionLength)
        setStart(false)
        setBreakLength(5)
        setSessionLenght(25)
    }

    const handleBreakLenght = (e) => {
        if (!start) {
            if (
                e.target.classList[0] === "increment" ||
                e.target.classList["1"] === "bi-arrow-up"
            ) {
                setBreakLength((num) => num + 1);
            } else {
                setBreakLength((num) => (num === 1 ? 1 : num - 1));
            }
        }
    };

    const handleSessionLenght = (e) => {
        if (!start) {
            if (
                e.target.classList[0] === "increment" ||
                e.target.classList["1"] === "bi-arrow-up"
            ) {
                setSessionLenght((num) => num + 1);
            } else {
                setSessionLenght((num) => (num === 1 ? 1 : num - 1));
            }
        }
    };



    return (
        <div>
            <div id="controlLength">
                <ControllLenght
                    text="break"
                    state={breakLength}
                    setState={handleBreakLenght}
                />
                <ControllLenght
                    text="session"
                    state={sessionLength}
                    setState={handleSessionLenght}
                />
            </div>

            <Timer isSession={isSession} sec={sec} min={min} start={start} startStop={startStop} reset={reset} />
        </div>
    );
};

const ControllLenght = ({ text, state, setState }) => {
    return (
        <div class="controll" >
            <p id={`${text}-label`}> {text} length </p>
            <div>
                <button onClick={setState} id={`${text}-decrement`} class="decrement">
                    <i class="bi bi-arrow-down"></i>
                </button>
                <p id={`${text}-length`}>{state}</p>
                <button onClick={setState} id={`${text}-increment`} class="increment">
                    <i class="bi bi-arrow-up"></i>
                </button>
            </div>
        </div>
    );
};

const Timer = ({ isSession, sec, min, start, startStop, reset }) => {
    const formatNumber = num => {
        let test = `${num}`

        if (test.length == 2) {
            return test
        } else {
            return `0${num}`
        }

    }


    return (
        <div id="timer">
            <p id="timer-label">{
                isSession ? "session" : "break"
            }</p>
            <div id="time-left">
                <span>{formatNumber(min)}</span> : <span>{formatNumber(sec)}</span>
            </div>
            <div id="timer-control">
                <button id="start_stop" onClick={startStop}>
                    {!start ? (
                        <i class="bi bi-skip-start"></i>
                    ) : (
                        <i class="bi bi-pause-btn"></i>
                    )}
                </button>
                <button id="reset" onClick={reset}>
                    <i class="bi bi-arrow-clockwise"></i>
                </button>
            </div>
            <audio
                id="beep"
                preload="auto"
                style={{ width: 0, height: 0 }}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
};


ReactDOM.render(<App />, document.getElementById("root"));
