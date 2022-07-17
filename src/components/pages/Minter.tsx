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

import minterGif from '../assets/images/Minter.gif';
import { useAppSelector } from '../store/hooks';

export default function Minter() {

  const balance = useAppSelector((state) => state.balance);
  const avax = useAppSelector((state) => state.avax);
  const supply = useAppSelector((state) => state.nftSupply);
  const connected = useAppSelector((state) => state.connected);
  const claimable = useAppSelector((state) => state.claimable);

  const costAvax = 2;
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

  return (
    <Stack justify='center' align='center' p={4} minH='calc(100vh - 90px)'>
      <Stack justify='center' align={'center'} spacing={0}>
        <Heading>Pre-Sale</Heading>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          First 2000 Bears minted with Avax before the experiment begins
        </Text>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          2 AVAX per Lazy Bear
        </Text>
      </Stack>
      <Stack p={4} direction={{xsm: 'column-reverse', sm: 'column-reverse',md: 'row'}} justify='space-around' gap='2rem'>
        <Stack minW='260px' p={4} border='solid 1px rgb(240,240,240)' borderRadius='lg' bg='white'>
          <Stack mb='2rem' gap='0.5rem'>
            <Stack justify='start' align='center' spacing={0}>
              <Heading size='md' color='rgb(50,50,50)' >Mint NFT</Heading>
              <Skeleton h='20px' w='100%' fadeDuration={1} isLoaded={connected}>
                <Text size='sm' color='gray.200' align='center'>{supply} / 15000</Text>
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
          <Button disabled={!connected} mt='2rem'>
            Mint
          </Button>
          {!connected &&
            <Text  align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
              Connect Your Wallet to Mint
            </Text>
          }
        </Stack>
        <Stack>
          <Image w='300px' h='300px' bg='white' borderRadius='lg' src={minterGif} alt='gif' /> 
          <Text align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
            Mint and Stake your Bear on the river to earn the tasty reward of FISH 
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
