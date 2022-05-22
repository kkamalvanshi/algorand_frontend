/* global AlgoSigner */
import nft from './StarshipBot.png';
import './App.css';

//Coinbase Wallet Imports
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

import Clock from './Components/Clock';
import NFTInfo from './Components/NFTInfo';
import TopBid from './Components/TopBid';

import React, { useEffect, useState, useCallback } from "react";
import {Button, Header, Message} from "semantic-ui-react";
import { Fragment } from "react";
import ReactDOM from "react-dom/client";

//Coinbase
import { ethers } from 'ethers';

function App() {

  //wallet connect
  const [addressETH, setAddressETH] = useState("");
  const [addressSOL, setAddressSOL] = useState("");
  const [addressALGO, setAddressALGO] = useState("");
  const [address, setAddress] = useState("");
  const [currCoin, setCurrCoin] = useState("");

  const [tokens, setTokens] = useState(null);
  const [coin, setCoin] = useState("");

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
      setAddress(response.publicKey.toString());
      setCurrCoin("SOL");
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
          setCurrCoin("SOL");
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


  
  async function requestAcccountCoinbase() {
  
    console.log('Requesting Coinbase account');
  
    if(window.ethereum) {
        console.log('Coinbase detected');
        try {
            const accounts = await window.ethereum.request({
                method : "eth_requestAccounts",
            });
            console.log(accounts);
            setAddressETH(accounts[0]);
            setAddress(accounts[0]);
            setCurrCoin("ETH");
        } catch (error) {
            console.log('Error Connecting to Coinbase');
        }
    } else {
        console.log('Coinbase not detected');
    }
  }

  async function connectWalletCoinbase() {
    if(window.ethereum) {
      await requestAcccountCoinbase();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    }
  }

  const GetAccounts = () => {

    const action = useCallback(async () => {
      if (typeof AlgoSigner !== 'undefined') {
        console.log('AlgoSigner is installed')
      } else {
        console.log("AlgoSigner is NOT installed.");
      }
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
      setCurrCoin("ALGO");
      console.log('key: ' + result.substring(22,60));
    }, [buttonAction]);
    
  
    return (
      <>
        <button className = 'buttonAlgo button2' primary={true} onClick={onClickAlgo}>{buttonText}</button>
      </>
    );
  };


  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }
  //timer hooks
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {

    //set date
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

        

        <Fragment>
          <section className = "info-container">
              <button className ='buttonWallet button2'
                      onClick={checkWallets}>
                  {address.substring(0,4)}...{address.substring(address.length-3,address.length)} {'('+currCoin+')'}
              </button>
          </section>
        </Fragment>

        <Fragment>
          <section className = "info-container">
              <button className ='buttonCoinbase button2'
              onClick={requestAcccountCoinbase}>
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

        
        <form onSubmit={handleSubmit}> 
            <section className = "info-container">
                <section className = "makeoffer button2">
                    <div>
                        Make an Offer:
                    </div>
                    <div>
                        <input type="number" 
                              name="tokens" 
                              placeholder='#'
                              value={inputs.tokens || ""} 
                              onChange={handleChange}></input>
                    </div>
                    <div>
                        <input type="text" 
                                placeholder = "ALGO"
                                name="coin" 
                                value={inputs.coin || ""} 
                                onChange={handleChange} ></input>
                    </div>
                    <div>
                        <button className ='buttonBid button2' type="submit">Bid</button>
                    </div>
                </section>
            </section>
            </form>


        
        
      
    </div>

      
    
  );
}


export default App;
