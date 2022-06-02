import { Web3Provider } from '@ethersproject/providers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Web3Modal from 'web3modal';

const HomePage = () => {
  const providerOptions = {
    injected: {
      display: {
        name: 'Metamask',
        description: 'Connect with MetaMask',
      },
      package: null,
    },
  };

  // Polygon Mainnet
  const INTENDED_CHAIN_ID = 137;

  const [account, setAccount] = useState<string>('');

  const onClick = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    const instance = await web3Modal.connect();

    const provider = new Web3Provider(instance);
    const network = await provider.getNetwork();
    const isIntendedChain = network.chainId === INTENDED_CHAIN_ID;
    if (!isIntendedChain) {
      const metamask = window.ethereum as MetaMaskInpageProvider;
      await metamask.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${INTENDED_CHAIN_ID.toString(16)}` }],
      });
    }
    const [account] = await provider.listAccounts();
    setAccount(account);
  }, []);

  return (
    <Container>
      {!!account ? (
        <span>{account}</span>
      ) : (
        <button onClick={onClick}>Connect Wallet</button>
      )}
    </Container>
  );
};

export default HomePage;

const Container = styled.div``;
