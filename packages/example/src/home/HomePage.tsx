import { Web3Provider } from '@ethersproject/providers';
import React, { useCallback } from 'react';
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

  const onClick = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    const instance = await web3Modal.connect();

    const provider = new Web3Provider(instance);
    const accounts = await provider.listAccounts();
    window.alert(JSON.stringify(accounts));
  }, []);

  return (
    <Container>
      <button onClick={onClick}>Connect Wallet</button>
    </Container>
  );
};

export default HomePage;

const Container = styled.div``;
