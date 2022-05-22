/* global AlgoSigner */
import nft from './StarshipBot.png';
import './App.css';

//Coinbase Wallet Imports
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

import Clock from './Components/Clock';
import NFTInfo from './Components/NFTInfo';
import TopBid from './Components/TopBid';
import MakeOffer from './Components/MakeOffer';

import React, { useEffect, useState, useCallback } from "react";
import {Button, Header, Message} from "semantic-ui-react";
import { Fragment } from "react";

//Metamask
import { ethers } from 'ethers';

function App() {

  //wallet connect
  const [addressETH, setAddressETH] = useState("");
  const [addressSOL, setAddressSOL] = useState("");
  const [addressALGO, setAddressALGO] = useState("");
  const [address, setAddress] = useState("");

  const [result, setResult] = useState("");

  const appId = 13793863;


  
  async function getLibrary(provider) {

    return new Web3Provider(provider);
    
    }

  async function checkWallets() {
    console.log('Loading Wallet Options');
  }


  const connectWalletPhantom = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setAddressSOL(response.publicKey.toString());
    }
  };

  const checkIfWalletIsConnectedPhantom = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with public key: ', response.publicKey.toString()
          );

          setAddressSOL(response.publicKey.toString());
          setAddress(response.publicKey.toString());
          setChain("SOL");
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnectedPhantom();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  
  async function requestAcccountMetamask() {
  
    console.log('Requesting Metamask account');
  
    if(window.ethereum) {
        console.log('Metamask detected');
        try {
            const accounts = await window.ethereum.request({
                method : "eth_requestAccounts",
            });
            console.log(accounts);
            setAddressETH(accounts[0]);
            setAddress(accounts[0]);
            setChain("ETH");
        } catch (error) {
            console.log('Error Connecting to Metamask');
        }
    } else {
        console.log('Metamask not detected');
    }
  }

  async function connectWalletMetamask() {
    if(window.ethereum) {
      await requestAcccountMetamask();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    }
  }

  const GetAccounts = () => {
    const action = useCallback(async () => {
      await AlgoSigner.connect({
        ledger: 'TestNet'
      });
      const accts = await AlgoSigner.accounts({
        ledger: 'TestNet'
      });
      return JSON.stringify(accts, null, 2);
      console.log('SUCCESSFUL');
    }, []);
  
    return <ExampleAlgoSigner title="Get Accounts" buttonText="AlgoSigner 🅰️" buttonAction={action}/>
  };

  const ExampleAlgoSigner = ({title, buttonText, buttonAction}) => {
    
  
    const onClickAlgo = useCallback(async () => {
      const r = await buttonAction();
      setResult(r);
      console.log('SUCCESSFUL');
      setAddressALGO(result.substring(22,60));
      setAddress(result.substring(22,60));
      console.log('key: ' + result.substring(22,60));
    }, [buttonAction]);
    
  
    return (
      <>
        <button className = 'buttonAlgo button2' primary={true} onClick={onClickAlgo}>{buttonText}</button>
      </>
    );
  };

  


  //timer hooks
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date("May 22, 2022 10:00:00 AM").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance <= 0) {
        // Stop Timer

        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (

    

    

    <div className="App">
      <header className="App-header">

        <div>
            <img src={nft} border-radius = '15px' className='button2'/>
        </div>
        </header>
        <NFTInfo/>

        <TopBid/>

        <Clock timerDays={timerDays} 
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
              />

        <MakeOffer/>

        <Fragment>
          <section className = "info-container">
              <button className ='buttonWallet button2'
                      onClick={checkWallets}>
                  {address.substring(0,4)}...{address.substring(39,42)}
              </button>
          </section>
        </Fragment>

        <Fragment>
          <section className = "info-container">
              <button className ='buttonCoinbase button2'
              onClick={requestAcccountMetamask}>
                  Coinbase 🔵
              </button>
          </section>
        </Fragment>

        <Fragment>
          <section className = "info-container">
              <button className ='buttonPhantom button2'
                      onClick={connectWalletPhantom}>
                  Phantom 👻
              </button>
          </section>
        </Fragment>

        <GetAccounts/>
      
    </div>

      
    
  );
}


export default App;
