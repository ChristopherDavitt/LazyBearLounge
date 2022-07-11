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
  
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../assets/images/DiscordIcon.png'

export default function Staking() {
  return (
    <Stack
      overflowY='hidden'
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
      <Grid
        minW={{md: '220px', xsm: 'calc(100vw - 40px)'}}
        w={{md: '22vw', xsm: 'calc(100vw - 60px)'}}
        maxW={{md: '280px', xsm: 'calc(100vw - 60px)'}}
        templateColumns={{sm: '1fr 1fr', md: '1fr', lg:'1fr', xl: '1fr'}}
        minH={{md: '600px'}}
        gap='1rem'
        h={{md: 'calc(100vh - 150px)'}}
        maxH={{md: '700px'}}
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
              w='40%'
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
      </Grid>
      <Box
        w={{md: 'calc(100vw - 300px)', xsm: 'calc(100vw - 40px)'}}
        maxW='1200px' 
        minH={{sm: '600px'}}
        h={{xsm: '920px',sm: 'calc(100vh - 150px)'}}
        maxH={{sm: '700px'}}
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
              <Hide below='sm'> 
                <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                  Select All
                </Checkbox>
              </Hide>
             
            </Flex>
            <Flex gap='5px' align='center'>
              <VStack>
                <Hide above='sm'>
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    All
                  </Checkbox>
                </Hide>
                
                <Text fontWeight='400'>
                  Stake:
                </Text>
              </VStack>
              
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
          <Hide below='sm'>
            <HStack w='100%' position='relative' top='-30px' justify='space-between' h='calc(100% - 160px)'>
              <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
                <HStack align='baseline'>
                  <Image src={logo} w='60px' position='relative' top='30px' />
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    Select All
                  </Checkbox>
                </HStack>
                <Grid templateColumns={{ xl: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  <Stack justify='start' align='center' spacing='1px'>
                    <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                    <Text># 1235</Text>
                  </Stack>
                  <Stack justify='start' align='center' spacing='5px'>
                    <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                    <Text># 1235</Text>
                  </Stack>
                </Grid>
              </VStack>
              <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
                <HStack align='baseline'>
                  <Image src={logo} w='60px' position='relative' top='30px'/>
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    Select All
                  </Checkbox>
                </HStack>
                <Grid templateColumns={{ xl: '1fr 1fr'}} p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%' minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  <Stack justify='start' align='center' spacing='5px'>
                    <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix' />
                    <Text># 1235</Text>
                  </Stack>
                </Grid>
              </VStack>
              <VStack w={{lg: '160px', xl: '280px'}} h='100%'>
                <HStack align='baseline'>
                  <Image src={logo} w='60px' position='relative' top='30px' />
                  <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                    Select All
                  </Checkbox>
                </HStack>
                <Grid templateColumns={{ xl: '1fr 1fr'}}  p='1rem 0 0.5rem 0.5rem' bg='white' borderRadius='7px' boxShadow='md' w='100%'  minH='135px' h='calc(100% - 40px)' overflowY='auto'>
                  <Stack justify='start' align='center' spacing='5px'>
                    <Image bg='rgb(200,200,200)' borderRadius='7px' w='80px' src={logo} alt='pix'  />
                    <Text># 1235</Text>
                  </Stack>
                  {/* Map through Peacefulist */}
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
              <VStack>
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
              </VStack>
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
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Peaceful</Heading>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <VStack>
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
              </VStack>
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
            <Flex w='100%' align='center' justify='space-between'>
              <Heading as='h2'>Peaceful</Heading>
              <Checkbox iconColor='white' colorScheme={'blue'} iconSize='2rem'>
                All
              </Checkbox>
              <VStack>
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
              </VStack>
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
          </Show>
        </VStack>  
      </Box>    
    </Stack>
  )
}
