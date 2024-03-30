import {useState} from "react";
import PropTypes from "prop-types";
import {parseEther} from 'ethers';

import WeaponsSelector from '../../components/WeaponsSelector/WeaponSelector';
import Timeout from '../../components/Timeout/Timeout';

import {weapons} from "../../helpers/constants";

const Player2 = ({stake, setIsLoading, gameContract, c2, timeLimit, lastAction}) => {
    const [_c2, set_c2] = useState();

    async function play() {
        setIsLoading({status: true, message: "Sending transaction"});
        const tx = await gameContract.play(_c2.value, {value: parseEther(stake)});
        await tx.wait();
        setIsLoading({status: false, message: ""});
    }

    async function timeout() {
        if(c2) {
            setIsLoading({status: true, message: "Reverting stakes"});
            const tx = await gameContract.j1Timeout();
            await tx.wait();
            setIsLoading({status: false, message: ""});
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
                <strong>Player2</strong>
                <span>
                    Current stake: {stake}
                </span>
                {c2 ? 
                    <>
                        <span>Your move is: {weapons[Number(c2) - 1].name}</span>
                        <Timeout 
                            timeLimit={timeLimit} 
                            lastAction={lastAction}
                            onTimeout={timeout}
                        />
                    </>
                    :
                    <>
                        <WeaponsSelector onChange={set_c2}/>
                        <button
                            disabled={c2}
                            onClick={play}
                        >
                            Play
                        </button>
                    </>
                }
            </form>
    );
};

Player2.propTypes = {
    setIsLoading: PropTypes.func,
    gameContract: PropTypes.any,
    stake: PropTypes.string,
    set_c2: PropTypes.func,
    c2: PropTypes.any, 
    lastAction: PropTypes.bigint,
    timeLimit: PropTypes.bigint
};

export default Player2;