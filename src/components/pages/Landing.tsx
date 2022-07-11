import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Stack, Image, Icon, 
    Box, Grid, Text, Heading, VStack, 
    HStack, Button, Divider, Flex, 
    IconButton, useDisclosure,  } from '@chakra-ui/react';
import logo from '../assets/images/DiscordIcon.png';

export default function Landing() {

    const { 
        isOpen: isOpenBackground, 
        onOpen: onBackgroundOpen, 
        onClose: onBackgroundClose 
    } = useDisclosure();

  return (
    <Box p={4}>
        <Stack m='2rem 0' gap='1rem' minH='400px' boxShadow={'lg'} bg='rgb(245,245,245)' borderRadius='lg' justify='space-between' direction={{xsm:'column', sm: 'column',md: 'row-reverse', lg:'row-reverse', xl: 'row-reverse'}} p={4}>
            <Image w='40vw' src="#" alt='hero-image'/>
            <VStack gap='1rem' justify='center' align='start'>
                <Heading as='h1' size='3xl' >
                    Lazy Bear Lounge
                </Heading>
                <Text color='rgb(160,160,160)' size='md'>
                    Stake your bear on the river to compete for the tasty reward of FISH. Will you be able to work together
                    to solve the population problem, or face the perils of greed?
                </Text>
                <Flex justify='start' gap='1rem' w='100%'>
                    <Button 
                        h='45px'
                        variant={'outline'}
                        bg='white'
                        boxShadow={'md'}
                        _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                        Mint Your Bear
                    </Button>
                    <Button 
                        h='45px'
                        variant={'outline'}
                        bg='white'
                        boxShadow={'md'}
                        _hover={{backgroundColor: 'rgb(245,245,245)'}}>
                        Staking
                    </Button>
                </Flex>
            </VStack>
        </Stack>
        <Divider />
        <Stack m='2rem 0' p={4} boxShadow={'lg'} bg='rgb(245,245,245)' borderRadius='lg' align='center' justify='center' gap='2rem'>
            <VStack>
                <Heading as='h2' size='xl'>
                    The River
                </Heading>
                <Divider w='300px' />
                <Text align='center' color='rgb(160,160,160)' size='sm'>
                    In a changing ecosystem, how will you play?
                </Text>
            </VStack>
            <Grid m='1rem 0' templateColumns={{xsm:'1fr', sm:'1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap='1rem'>
                <Stack bg='white' borderRadius='lg' p={4} boxShadow='md' align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Collection
                    </Heading>
                    <Image src='#' alt='grid-pic' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Collectible bears from over 130 unique characteristics
                    </Text>
                </Stack>
                <Stack bg='white' borderRadius='lg' p={4} boxShadow='md' align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Staking
                    </Heading>
                    <Image src='#' alt='grid-pic' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Choose your own strategy on your quest for FISH
                    </Text>
                </Stack>
                <Stack bg='white' borderRadius='lg' p={4} boxShadow='md' align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Supply
                    </Heading>
                    <Image src='#' alt='grid-pic' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        River supply that simulates natural population growth
                    </Text>
                </Stack>
                <Stack bg='white' borderRadius='lg' p={4} boxShadow='md' align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Game Theory
                    </Heading>
                    <Image src='#' alt='grid-pic' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Compete or work together to survive on the river
                    </Text>
                </Stack>
            </Grid>
        </Stack>
        <Divider />
        <Stack m='2rem 0' p={4} boxShadow={'lg'} bg='rgb(245,245,245)' borderRadius='lg' align='center' justify='center' >

            <Heading>
                Bears
            </Heading>
            <Divider w='300px' />
            <Stack direction={{xsm: 'column', sm:'column', md:'row', lg: 'row'}} align='start' gap='2rem' w='100%' p={4}>
                <Image w={{md: '50%'}} src={logo} alt='bear-customization' />
                <Grid w='100%' templateColumns='1fr' gap='1rem'>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Background</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >5</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Bear Type</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >6</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Hat</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >14</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Shirt</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >15</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Accessory</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >13</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    <Flex w='100%' h='75px' cursor='pointer' align='center' bg='white' 
                         borderRadius='md' boxShadow='md'  p={4} justify='space-between'
                            onClick={isOpenBackground ? onBackgroundClose : onBackgroundOpen} >
                        <Heading as='h4' size='sm' >Unique</Heading>
                        <Flex align='center' gap='1rem'>
                            <Text color='rgb(160,160,160)' >5</Text>
                            {isOpenBackground ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </Flex>
                    </Flex>
                    
                </Grid>
            </Stack>
        </Stack>
        <Stack m='2rem 0' p={4} boxShadow={'lg'} bg='rgb(245,245,245)' borderRadius='lg' align='center' justify='center'>
            <Heading>
                Whitepaper
            </Heading>
            <Divider w='300px' />
            <VStack w='100%'>
                <HStack gap='1rem'>
                    <Heading>Pre-Sale</Heading>
                    <Text>2000 / 15000 Bears</Text>
                </HStack>
                <Divider />
                <Flex w='100%' justify='space-between' align='center'>
                    <Heading size='xl'>10%</Heading>
                    <Text>100 AVAX Donation to Sierra Club Foundation</Text>
                </Flex>
                <Flex w='100%' justify='space-between' align='center'>
                    <Heading size='xl'>25%</Heading>
                    <Text>One Free Mint For Future Projects</Text>
                </Flex>
                <Flex w='100%' justify='space-between' align='center'>
                    <Heading size='xl'>50%</Heading>
                    <Text>200 AVAX Donation to Sierra Club Foundation</Text>
                </Flex>
                <Flex w='100%' justify='space-between' align='center'>
                    <Heading size='xl'>100%</Heading>
                    <Text>Experiment Begins</Text>
                </Flex>
                <HStack gap='1rem'>
                    <Heading>Game</Heading>
                    <Text>Possible outcomes</Text>
                </HStack>
                <Flex w='100%' justify='space-between' align='center'>
                    <Heading>Survive 52 Epochs</Heading>
                    <Text>Last 52 Epochs without overfishing the river</Text>
                </Flex>
            </VStack>
        </Stack>
    </Box>
  )
}
