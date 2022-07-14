import React, { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useDisclosure,
  ScaleFade,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { ethers } from 'ethers';

import { networkParams } from '../helpers/networks'
import { truncateAddress } from "../helpers/truncaters";
import logo from '../assets/images/DiscordIcon.png'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getNFTData, getStaked,
         getEpoch, getTokenInfo } from '../helpers/getValues';

export default function Navbar() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>('home');
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [error, setError] = useState();
  
  const connected = useAppSelector((state) => state.connected)

  useEffect(() => {
      if (window.ethereum) {
          window.ethereum.on('accountsChanged', connectWalletHandler)
          window.ethereum.on('chainChanged', handleChainChange)

          return () => {
              window.ethereum.removeListener('accountsChanged', connectWalletHandler)
              window.ethereum.removeListener('chainChanged', handleChainChange)
          }
      } 
  },[])

  const handleChainChange = () => {
      window.location.reload()
  }

  const dispatch = useAppDispatch();
  
  const handleNetworkSwitch = async (networkName: PropertyKey) => {
      setError(undefined);
      await changeNetwork({ networkName, setError })
  }
  
  const changeNetwork = async ({ networkName, setError }: 
                              {networkName:PropertyKey,
                                setError:React.Dispatch<React.SetStateAction<undefined>>}) => {
      try {
          if (!window.ethereum) throw new Error('No Crypto Wallet Found');
          await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                  ...networkParams[networkName]
              }]
          })
      } catch (err: any) {
          setError(err.message);
      }
  }

  const connectWalletHandler = () => {
      if (!connected){
          if (window.ethereum) {
              // Trigger network switch
              if (window.ethereum.networkVersion != 43113) {
                  window.ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [{
                          chainId: `0x${Number(43113).toString(16)}`
                      }]
                    })
                  handleNetworkSwitch('fuji')
              } else {
                  window.ethereum.request({method: 'eth_requestAccounts'})
                  .then((result: string[]) => {
                    setConnButtonText(truncateAddress(result[0]));
                    dispatch({type: 'LOADING'});
                    retrieveAll(result[0]);
                    dispatch({type: 'UPDATE_ADDRESS', payload: result[0]});
                    dispatch({type: 'CONNECT_WALLET'})
                  })
              } 
          } else {
            setConnButtonText('Connect Wallet'); 
            dispatch({type: 'DISCONNECT_WALLET'});
          }
      } else {
        setConnButtonText('Connect Wallet'); 
        dispatch({type: 'DISCONNECT_WALLET'});
      }
  }

  const retrieveAll = async (address: any) => {
    await retrieveNFTData(address);
    await retrieveTokenInfo(address);
    await retrieveEpoch(address);
    await retrieveStaked(address);
    dispatch({type: 'FINISH_LOADING'})
  }

  const retrieveNFTData = async (address:any) => {
    const [ nfts, supply, approved ] = await getNFTData(address);
    console.log([ nfts, supply, approved ])
    dispatch({type: 'UPDATE_NFTS_UNSTAKED', payload: nfts});
    dispatch({type: 'UPDATE_SUPPLY', payload: supply});
    dispatch({type: 'UPDATE_APPROVAL_NFTS', payload: approved});
  }
  const retrieveTokenInfo = async (address:any) => {
    const [ balance, rewards ] = await getTokenInfo(address);
    console.log([ balance, rewards ])
    dispatch({type: 'UPDATE_BALANCE', payload: balance});
    dispatch({type: 'UPDATE_CLAIMABLE', payload: rewards});
  }
  const retrieveEpoch = async (address:any) => {
    const [epoch, epochTime, riverSupply] = await getEpoch(address);
    console.log([epoch, epochTime, riverSupply])
    dispatch({type: 'UPDATE_EPOCH', payload: epoch});
    dispatch({type: 'UPDATE_EPOCH_TIME', payload: epochTime});
    dispatch({type: 'UPDATE_RIVER', payload: riverSupply})
  }
  
  const retrieveStaked = async (address:any) => {
    const [ peaceful, hungry, frenzy ] = await getStaked(address);
    console.log([peaceful, hungry, frenzy])
    dispatch({type: 'UPDATE_NFTS_PEACEFUL', payload: peaceful});
    dispatch({type: 'UPDATE_NFTS_HUNGRY', payload: hungry});
    dispatch({type: 'UPDATE_NFTS_FRENZY', payload: frenzy});
  }

  return (
    <>
    <Box 
      px={4}
    >
      <Flex
        gap='1rem'
        align='center'
        justify='space-between'
        borderBottom={'solid 1px rgb(240,240,240)'}
        >
          <Flex
            gap='2rem'
            align='center'
            >
            <Image w='80px' src={logo} alt='logo' />
            <Link 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              as={RouterLink} 
              to='/'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'home' ? '700' : '600'}`, fontSize: '18px', color: `${selected == 'home' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('home')}
              >
              Home
            </Link>
            <Link 
              as={RouterLink} 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              to='/staking'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'staking' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'staking' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('staking')}
              >
              Staking
            </Link>
            <Link 
              as={RouterLink} 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              to='/mint'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'mint' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'mint' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('mint')}
              >
              Mint
            </Link>
            <Link 
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: '600', fontSize: '18px', color: 'rgb(150,150,150)'}}
              isExternal={true}
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              href='https://github.com'
              >
              Docs
            </Link>
          </Flex>
          <Flex
            gap='1rem'
            align='center'>
            <Button
              display={{xsm: 'none', sm: 'none', md: 'inherit', lg: 'inherit'}}
              w='90px'
              h='36px'
              variant='unstyled'
              sx={{backgroundColor: 'rgb(254,249,244)', color: 'rgb(232,65,66)', cursor: 'text'}}>
              Avalanche
            </Button>
            <Button
              w='140px'
              h='36px'
              variant='outline'
              onClick={() => connectWalletHandler()}>
              {connButtonText}
            </Button>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ sm: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>
        {isOpen ? (
          <ScaleFade in={isOpen} initialScale={0.9}>
            <Box pb={4} display={{ sm: 'none' }}>
              <Stack as={'nav'} spacing={4} justify='center' align='center' p='2rem 0'>
                <Link 
                  
                  as={RouterLink} 
                  to='/'
                  onClick={() => setSelected('home')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'home' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'home' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Home
                </Link>
                <Link 
                  as={RouterLink} 
                  to='/staking'
                  onClick={() => setSelected('staking')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'staking' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'staking' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Staking
                </Link>
                <Link 
                  as={RouterLink} 
                  to='/mint'
                  onClick={() => setSelected('mint')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'mint' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'mint' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Mint
                </Link>
                <Link 
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: '600', fontSize: '18px', color: 'rgb(150,150,150)'}}
                  isExternal={true}
                  href='https://github.com'
                  >
                  Docs
                </Link>
              </Stack>
            </Box>
          </ScaleFade>
        ) : null}
      </Box>
    </>
  )
}