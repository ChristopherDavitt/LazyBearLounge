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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../assets/images/DiscordIcon.png'

export default function Home() {
  return (
   
    <Stack
      overflowY='auto'
      align='center'
      justify='center'
      p={4}
      gap='2rem'
      bg='white'
      minH={{md: '620px'}}
      h={{md: 'calc(100vh - 90px)'}}
      m='auto'
      direction={{xsm:'column', md:'row'}}
      >
      <Stack
        minW={{md: '220px', xsm: 'calc(100vw - 60px)'}}
        w={{md: '22vw', xsm: 'calc(100vw - 60px)'}}
        maxW={{md: '280px', xsm: 'calc(100vw - 60px)'}}
        pb='10px'
        align='start'
        gap='1rem'
        minH={{md: '600px'}}
        h={{md: 'calc(100vh - 150px)'}}
        maxH={{md: '700px'}}
        >
        <Stack w='100%' gap='1rem' justify='space-between' align='start' direction={{xsm: 'column', sm: 'row', md: 'column', lg: 'column', xl: 'column' }}>
        <VStack
          align='center'
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
          <Text
            fontSize='lg'
            fontWeight='light'
            color='rgb(90,90,90)'>
            2
          </Text>
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Next Epoch
          </Heading>
          <Text
            fontSize='lg'
            fontWeight='light'
            color='rgb(90,90,90)'
            >
            1:00:00
          </Text>
        </VStack>
        <VStack
          align='center'
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
              w='40%'
              h='100%'
              borderLeftRadius='7px'
              bg={'red.200'}
              justify='center'
              align='center'>
              <Text
                fontSize='lg'
                fontWeight='400'
                color='rgb(90,90,90)'
                as='i'
                >
                50000
              </Text>
            </Stack>
          </Box>
          
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Resupply
          </Heading>
          <Text
            fontSize='lg'
            fontWeight='light'
            color='rgb(90,90,90)'
            >
            5:00:00
          </Text>
        </VStack>
        </Stack>
        <Stack w='100%' justify='space-between' gap='1rem' direction={{xsm: 'column', sm: 'row', md: 'column', lg: 'column', xl: 'column' }}>
        <Stack 
          align='center'
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
          <Text
            fontSize='lg'
            fontWeight='light'
            color='rgb(90,90,90)'>
            271,820
          </Text>
          <Heading 
            as='h3'
            size='lg'
            color='rgb(60,60,60)'
            >
            Claim Rewards
          </Heading>
          <HStack align='center' justify='space-between'>
            <Text 
              fontSize='md'
              color='rgb(60,60,60)'>
              1312 mFISH
            </Text >
            <Button 
              h='30px'
              variant={'outline'}
              bg='white'
              boxShadow={'md'}
              _hover={{backgroundColor: 'rgb(245,245,245)'}}>
              Claim
            </Button>
          </HStack>
        </Stack>
        <Stack 
          align='center'
          w='100%'
          boxShadow='md'
          mb='1rem' 
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
            justify='space-between'
            align='center'
            w='100%'
            >
            <Flex
              gap='2rem'>
              <Image src={'#'} alt='p-pic' />
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Peaceful
              </Text>
            </Flex>
            <Text
              fontWeight='medium'>
              1213
            </Text>
          </Flex>
          <Flex
            justify='space-between'
            align='center'
            w='100%'
            >
            <Flex
              gap='2rem'>
              <Image src={'#'} alt='h-pic' />
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Hungry
              </Text>
            </Flex>
            <Text
              fontWeight='medium'>
              1213
            </Text>
          </Flex>
          <Flex
            justify='space-between'
            align='center'
            w='100%'
            >
            <Flex
              gap='2rem'>
              <Image src={'#'} alt='f-pic' />
              <Text
                fontSize='md'
                color='rgb(60,60,60)'>
                Frenzy
              </Text>
            </Flex>
            <Text
              fontWeight='medium'>
              1213
            </Text>
          </Flex>
        </Stack>
        </Stack>
      </Stack>
      <Box
        w={{md: 'calc(100vw - 300px)', xsm: 'calc(100vw - 60px)'}}
        maxW='1200px' 
        minH='600px'
        h='calc(100vh - 150px)'
        maxH='700px'
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
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                Select All
              </Checkbox>
            </Flex>
            <Flex gap='5px' align='center'>
              <Text fontWeight='400'>
                Stake:
              </Text>
              <Stack direction={{xsm: 'column', lg: 'row'}}>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Peaceful
                </Button>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Hungry
                </Button>
                <Button 
                  h='30px'
                  variant={'outline'}
                  bg='white'
                  boxShadow={'md'}
                  _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                  Frenzy
                </Button>
              </Stack>
            </Flex>
          </Flex>
          <HStack p={2} spacing='10px' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='130px'>
            {/* Map through the list of unstaked NFTs */}
            <Stack p='0.5rem 0.7rem' bg='rgb(180,180,180)' borderRadius='7px' justify='start' align='center' spacing='5px'>
              <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
              <Text># 1235</Text>
            </Stack>
            <Stack justify='start' align='center' spacing='5px'>
              <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
              <Text># 1235</Text>
            </Stack>
          </HStack>
          <HStack w='100%' position='relative' top='-30px' justify='space-around' h='calc(100% - 160px)'>
            <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
              <HStack align='baseline'>
                <Image src={logo} w='60px' position='relative' top='30px' />
                <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </HStack>
              <SimpleGrid templateColumns={{ xl: '1fr 1fr'}} spacing='0px' p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                <Stack justify='start' align='center' spacing='1px'>
                  <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                  <Text># 1235</Text>
                </Stack>
                <Stack justify='start' align='center' spacing='5px'>
                  <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                  <Text># 1235</Text>
                </Stack>
              </SimpleGrid>
            </VStack>
            <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
              <HStack align='baseline'>
                <Image src={logo} w='60px' position='relative' top='30px'/>
                <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </HStack>
              <SimpleGrid templateColumns={{ xl: '1fr 1fr'}} spacing='0px' p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                <Stack justify='start' align='center' spacing='5px'>
                  <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                  <Text># 1235</Text>
                </Stack>
              </SimpleGrid>
            </VStack>
            <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
              <HStack align='baseline'>
                <Image src={logo} w='60px' position='relative' top='30px' />
                <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </HStack>
              <SimpleGrid templateColumns={{ xl: '1fr 1fr'}} spacing='0px'  p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                <Stack justify='start' align='center' spacing='5px'>
                  <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix'  />
                  <Text># 1235</Text>
                </Stack>
                {/* Map through Peacefulist */}
              </SimpleGrid>
            </VStack>
          </HStack>
        </VStack>  
      </Box>    
    </Stack>
  )
}
