import React, { ReactNode, useState } from 'react';
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
  VStack,
  HStack,
  ModalHeader,
  Heading,
  Checkbox,
  SimpleGrid,
  Grid,
  Hide,
  Show,
  Divider,
  
} from '@chakra-ui/react';
import {
  MinusIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/images/DiscordIcon.png';

export default function Minter() {
  return (
    <Stack justify='center' align='center' p={4} minH='calc(100vh - 90px)'>
      <Stack justify='center' align={'center'} spacing={0}>
        <Heading>Pre-Sale</Heading>
        <Text fontSize='14px' align='center' color='rgb(160,160,160)'>
          First 2000 Bears minted with Avax before the experiment begins
        </Text>
      </Stack>
      <Stack p={4} direction={{xsm: 'column-reverse', sm: 'column-reverse',md: 'row'}} justify='space-around' gap='2rem'>
        <Stack minW='260px' p={4} border='solid 1px rgb(240,240,240)' borderRadius='lg' bg='white'>
          <Stack mb='2rem' gap='0.5rem'>
            <Stack justify='start' align='center' spacing={0}>
              <Heading size='md' color='rgb(50,50,50)' >Mint NFT</Heading>
              <Text size='sm' color='gray.200' align='center'>2000 / 15000</Text>
            </Stack>
            <Flex align='center' justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Balance</Heading>
              <Text>1000 FISH</Text>
            </Flex>
            <Divider />
            <Flex align='center' justify='space-between' gap='0.5rem'>
              <Heading color='rgb(50,50,50)' size='sm'>Amount</Heading>
              <Flex align='center' justify='space-between'>
                <IconButton bg='white' size='sm' boxShadow='sm' 
                  _hover={{backgroundColor: 'rgb(250,250,250)'}} borderRadius='lg' aria-label='add' 
                  icon={<AddIcon w={3} h={3} />} 
                />
                <Text>2</Text>
                <IconButton bg='white' size='sm' boxShadow='sm' 
                  _hover={{backgroundColor: 'rgb(250,250,250)'}} borderRadius='lg' aria-label='subtract' 
                  icon={<MinusIcon w={3} h={3} />} 
                />
              </Flex>
              <Button>Max</Button>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
              <Heading color='rgb(50,50,50)' size='sm'>Total</Heading>
              <Text>100 FISH</Text>
            </Flex>
            <Divider />
          </Stack>
          <Button mt='2rem'>
            Mint
          </Button>
        </Stack>
        <Stack>
          <Image w='300px' h='300px' bg='white' borderRadius='lg' src={logo} alt='gif' /> 
          <Text align='center' w='280px' color='rgb(160,160,160)' fontSize='12px' pl='1rem' lineHeight='16px'>
            Mint and Stake your Bear on the river to earn the tasty reward of FISH 
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
