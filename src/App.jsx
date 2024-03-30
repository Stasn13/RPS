import {useEffect, useState} from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateGame from './containers/CreateGame/CreateGame';
import GameDetails from './containers/GameDetails/GameDetails';
import Loader from './components/Loader/Loader';
import {createWeb3Modal, defaultConfig} from '@web3modal/ethers/react';
import {useWeb3ModalAccount} from '@web3modal/ethers/react';
import {projectId, sepolia, metadata} from './helpers/configs';

function App() {  
  const [isLoading, setIsLoading] = useState({status: false, message: ""});
  const {isConnected} = useWeb3ModalAccount();
  const ethersConfig = defaultConfig({metadata});
 

  useEffect(() => {
    createWeb3Modal({
      ethersConfig,
      chains: [sepolia],
      projectId,
      enableAnalytics: false
    });
  }, [ethersConfig]);

  if(!isConnected) {
    return <>
            <w3m-button />
            <legend>Please connect your wallet</legend>
          </>
  }

  return (
    <>
      <w3m-button />
      <BrowserRouter>
        <Loader enabled={isLoading.status} message={isLoading.message}/>
        <Routes>
          <Route path='' element={<CreateGame setIsLoading={setIsLoading}/>}/>
          <Route path='/game/:contractAddress' element={<GameDetails setIsLoading={setIsLoading}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
