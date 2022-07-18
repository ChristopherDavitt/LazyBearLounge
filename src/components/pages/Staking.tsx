import React, { ReactNode, useState, useEffect } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';

import { stakingABI, nftABI } from '../helpers/abis';
import {staking, nft} from '../helpers/contracts';
import { useAppSelector } from '../store/hooks';
import peacefulIcon from '../assets/images/PeacefulIcon.png';
import hungryIcon from '../assets/images/HungryIcon.png';
import frenzyIcon from '../assets/images/FrenzyIcon.png';

export default function Staking() {
  
  const epoch = useAppSelector((state) => state.epochNum);
  const epochTime = useAppSelector((state) => state.lastEpochTime);
  const balance = useAppSelector((state) => state.balance)
  const claimable = useAppSelector((state) => state.claimable);
  const riverSupply = useAppSelector((state) => state.river);
  const connected = useAppSelector((state) => state.connected);
  const nfts = useAppSelector((state) => state.nfts);
  const approvedNFT = useAppSelector((state) => state.approvedNFT);
  const peaceful = useAppSelector((state) => state.peacefulStaked);
  const hungry = useAppSelector((state) => state.hungryStaked);
  const frenzy = useAppSelector((state) => state.frenzyStaked);
  const toast = useToast();
  
  const changeTheEpoch = async() => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
        const tx = await stakingContract.changeEpoch();
        toast({
            title: 'Transaction Sent',
            description: 'Changing Epoch.',
            status: 'info',
            position: 'top-right',
            isClosable: true
        })
        await tx.wait()
        toast({
            title: 'Transaction Success',
            description: 'Thank you for changing the Epoch :)',
            status: 'success',
            position: 'top-right',
            isClosable: true
        }) 
    } catch (error) {
        toast({
            title: 'Transaction Failed',
            description: 'TXN Failed...',
            status: 'error',
            position: 'top-right',
            isClosable: true
        })
        console.log(error)
    }
  }

  const stake = async(nfts: number[], poolNum: number) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(staking, stakingABI, signer)
    // Staked Bears
    try {
        const tx = await stakingContract.changePool(nfts, poolNum);
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
              fontWeight='light'
              color='rgb(90,90,90)'
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
          <Skeleton h='20px' w='90%' fadeDuration={1} isLoaded={connected}>
            <Text
              fontSize='lg'
              fontWeight='light'
              color='rgb(90,90,90)'
              align='center'
              >
              Please Wait...
            </Text>
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
              fontWeight='light'
              color='rgb(90,90,90)'
              align='center'>
              {balance}
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
            <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
              <Text 
                fontSize='md'
                color='rgb(60,60,60)'
                align='center'
                >
                {claimable} mFISH
              </Text >
            </Skeleton>
            <Button 
              h='30px'
              variant={'outline'}
              bg='white'
              boxShadow={'md'}
              _hover={{backgroundColor: 'rgb(245,245,245)'}}
              disabled={!connected}>
              Claim
            </Button>
          </HStack>
        </Stack>
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
              bg={'red.200'}
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
          {approvedNFT &&
            <VStack 
              align='center'
              justify='space-around'
              w='100%'
              boxShadow={'md'}
              borderRadius='lg'
              spacing={0}
              p='0.5rem'>
              <Button 
                h='30px'
                variant={'outline'}
                bg='white'
                boxShadow={'md'}
                disabled={!connected}
                _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                Approve Staking
              </Button>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text
                  fontSize='md'
                  fontWeight='light'
                  color='rgb(200,200,200)'
                  align='center'
                  >
                  Approve staking contract to earn FISH
                </Text>
              </Skeleton>
            </VStack>
          }
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
                  {peaceful}
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
                  {hungry}
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
                  {frenzy}
                </Text>
              </Skeleton>
            </VStack>
          </Flex>
        </Stack>
      </Grid>
      <Box
        w='calc(100vw - 40px)'
        maxW='1200px' 
        minH='640px'
        h={{xsm: '970px', sm: 'calc(100vh - 150px)'}}
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
                <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </Hide>
            </Flex>
            <Hide above='sm'>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
            </Hide>
            <Flex gap='5px' align='center'>
              <VStack>          
                <Text fontWeight='400'>
                  Stake:
                </Text>
              </VStack>
              <Stack direction={{xsm: 'column', md: 'row'}}>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  disabled={!connected}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Peaceful
                </Button>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  disabled={!connected}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Hungry
                </Button>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  disabled={!connected}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Frenzy
                </Button>
              </Stack>
            </Flex>
          </Flex>
          <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='140px' overflowX='auto' overflowY='hidden'>
            {/* Map through the list of unstaked NFTs */}
            {nfts.map((tokenId:number, index:number) => 
              <Stack key={tokenId} minW='100px' border='solid 1px rgb(240,240,240)' bg={connected ? 'rgb(210, 210, 210)' : 'none' } h='115px' p='5px 10px' borderRadius='7px' justify='start' align='left' spacing='5px'>
                <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                <Text fontWeight={'bold'} >#{tokenId}</Text>
              </Stack>
            )}
          </HStack>
          <Hide below='sm'>
            <HStack w='100%' justify='space-between' h='calc(100% - 160px)'>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Peaceful</Heading>
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
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
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Hungry
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Frenzy
                    </Button>
                  </Stack>
                </HStack>
                <Grid templateColumns={{ lg: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {peaceful.map((tokenId:number, index:number) => 
                    <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                      <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                      <Text>#{tokenId}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Hungry</Heading>
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
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
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Peaceful
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Frenzy
                    </Button>
                  </Stack>
                </HStack>
                <Grid templateColumns={{lg: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {hungry.map((tokenId:number, index:number) => 
                    <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                      <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                      <Text>#{tokenId}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
              <VStack w={{md: '160px', lg: '280px'}} h='100%'>
                <HStack w='100%' justify='space-between' align='baseline'>
                  <Heading size='lg'>Frenzy</Heading>
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
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
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Peaceful
                    </Button>
                    <Button 
                      h='30px'
                      variant={'outline'}
                      bg='white'
                      boxShadow={'md'}
                      disabled={!connected}
                      _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                      Hungry
                    </Button>
                  </Stack>
                </HStack>
                <Grid templateColumns={{ lg: '1fr 1fr'}}  p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  {frenzy.map((tokenId:number, index:number) => 
                    <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                      <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                      <Text>#{tokenId}</Text>
                    </Stack>
                  )}
                </Grid>
              </VStack>
            </HStack>
          </Hide>
          <Show below='sm'>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Peaceful</Heading>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <VStack>          
                  <Text fontWeight='400'>
                    Switch:
                  </Text>
                </VStack>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Hungry
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Frenzy
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='130px'>
              {peaceful.map((tokenId:number, index:number) => 
                <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                  <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                  <Text>#{tokenId}</Text>
                </Stack>
              )}
            </HStack>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Hungry</Heading>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <VStack>          
                  <Text fontWeight='400'>
                    Switch:
                  </Text>
                </VStack>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Peaceful
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Frenzy
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='130px'>
              {hungry.map((tokenId:number, index:number) => 
                <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                  <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                  <Text>#{tokenId}</Text>
                </Stack>
              )}
            </HStack>
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Frenzy</Heading>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <Flex gap='5px' align='center'>
                <VStack>          
                  <Text fontWeight='400'>
                    Switch:
                  </Text>
                </VStack>
                <Stack direction={{xsm: 'column', md: 'row'}}>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Peaceful
                  </Button>
                  <Button 
                    h='30px'
                    variant={'outline'}
                    bg='white'
                    boxShadow={'md'}
                    disabled={!connected}
                    _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                    Hungry
                  </Button>
                </Stack>
              </Flex>
            </Flex>
            <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='130px'>
              {frenzy.map((tokenId:number, index:number) => 
                <Stack key={tokenId} minW='100px' h='115px' p='5px 10px' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
                  <Image borderRadius='7px' w='100%' src={`https://joepegs.mypinata.cloud/ipfs/Qmf66mXDewwSKsFuysXUXQsjPzSdpUfcKodWLx9VWrXNV3/${tokenId}.png`} alt='id-pic' loading='lazy' />
                  <Text>#{tokenId}</Text>
                </Stack>
              )}
            </HStack>
          </Show>
        </VStack>  
      </Box>    
    </Stack>
  )
}
