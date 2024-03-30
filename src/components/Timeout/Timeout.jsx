import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Timeout = ({lastAction, timeLimit, onTimeout}) => {
    const [timeIsOut, setTimeIsOut] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!lastAction || !timeLimit) return;
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000); 
            const timeSinceAction = Math.abs(Number(lastAction) - currentTime);
            const res = Math.abs(Math.min(timeSinceAction - Number(timeLimit), 0));
            const minutes = Math.floor(res / 60);
            const seconds = res % 60;
            const transform = `${(!seconds && minutes > 0) ? minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            if(minutes === 0 && seconds === 0) {
                setTimeIsOut(true)
            }
            setTimeLeft(transform);
        }, 1000);

        if(timeIsOut) clearInterval(interval);

        return () => clearInterval(interval);
    }, [lastAction, timeIsOut, timeLimit]);
    return (
        <fieldset>
            <legend>You can get funds back {timeIsOut ? "" : `after: ${timeLeft}`}</legend>
            <button 
                disabled={!timeIsOut}
                onClick={onTimeout}
            >
                Return stake
            </button>
        </fieldset>
    );
};

Timeout.propTypes = {
    lastAction: PropTypes.bigint,
    timeLimit: PropTypes.bigint,
    onTimeout: PropTypes.func
  };


export default Timeout;