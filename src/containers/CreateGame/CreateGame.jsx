import {ContractFactory, 
        BrowserProvider, 
        keccak256, 
        solidityPackedKeccak256, 
        toBigInt, 
        randomBytes,
        parseEther} from 'ethers';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useWeb3ModalProvider, useWeb3ModalAccount} from '@web3modal/ethers/react';
import PropTypes from "prop-types";

import {rpsls as ABI} from '../../contracts/abi';
import {rpsls as Bytecode} from '../../contracts/bytecode';

import StakeSelector from '../../components/StakeSelector/StakeSelector';
import WeaponsSelector from '../../components/WeaponsSelector/WeaponSelector';

const CreateGame = ({setIsLoading}) => {
    const navigate = useNavigate();
    const {walletProvider} = useWeb3ModalProvider();
    const {isConnected} = useWeb3ModalAccount();

    const [j2, setJ2] = useState("");
    const [weapon, setWeapon] = useState("");
    const [stake, setStake] = useState("0");

    const deployContract = async () => {
        const c1 = weapon?.value;
        const salt = toBigInt(randomBytes(32)).toString();
        const c1Hash = solidityPackedKeccak256(['uint8', 'uint256'], [c1, salt]);
        setIsLoading({status: true, message: "Waiting for transaction confirmation"});
        if (isConnected) {
            setIsLoading(true);
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const ContractRPS = new ContractFactory(ABI, Bytecode, signer);
            const deployedContract = await ContractRPS.deploy(c1Hash, j2, {value: parseEther(stake)});
            setIsLoading({status: true, message: "Deploying contract"});
            await deployedContract.waitForDeployment();
            const contractAddress = await deployedContract.getAddress();
            localStorage.setItem("GameContract", contractAddress);
            localStorage.setItem("GameSalt", salt);
            localStorage.setItem("Weapon", c1);
            setIsLoading({status: false, message: ""});
            navigate(`/game/${contractAddress}`);
        }
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="j2-address">Player2 address: </label>
                <input 
                    placeholder='0x782c...' 
                    id='j2-address'
                    value={j2}
                    onChange={(e) => setJ2(e.target.value)}
                />
                <StakeSelector onChange={setStake}/>
                <WeaponsSelector onChange={setWeapon}/>
                <button 
                    type='submit' 
                    onClick={deployContract}
                    disabled={!weapon || !stake || !j2}
                >
                    Stake
                </button>
            </form>
        </>
    );
};

CreateGame.propTypes = {
    setIsLoading: PropTypes.func,
  };

export default CreateGame;