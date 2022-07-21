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
import { useAppSelector } from '../store/hooks';

export default function Minter() {

  const toast = useToast()
  const balance = useAppSelector((state) => state.balance);
  const avax = useAppSelector((state) => state.avax);
  const supply = useAppSelector((state) => state.nftSupply);
  const connected = useAppSelector((state) => state.connected);
  const claimable = useAppSelector((state) => state.claimable);
  
  const costAvax = 0.123;
  const costFish = 100;
  
  const [amount, setAmount] = useState(1);

  const addAmount = () => {
    if (amount < 10) {
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
          
        }) 
    } catch (error) {
      toast({
          title: 'Transaction Failed',
          description: 'TXN Failed. If problem persists please notify.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right'
      })
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
      }) 
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'TXN Failed. If problem persists please notify.',
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
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
        const tx = await stakingContract.approve(nft, 10 ** 27);
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
        }) 
    } catch (error) {
        toast({
            title: 'Transaction Failed',
            description: 'TXN Failed. If problem persists please notify.',
            status: 'error',
            position: 'top-right',
            isClosable: true
        })
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
        <Stack minW='300px' p={4} border='solid 1px rgb(240,240,240)' borderRadius='lg' bg='white'>
          <Stack mb='2rem' gap='0.5rem'>
            <Stack justify='start' align='center' spacing={0}>
              <Heading size='md' color='rgb(50,50,50)' >Mint NFT</Heading>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text size='sm' w='100%' color='gray.300' align='center'>{supply} / 15000</Text>
              </Skeleton>
            </Stack>
            <Flex align='center' justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Balance</Heading>
              <Text>{avax} AVAX</Text>
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
              <Button onClick={()=>setAmount(10)}>Max</Button>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Total</Heading>
              <Text>{costAvax * amount} AVAX</Text>
            </Flex>
            <Divider />
          </Stack>
          <Button onClick={() => mintAvax(amount)} disabled={!connected} mt='2rem'>
            Mint
          </Button>
          {!connected ?
            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Connect Your Wallet to Mint
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
    </Stack>
  )
}
