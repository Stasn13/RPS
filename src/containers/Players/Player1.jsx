import PropTypes from "prop-types";

import Timeout from '../../components/Timeout/Timeout';

const Player1 = ({setIsLoading, gameContract, c2, timeLimit, lastAction}) => {
    
    async function solve() {
        const _c1 = localStorage.getItem("Weapon");
        const salt = localStorage.getItem("GameSalt");
        setIsLoading({status: true, message: "Sending transaction"});
        const tx = await gameContract.solve(_c1, salt);
        await tx.wait();
        setIsLoading({status: false, message: ""});
    }

    async function timeout() {
        if(!c2) {
            setIsLoading({status: true, message: "Reverting stakes"});
            const tx = await gameContract.j2Timeout();
            await tx.wait();
            setIsLoading({status: false, message: ""});
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <strong>Player1</strong>
            {!c2 && <Timeout 
                        timeLimit={timeLimit} 
                        lastAction={lastAction}
                        onTimeout={timeout}
                    />
            }
            <button 
                type='submit' 
                onClick={solve}
                disabled={!c2}
            >
                Solve
            </button>
            <span
                >Now you can share this &nbsp;
                <a href={window.location.href} target="_blank">link</a>
                &nbsp; with your opponent
            </span>
        </form>
    );
};

Player1.propTypes = {
    setIsLoading: PropTypes.func,
    gameContract: PropTypes.any,
    c2: PropTypes.any,
    lastAction: PropTypes.bigint,
    timeLimit: PropTypes.bigint
};

export default Player1;