import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  VStack,
  HStack,
  Heading,
  Checkbox,
  Grid,
  Hide,
  Show,
  Skeleton,
  
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Timer from '../helpers/Timer';
import { stakingABI, nftABI } from '../helpers/abis';
import { getStaked, getNFTData, getTokenInfo } from '../helpers/getValues';
import {staking, nft} from '../helpers/contracts';
import { useAppSelector } from '../store/hooks';
import peacefulIcon from '../assets/images/PeacefulIcon.png';
import hungryIcon from '../assets/images/HungryIcon.png';
import frenzyIcon from '../assets/images/FrenzyIcon.png';
import { useDispatch } from 'react-redux';

export default function Staking() {
  const epoch = useAppSelector((state) => state.epochNum);
  const epochTime = useAppSelector((state) => state.lastEpochTime);
  const address = useAppSelector((state) => state.address)
  const balance = useAppSelector((state) => state.balance)
  const claimable = useAppSelector((state) => state.claimable);
  const riverSupply = useAppSelector((state) => state.river);
  const connected = useAppSelector((state) => state.connected);
  const nfts = useAppSelector((state) => state.nfts);
  const approvedNFT = useAppSelector((state) => state.approvedNFT);
  const peaceful = useAppSelector((state) => state.peacefulStaked);
  const hungry = useAppSelector((state) => state.hungryStaked);
  const frenzy = useAppSelector((state) => state.frenzyStaked);
  const peacefulNum = useAppSelector((state) => state.peacefulNum);
  const hungryNum = useAppSelector((state) => state.hungryNum);
  const frenzyNum = useAppSelector((state) => state.frenzyNum);

  const toast = useToast();
  const dispatch = useDispatch();

  const [nftBool, setNftBool] = useState<boolean[]>([]);
  const [peacefulBool, setPeacefulBool] = useState<boolean[]>([]);
  const [hungryBool, setHungryBool] = useState<boolean[]>([]);
  const [frenzyBool, setFrenzyBool] = useState<boolean[]>([]);


  useEffect(() => {
    const nftBoolArray = new Array(nfts.length).fill(false);
    const peacefulBoolArray = new Array(peaceful.length).fill(false);
    const hungryBoolArray = new Array(hungry.length).fill(false);
    const frenzyBoolArray = new Array(frenzy.length).fill(false);
    setNftBool(nftBoolArray);
    setPeacefulBool(peacefulBoolArray);
    setHungryBool(hungryBoolArray);
    setFrenzyBool(frenzyBoolArray);
  }, [peaceful, hungry, frenzy, nfts])
  
  const clickNftUnstaked = (_index: number) => {
    let oldNft = [...nftBool];
    oldNft[_index] = !oldNft[_index];
    setNftBool(oldNft);
  }
  const clickNftPeaceful = (_index: number) => {
    let oldNft = [...peacefulBool];
    oldNft[_index] = !oldNft[_index];
    setPeacefulBool(oldNft);
  }
  const clickNftHungry = (_index: number) => {
    let oldNft = [...hungryBool];
    oldNft[_index] = !oldNft[_index];
    setHungryBool(oldNft);
  }
  const clickNftFrenzy = (_index: number) => {
    let oldNft = [...frenzyBool];
    oldNft[_index] = !oldNft[_index];
    setFrenzyBool(oldNft);
  }

  const selectAllUnstaked = (check: boolean) => {
    const filledBool = new Array(nfts.length).fill(check);
    setNftBool(filledBool);
  }
  const selectAllPeaceful = (check: boolean) => {
    const filledBool = new Array(peaceful.length).fill(check);
    setPeacefulBool(filledBool);
  }
  const selectAllHungry = (check: boolean) => {
    const filledBool = new Array(hungry.length).fill(check);
    setHungryBool(filledBool);
  }
  const selectAllFrenzy = (check: boolean) => {
    const filledBool = new Array(frenzy.length).fill(check);
    setFrenzyBool(filledBool);
  }

  const stakeSelected = (pool: number) => {
    const newArray: number[] = [];
    for (let i = 0; i < nfts.length; i++) {
      if (nftBool[i]) {
        newArray.push(nfts[i])
      }
    }
    if (newArray.length === 0) {
      toast({
        title: 'No Bears Selected',
        description: 'Please Select NFTs To Stake',
        status: 'warning',
        position: 'top-right',
        isClosable: true
      })
    } else {
      stake(newArray, pool)
    }
  }
  const changePoolSelected = (from: number, to: number) => {
    const newArray: number[] = [];
    if (from === 0) {
      for (let i = 0; i < peaceful.length; i++) {
        if (peacefulBool[i]) {
          newArray.push(peaceful[i])
        }
      }
    } else if (from === 1) {
      for (let i = 0; i < hungry.length; i++) {
        if (hungryBool[i]) {
          newArray.push(hungry[i])
        }
      }
    } else {
      for (let i = 0; i < frenzy.length; i++) {
        if (frenzyBool[i]) {
          newArray.push(frenzy[i])
        }
      }
    }
    
    if (newArray.length === 0) {
      toast({
        title: 'No Bears Selected',
        description: 'Please Select NFTs To Stake',
        status: 'warning',
        position: 'top-right',
        isClosable: true
      })
    } else {
      changeStakePool(newArray, to)
    }
  }

  const stake = async(nfts: number[], poolNum: number) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
        const tx = await stakingContract.stakeLoop(nfts, poolNum);
        toast({
          title: 'Transaction Sent',
          description: 'Changing staking pools.',
          status: 'info',
          position: 'top-right',
          isClosable: true
        })
        await tx.wait()
        toast({
          title: 'Transaction Success',
          description: 'Staking pools updated.',
          status: 'success',
          position: 'top-right',
          isClosable: true
        });
        console.log('Updating State')
        setTimeout(async () => {
          const [ nftList, supply, approved, paused ] = await getNFTData(address);
          dispatch({type: 'UPDATE_NFTS_UNSTAKED', payload: nftList});
          dispatch({type: 'UPDATE_NFTS_SUPPLY', payload: supply});
          const [ peaceful, hungry, frenzy, pNum, hNum, fNum ] = await getStaked(address);
          dispatch({type: 'UPDATE_NFTS_PEACEFUL', payload: peaceful});
          dispatch({type: 'UPDATE_NFTS_HUNGRY', payload: hungry});
          dispatch({type: 'UPDATE_NFTS_FRENZY', payload: frenzy});
          dispatch({type: 'UPDATE_PEACEFUL_NUM', payload: pNum});
          dispatch({type: 'UPDATE_HUNGRY_NUM', payload: hNum});
          dispatch({type: 'UPDATE_FRENZY_NUM', payload: fNum});
        },1000)
        

    } catch (error:any) {
      if (error.code != 4001)
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

  const approveNFT = async() => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nft, nftABI, signer)
    // Staked Bears
    try {
        const tx = await nftContract.setApprovalForAll(staking, true);
        toast({
            title: 'Transaction Sent',
            description: 'Setting Approval For Staking Contract.',
            status: 'info',
            position: 'top-right',
            isClosable: true
        })
        await tx.wait()
        toast({
            title: 'Transaction Success',
            description: 'Approved.',
            status: 'success',
            position: 'top-right',
            isClosable: true
        }) 
        dispatch({type:'UPDATE_APPROVAL_NFTS', payload: true})
    } catch (error:any) {
      if (error.code != 4001)
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

  const changeStakePool = async(nfts: number[], poolNum: number) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
        const tx = await stakingContract.changePoolLoop(nfts, poolNum);
        toast({
            title: 'Transaction Sent',
            description: 'Changing staking pools.',
            status: 'info',
            position: 'top-right',
            isClosable: true
        })
        await tx.wait()
        toast({
            title: 'Transaction Success',
            description: 'Staking pools updated.',
            status: 'success',
            position: 'top-right',
            isClosable: true
        });
        setTimeout(async () => {
          const [ peaceful, hungry, frenzy, pNum, hNum, fNum ] = await getStaked(address);
          dispatch({type: 'UPDATE_NFTS_PEACEFUL', payload: peaceful});
          dispatch({type: 'UPDATE_NFTS_HUNGRY', payload: hungry});
          dispatch({type: 'UPDATE_NFTS_FRENZY', payload: frenzy});
          dispatch({type: 'UPDATE_PEACEFUL_NUM', payload: pNum});
          dispatch({type: 'UPDATE_HUNGRY_NUM', payload: hNum});
          dispatch({type: 'UPDATE_FRENZY_NUM', payload: fNum});
        }, 1000)
        
    } catch (error:any) {
      if (error.code != 4001)
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
  const claimRewards = async() => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
      const tx = await stakingContract.claimRewards();
      toast({
        title: 'Transaction Sent',
        description: 'Collecting Rewards.',
        status: 'info',
        position: 'top-right',
        isClosable: true
      })
      await tx.wait()
      toast({
        title: 'Transaction Success',
        description: 'Rewards Claimed.',
        status: 'success',
        position: 'top-right',
        isClosable: true
      });
      setTimeout(async () => {
        const [ balance, rewards, allowance, paused ] = await getTokenInfo(address);
        dispatch({type: 'UPDATE_BALANCE', payload: balance});
        dispatch({type: 'UPDATE_CLAIMABLE', payload: rewards});
      },1000)
      
    } catch (error:any) {
      if (error.code != 4001)
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
    <Stack
      overflowY='hidden'
      align='center'
      justify='center'
      p={4}
      gap='1rem'
      bg='white'
      minH={{md: '620px'}}
      m='auto'
      direction='column'
      >
      <Grid
        w='calc(100vw - 40px)'
        maxW='1200px'
        templateColumns={{sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr', lg:'1fr 1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr'}}
        gap='1rem'
        overflow='hidden'
        pb='10px'
        >
        <VStack
          align='center'
          justify='space-around'
          w='100%'
          boxShadow={'md'}
          borderRadius='lg'
          spacing={0}
          p='0.5rem'
          bg='rgb(240,240,240)'
          >
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Current Epoch
          </Heading>
          <Skeleton h='20px' w='90%' fadeDuration={1} isLoaded={connected}> 
            <Text
              fontSize='lg'
              fontWeight='medium'
              color='rgb(160,160,160)'
              align='center'>
              {epoch}
            </Text>
          </Skeleton>
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Next Epoch
          </Heading>
          <Skeleton h='30px' w='90%' fadeDuration={1} isLoaded={connected}>
              <Timer time={epochTime} />
          </Skeleton>
        </VStack>
        <Stack 
          align='center'
          justify='space-around'
          w='100%'
          boxShadow={'md'}
          borderRadius='lg'
          spacing={0}
          p='0.5rem'
          bg='rgb(240,240,240)'
          
          >
          <Heading
            as='h3'
            size='lg'
            color='rgb(60,60,60)'>
            Balance
          </Heading>
          <Skeleton h='20px' w='90%' fadeDuration={1} isLoaded={connected}>
            <Text
              fontSize='lg'
              fontWeight='medium'
              color='rgb(160,160,160)'
              align='center'>
              {(balance / (10 ** 18)).toFixed(2)} $FISH
            </Text>
          </Skeleton>
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Claim Rewards
          </Heading>
          <HStack align='center' justify='space-between'>
            <Skeleton h='24px' w='100%' fadeDuration={1} isLoaded={connected}>
              <Text 
                fontSize='lg'
                fontWeight='medium'
                color='rgb(160,160,160)'
                align='center'
                >
                {claimable} $FISH
              </Text >
            </Skeleton>
            <Button 
              h='30px'
              variant={'outline'}
              bg='white'
              boxShadow={'md'}
              _hover={{backgroundColor: 'rgb(245,245,245)'}}
              disabled={!connected || claimable <= 0}
              onClick={() => claimRewards()}>
              Claim
            </Button>
          </HStack>
        </Stack>
        <VStack
          align='center'
          justify='space-around'
          w='100%'
          minH='150px'
          boxShadow={'md'}
          borderRadius='lg'
          spacing={0}
          p='0.5rem'
          bg='rgb(240,240,240)'
          >
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            River Supply
          </Heading>
          <Box
            w='95%'
            h='25px'
            borderRadius='7px'
            border='solid 1px rgb(60,60,60)'
            bg={'white'}
            boxShadow='md'>
            <Stack  
              w={String(riverSupply / 271828 * 100) + '%'}
              h='100%'
              borderLeftRadius='7px'
              bg={riverSupply / 271828 * 100 > 80 ? 'green.200' : riverSupply / 271828 * 100 > 45 ? 'yellow.200' : 'red.200'}
              justify='center'
              align='center'>
              <Text
                fontSize='lg'
                fontWeight='600'
                color='rgb(60,60,60)'
                as='i'
                >
                {riverSupply}
              </Text>
            </Stack>
          </Box>
          <Text align='center' color='gray.700' fontSize='sm'>
            The river supply increases by 2x every epoch. Carrying Capacity is 271828 Fish.
          </Text>
        </VStack>
        
        <Stack 
          align='center'
          justify='space-around'
          w='100%'
          boxShadow='md'
          borderRadius='lg'
          spacing={0}
          p='0.5rem'
          bg='rgb(240,240,240)'
          >
          <Heading
            as='h3'
            size='lg'
            color='rgb(60,60,60)'>
            Bears Staked
          </Heading>
          <Flex
            justify='space-around'
            align='center'
            w='100%'
            >
            <Image src={peacefulIcon} alt='p-pic' />
            <VStack w='70px' align='start'>
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Peaceful
              </Text>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text align='center'
                  fontWeight='medium'>
                  {peacefulNum}
                </Text>
              </Skeleton>
            </VStack>
          </Flex>
          <Flex
            justify='space-around'
            align='center'
            w='100%'
            >
            <Image src={hungryIcon} alt='p-pic' />
            <VStack w='70px' align='start'>
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Hungry
              </Text>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text align='center'
                  fontWeight='medium'>
                  {hungryNum}
                </Text>
              </Skeleton>
            </VStack>
          </Flex>
          <Flex
            justify='space-around'
            align='center'
            w='100%'
            >
            <Image src={frenzyIcon} alt='p-pic' />
            <VStack w='70px' align='start'>
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Frenzy
              </Text>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text align='center'
                  fontWeight='medium'>
                  {frenzyNum}
                </Text>
              </Skeleton>
            </VStack>
          </Flex>
        </Stack>
      </Grid>
      <Box
        w='calc(100vw - 40px)'
        maxW='1200px' 
        minH='690px'
        h={{xsm: '1007px', sm: 'calc(100vh - 150px)'}}
        maxH={{sm: '730px'}}
        borderRadius='lg'
        p='0.5rem 1rem'
        bg='rgb(240,240,240)'
        boxShadow={'md'}
        >
        <VStack 
          align='center'
          minH='600px'
          h='100%'
          maxH='700px'
          spacing='1rem'
          >
          <Flex 
            justify='space-between'  
            w='100%' 
            color='rgb(60,60,60)' 
            align='center'>
            <Flex gap='5px' align='center'>
              <Heading as='h5'>
                Bears Unstaked
              </Heading>
              <Hide below='sm'> 
                <Checkbox onChange={(e) => selectAllUnstaked(e.target.checked)} iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </Hide>
            </Flex>
            <Hide above='sm'>
              <Checkbox onChange={(e) => selectAllUnstaked(e.target.checked)} iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
            </Hide>
            <Flex gap='5px' align='center'>
              <Hide below='sm'>
                <VStack>          
                  <Text fontWeight='400'>
                    Stake:
                  </Text>
                </VStack>
              </Hide>
             
              {approvedNFT ? 
                <Grid templateColumns={{xsm: '1fr' ,sm: '1fr 1fr ', md: '1fr 1fr 1fr'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    onClick={() => stakeSelected(0)}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Peaceful
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    onClick={() => stakeSelected(1)}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Hungry
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    onClick={() => stakeSelected(2)}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Frenzy
                  </Button>
                </Grid>

                :

                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  disabled={!connected}
                  onClick={() => approveNFT()}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}
                  >
                  Approve Staking
                </Button>
              }
            </Flex>
          </Flex>
          <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='140px' overflowX='auto' overflowY='hidden'>
            {/* Map through the list of unstaked NFTs */}
            {nftBool.map((bool:boolean, index:number) => 
              <Stack key={index} onClick={() => clickNftUnstaked(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                     bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${nfts[index]}.png`} alt='id-pic' loading='lazy' />
                <Text fontWeight={'bold'} >#{nfts[index]}</Text>
              </Stack>
            )}
          </HStack>
          <Hide below='sm'>
            <HStack w='100%' justify='space-between' h={{sm: 'calc(100% - 250px)', md: 'calc(100% - 220px)'}}>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Peaceful</Heading>
                  <Checkbox onChange={(e) => selectAllPeaceful(e.target.checked)}
                             iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    All
                  </Checkbox>
                </HStack>
                <HStack justify='space-between' w='100%'>
                  <Text>Switch:</Text>
                  <Stack direction={{xsm: 'column', lg: 'row'}}>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(0, 1)}>
                      Hungry
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(0, 2)}>
                      Frenzy
                    </Button>
                  </Stack>
                </HStack>
                <Grid justifyItems='center' templateColumns={{ lg: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {peacefulBool.map((bool:boolean, index:number) => 
                    <Stack key={index + 15000} onClick={() => clickNftPeaceful(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                            bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                      <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${peaceful[index]}.png`} alt='id-pic' loading='lazy' />
                      <Text fontWeight={'bold'} >#{peaceful[index]}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Hungry</Heading>
                  <Checkbox onChange={(e) => selectAllHungry(e.target.checked)}
                          iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    All
                  </Checkbox>
                  
                </HStack>
                <HStack justify='space-between' w='100%'>
                  <Text>Switch:</Text>
                  <Stack direction={{xsm: 'column', lg: 'row'}}>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(1, 0)}>
                      Peaceful
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(1, 2)}>
                      Frenzy
                    </Button>
                  </Stack>
                </HStack>
                <Grid justifyItems='center' templateColumns={{lg: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {hungryBool.map((bool:boolean, index:number) => 
                    <Stack key={index + 30000} onClick={() => clickNftHungry(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                          bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                      <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${hungry[index]}.png`} alt='id-pic' loading='lazy' />
                      <Text fontWeight={'bold'} >#{hungry[index]}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Frenzy</Heading>
                  <Checkbox onChange={(e) => selectAllFrenzy(e.target.checked)}
                           iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    All
                  </Checkbox>
                </HStack>
                <HStack justify='space-between' w='100%'>
                  <Text>Switch:</Text>
                  <Stack direction={{xsm: 'column', lg: 'row'}}>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(2,0)}>
                      Peaceful
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}
                      onClick={() => changePoolSelected(2, 1)}>
                      Hungry
                    </Button>
                  </Stack>
                </HStack>
                <Grid justifyItems='center' templateColumns={{ lg: '1fr 1fr'}}  p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {frenzyBool.map((bool:boolean, index:number) => 
                    <Stack key={index + 45000} onClick={() => clickNftFrenzy(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                          bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                      <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${frenzy[index]}.png`} alt='id-pic' loading='lazy' />
                      <Text fontWeight={'bold'} >#{frenzy[index]}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
            </HStack>
          </Hide>
          <Show below='sm'>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Peaceful</Heading>
              <Checkbox onChange={(e) => selectAllPeaceful(e.target.checked)}
                       iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(0, 1)}>
                    Hungry
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(0, 2)}>
                    Frenzy
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='140px' overflowX='auto' overflowY='hidden'>
              {peacefulBool.map((bool:boolean, index:number) => 
                <Stack key={index + 15000} onClick={() => clickNftPeaceful(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                        bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                  <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${peaceful[index]}.png`} alt='id-pic' loading='lazy' />
                  <Text fontWeight={'bold'} >#{peaceful[index]}</Text>
                </Stack>
              )}
            </HStack>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Hungry</Heading>
              <Checkbox onChange={(e) => selectAllHungry(e.target.checked)}
                       iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(1, 0)}>
                    Peaceful
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(1, 2)}>
                    Frenzy
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='140px' overflowX='auto' overflowY='hidden'>
              {hungryBool.map((bool:boolean, index:number) => 
                <Stack key={index + 30000} onClick={() => clickNftHungry(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                        bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                  <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${hungry[index]}.png`} alt='id-pic' loading='lazy' />
                  <Text fontWeight={'bold'} >#{hungry[index]}</Text>
                </Stack>
              )}
            </HStack>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Frenzy</Heading>
              <Checkbox onChange={(e) => selectAllFrenzy(e.target.checked)}
                        iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(2, 0)}>
                    Peaceful
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}
                    onClick={() => changePoolSelected(2, 1)}>
                    Hungry
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='140px' overflowX='auto' overflowY='hidden'>
              {frenzyBool.map((bool:boolean, index:number) => 
                <Stack key={index + 45000} onClick={() => clickNftFrenzy(index)} cursor='pointer' w='100px' minW='100px' border='solid 1px rgb(240,240,240)' 
                        bg={bool ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                  <Image borderRadius='7px' w='80px' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${frenzy[index]}.png`} alt='id-pic' loading='lazy' />
                  <Text fontWeight={'bold'} >#{frenzy[index]}</Text>
                </Stack>
              )}
            </HStack>
          </Show>
        </VStack>  
      </Box>     
    </Stack>
  )
}
