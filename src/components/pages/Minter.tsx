import React, { useState } from 'react';
import {
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Stack,
  Heading,
  Divider,
  HStack,
  Skeleton,
  
} from '@chakra-ui/react';
import {
  MinusIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


import { stakingABI, nftABI } from '../helpers/abis';
import {staking, nft} from '../helpers/contracts';
import minterImg from '../assets/images/Minter.png';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getNFTData } from '../helpers/getValues';

export default function Minter() {

  const toast = useToast()
  const balance = useAppSelector((state) => state.balance);
  const avax = useAppSelector((state) => state.avax);
  const supply = useAppSelector((state) => state.nftSupply);
  const connected = useAppSelector((state) => state.connected);
  const claimable = useAppSelector((state) => state.claimable);
  const approvedFish = useAppSelector((state) => state.approvedToken);
  const address = useAppSelector((state) => state.address);
  const paused = useAppSelector((state) => state.nftPaused);

  const costAvax = 0.123;
  const costFish = 100;
  const maxAmount = 20;
  
  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();


  const addAmount = () => {
    if (amount < maxAmount) {
      setAmount(amount + 1);
    }
  }

  const subAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  const mintAvax = async(_amount:number) => {
    const value = _amount * costAvax
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nft, nftABI, signer)
    try {
      const tx = await nftContract.mintPresale(_amount, {value: ethers.utils.parseEther(String(value))});
      toast({
        title: 'Transaction Sent',
        description: `Minting ${_amount} Bears`,
        status: 'info',
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      })
      await tx.wait()
      toast({
        title: 'Transaction Success',
        description: 'Welcome to the river!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(async () => {
        const [ nfts, supply, approved, paused ] = await getNFTData(address);
        console.log([ nfts, supply, approved ])
        dispatch({type: 'UPDATE_NFTS_UNSTAKED', payload: nfts});
        dispatch({type: 'UPDATE_NFTS_SUPPLY', payload: supply});
      },1000) 
    } catch (error:any) {
      if (error.code !== 4001) {
        toast({
          title: 'Transaction Failed',
          description: error.data.message,
          status: 'error',
          position: 'top-right',
          isClosable: true
        })
      }
      console.log(error)
    }
  }
  
  const mintFish = async(_amount:number) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nft, nftABI, signer)
    try {
      const tx = await nftContract.mintWithFish(_amount);
      toast({
        title: 'Transaction Sent',
        description: `Minting ${_amount} Bears`,
        status: 'info',
        isClosable: true,
        position: 'top-right'
      })
      await tx.wait()
      toast({
        title: 'Transaction Success',
        description: 'Welcome to the river!',
        status: 'success',
        isClosable: true,
        position: 'top-right'
      });
      setTimeout(async () => {
        const [ nfts, supply, approved, paused ] = await getNFTData(address);
        console.log([ nfts, supply, approved ])
        dispatch({type: 'UPDATE_NFTS_UNSTAKED', payload: nfts});
        dispatch({type: 'UPDATE_NFTS_SUPPLY', payload: supply});
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then((balance: any) => {
          dispatch({type: "UPDATE_AVAX", payload: Number(ethers.utils.formatEther(balance)).toFixed(4)})
        })
      },1000) 
    } catch (error:any) {
      if (error.code != 4001) {
        toast({
          title: 'Transaction Failed',
          description: error.data.message,
          status: 'error',
          position: 'top-right',
          isClosable: true
        })
      }
      console.log(error)
    }
  }

  const approveFish = async() => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
      const tx = await stakingContract.approve(nft, ethers.BigNumber.from("0x1431E0FAE6D7217CAA0000000"));
      toast({
        title: 'Transaction Sent',
        description: 'Approving FISH for minting.',
        status: 'info',
        position: 'top-right',
        isClosable: true
      })
      await tx.wait()
      toast({
        title: 'Transaction Success',
        description: 'FISH Approved.',
        status: 'success',
        position: 'top-right',
        isClosable: true
      });
      dispatch({type: 'UPDATE_APPROVAL_TOKEN', payload: ethers.BigNumber.from("0x1431E0FAE6D7217CAA0000000")})
    } catch (error:any) {
      if (error.code != 4001) {
        toast({
          title: 'Transaction Failed',
          description: error.data.message,
          status: 'error',
          position: 'top-right',
          isClosable: true
        })
      }
      console.log(error)
    }
  }

  return (
    <Stack justify='center' align='center' p={4} minH='calc(100vh - 90px)'>
      <Stack justify='center' align={'center'} spacing={0}>
        <Heading>Pre-Sale</Heading>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          First 4000 Bears minted with Avax before the experiment begins
        </Text>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          0.123 AVAX per Lazy Bear
        </Text>
      </Stack>
      <Stack p={4} direction={{xsm: 'column-reverse', sm: 'column-reverse',md: 'row'}} justify='space-around' gap='2rem'>
        <Stack minW='300px' p={4} border='solid 1px rgb(240,240,240)' borderRadius='lg' >
          <Stack mb='2rem' gap='0.5rem'>
            <Stack justify='start' align='center' spacing={0}>
              <Heading size='md' >Mint NFT</Heading>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text size='sm' w='100%' color='gray.300' align='center'>{supply} / 4000</Text>
              </Skeleton>
            </Stack>
            <Flex align='center' justify='space-between'>
              <Heading  size='sm'>Balance</Heading>
              <Text>{avax} AVAX</Text>
            </Flex>
            <Divider />
            <Flex align='center' justify='space-between' gap='0.5rem'>
              <Heading size='sm'>Amount</Heading>
              <HStack spacing={1} align='center' justify='space-between'>
                <IconButton size='sm' boxShadow='sm' 
                  borderRadius='lg' aria-label='add' 
                  icon={<AddIcon w={3} h={3} />} onClick={() => addAmount()} 
                />
                <Text>{amount}</Text>
                <IconButton size='sm' boxShadow='sm' 
                   borderRadius='lg' aria-label='subtract' 
                  icon={<MinusIcon w={3} h={3} />} onClick={() => subAmount()}
                />
              </HStack>
              <Button onClick={()=>setAmount(maxAmount)}>Max</Button>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
              <Heading size='sm'>Total</Heading>
              <Text>{costAvax * amount} AVAX</Text>
            </Flex>
            <Divider />
          </Stack>
          <Button onClick={() => mintAvax(amount)} disabled={!connected || paused} mt='2rem'>
            Mint
          </Button>
          {!connected ?
            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Connect Your Wallet to Mint
            </Text>
            
            :

            paused ?

            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Contract is paused
            </Text>

            :

            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Mint {amount} Bears at {costAvax * amount} AVAX
            </Text>
          }
        </Stack>
        <Stack>
          <Image w='300px' h='300px' bg='white' borderRadius='lg' src={minterImg} alt='gif' /> 
          <Text align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
            Mint and Stake your Bear on the river to earn the tasty reward of FISH 
          </Text>
        </Stack>
      </Stack>

      {/* <Stack justify='center' align={'center'} spacing={0}>
        <Heading>$FISH Sale</Heading>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          Last 16,000 Bears minted with $FISH
        </Text>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          100 $FISH per Lazy Bear
        </Text>
      </Stack>
      <Stack p={4} direction={{xsm: 'column-reverse', sm: 'column-reverse',md: 'row'}} justify='space-around' gap='2rem'>
        <Stack minW='300px' p={4} border='solid 1px rgb(240,240,240)' borderRadius='lg' bg='white'>
          <Stack mb='2rem' gap='0.5rem'>
            <Stack justify='start' align='center' spacing={0}>
              <Heading size='md' color='rgb(50,50,50)' >Mint NFT</Heading>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text size='sm' w='100%' color='gray.300' align='center'>{supply} / 20000</Text>
              </Skeleton>
            </Stack>
            <Flex align='center' justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Balance</Heading>
              <Text>{Math.trunc(balance / (10 ** 18))} $FISH</Text>
            </Flex>
            <Divider />
            <Flex align='center' justify='space-between' gap='0.5rem'>
              <Heading color='rgb(50,50,50)' size='sm'>Amount</Heading>
              <Flex align='center' justify='space-between'>
                <IconButton bg='white' size='sm' boxShadow='sm' 
                  _hover={{backgroundColor: 'rgb(250,250,250)'}} borderRadius='lg' aria-label='add' 
                  icon={<AddIcon w={3} h={3} />} onClick={() => addAmount()} 
                />
                <Text>{amount}</Text>
                <IconButton bg='white' size='sm' boxShadow='sm' 
                  _hover={{backgroundColor: 'rgb(250,250,250)'}} borderRadius='lg' aria-label='subtract' 
                  icon={<MinusIcon w={3} h={3} />} onClick={() => subAmount()}
                />
              </Flex>
              <Button onClick={()=>setAmount(maxAmount)}>Max</Button>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Total</Heading>
              <Text>{costFish * amount} $FISH</Text>
            </Flex>
            <Divider />
          </Stack>
          {approvedFish < 10**23 ?
            
            <Button onClick={approveFish} disabled={!connected} mt='2rem'>
              Approve $FISH
            </Button>

            : 

            <Button onClick={() => mintFish(amount)} disabled={!connected || (costFish * amount) > (balance / (10 ** 18))} mt='2rem'>
              Mint
            </Button>
          
          }
          
          {!connected ?
            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Connect Your Wallet to Mint
            </Text>

            :

            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Mint {amount} Bears at {costFish * amount} AVAX
            </Text>
          }
        </Stack>
        <Stack>
          <Image w='300px' h='300px' bg='white' borderRadius='lg' src={minterImg} alt='gif' /> 
          <Text align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
            Mint and Stake your Bear on the river to earn the tasty reward of FISH 
          </Text>
        </Stack>
      </Stack>
      */}
    </Stack>
  )
}
