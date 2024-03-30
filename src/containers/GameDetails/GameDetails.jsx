import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {Contract, 
        BrowserProvider,
        formatUnits
    } from 'ethers';
import {useWeb3ModalProvider, useWeb3ModalAccount} from '@web3modal/ethers/react';

import {rpsls as ABI} from '../../contracts/abi';

import {Player1, Player2} from '../Players';
import Winner from '../../components/Winner/Winner';

const GameDetails = ({setIsLoading}) => {
    const [gameContract, setGameContract] = useState();
    const [isJ1, setIsJ1] = useState();
    const [stake, setStake] = useState('0');
    const [c2, setC2] = useState();
    const [lastAction, setLastAction] = useState();
    const [timeLimit, setTimeLimit] = useState();
    const [gameOver, setGameOver] = useState(false);
    const {walletProvider} = useWeb3ModalProvider();
    const {address, isConnected} = useWeb3ModalAccount();

    const {contractAddress} = useParams();

    useEffect(() => {
        if(isConnected, contractAddress, walletProvider) {
            buildGame();
        }
    }, [walletProvider, address, isConnected]);

    async function buildGame() {
        setIsLoading({status: true, message: "Building game"});
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contract = new Contract(contractAddress, ABI, signer);
        setGameContract(contract);
        const j1 = await contract.j1();
        setC2(await contract.c2());
        setTimeLimit(await contract.TIMEOUT());
        setLastAction (await contract.lastAction());
        setStake(await contract.stake());
        setIsJ1(address === j1);
        setIsLoading({status: false, message: ""});

        const interval = setInterval(async () => {
            const move = await contract.c2();
            const stake = await contract.stake();
            if(move) {
                setC2(move);
            }
            if(!stake){
                setStake(stake);
                clearInterval(interval);
                setGameOver(true);
            }
        }, 3000);

        // if(timeIsOut) clearInterval(interval);
    }

    if(gameOver) {
        return <Winner gameContract={contractAddress}/>
    }

    return (
        <>
            {isJ1 ? 
                <Player1 
                    setIsLoading={setIsLoading}
                    gameContract={gameContract}
                    c2={c2}
                    lastAction={lastAction}
                    timeLimit={timeLimit}
                /> 
                : 
                <Player2 
                    setIsLoading={setIsLoading}
                    c2={c2}
                    gameContract={gameContract}
                    stake={formatUnits(stake)}
                    timeLimit={timeLimit}
                    lastAction={lastAction}
                />
            }
        </>
    );
}

GameDetails.propTypes = {
    setIsLoading: PropTypes.func,
};

export default GameDetails;