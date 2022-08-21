import React from 'react';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'
import { Stack, Image, Box, Grid,
        Text, Heading, VStack, 
        HStack, Button, Divider, 
        Flex, Icon,
        Accordion, AccordionItem,
        AccordionButton, AccordionPanel,
        AccordionIcon,
        Link,useColorModeValue
        } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import hero from '../assets/images/43.png';
import stakingMethods from '../assets/images/stakingMethods.png';
import exponential from '../assets/images/exponential.png';
import allThree from '../assets/images/allThree.png';
import collect from '../assets/images/40.png';
import selectBear from '../assets/images/selectBear.png';
import win from '../assets/images/Wint.png';
import loss from '../assets/images/Losst.png';

export default function Landing() {

  const backgrounds = ['Blue', 'Purple', 'Red'];
  const backgroundStats = [60, 25, 15];
  const bearType = ['Grizzly', 'Brown', 'Black', 'Polar', 'Sea Bear', 'Zombie'];
  const bearTypeStats = [23, 23, 23, 15, 7.5, 7.5];
  const eye = ['Normal',   'Confused', 'Angry', 'Sleepy','Eyelashes','Glaring', 'Dazed', 'Zoned Out', 'Shades', 'Nerd Glasses',
               'Eye Patch', 'Third  Eye',  'Masquarade', 'VR', 'Lazer Eyes', '3D' ,'Exposed Skull', 'Destroyer' ];
  const eyeStats = [4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 2, 1.5, 1.5, 1, 1, 1, 1, 1];
  const mouth = ['Smile', 'Frown', 'Pursed', 'Whistling', 'Smirk', 'In Awe', 'Open Mouth', 
                'Lips', 'Cig', 'E-Cig', 'Tongue Out', 'Pipe', 'Dead Fish', 'Scary' ];
  const mouthStats = [5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 2, 2, 1];
  const hat = ['None', 'Honey Pot', 'Baseball Cap', 'Apple', 'Red Mohawk', 'Bow', 'Earing', 
                'Circus', 'Top Hat', 'Green Mohawk', 'Fire Fighter', 'Tiara', 'Chick',
                'Crown', 'Smoky Ranger', 'Pirate'];
  const hatStats = [10, 4, 4, 4, 4, 3, 3, 3, 2.5, 2, 2, 2, 1.5, 1.5, 1, 1, 1];
  const shirt = ['None', 'Blue Bandana', 'Red Bandana', 'Pearl Necklace', 'Gold Chain', 
                 'Fire Fighter', 'Fishing Vest', 'Jean Jacket', 'Tuxedo',
                 'Holiday Sweater', 'Jersey', 'Harpoon',];
  const shirtStats = [10, 8, 8, 4, 3.5, 3, 3, 3, 3, 2.5, 2, 1];

  return (
    <Box>
        <Stack m={4} gap='1rem' minH='400px' justify='space-between' direction={{xsm:'column', sm: 'column',md: 'row-reverse', lg:'row-reverse', xl: 'row-reverse'}} p={4}>

            <Image boxSize={{xsm: '80vw', md:'400px', lg:'400px', xl: '500px'}}  src={hero} alt='hero-image'/>
            <VStack gap='1rem' justify='center' align='start'>
                <Heading as='h1' size='3xl' >
                    Lazy Bear River
                </Heading>
                <Text color='rgb(160,160,160)' size='md'>
                    Stake your bear on the river to compete for the tasty reward of FISH. Will you be able to work together
                    to solve the population problem, or face the perils of greed?
                </Text>
                <Flex justify='start' gap='1rem' w='100%'>
                    <RouterLink to='/mint'>
                        <Button 
                            h='45px'
                            variant={'outline'}
                            boxShadow={'md'}>
                            Mint Your Bear
                        </Button>
                    </RouterLink>
                    <RouterLink to='/staking'>
                        <Button 
                            h='45px'
                            variant={'outline'}
                            boxShadow={'md'}>
                            Staking
                        </Button>
                    </RouterLink>
                </Flex>
                <HStack w='100%' justify='left' gap='1rem' >
                    <Link 
                      isExternal={true}
                    href='https://twitter.com/LazyBearRiver'
                    >
                    <Box size={'32px'} as={FaTwitter} />
                    </Link>
                    <Link 
                      isExternal={true}
                    href='#'
                    >
                    <Box size={'32px'} as={FaDiscord} />
                    </Link>
                    <Link 
                      isExternal={true}
                    href='https://lazybearriver.gitbook.io/docs/'
                    >
                    <Box size={'32px'} as={FaGithub} />
                    </Link>
                </HStack>   
            </VStack>
        </Stack>
        <Stack m='2rem 0' p={6} bg={useColorModeValue('rgb(245,245,245)', 'gray.900')}  align='center' justify='center' gap='2rem'>
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
                <Stack p={4}  align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Staking
                    </Heading>
                    <Divider />
                    <Image src={stakingMethods} alt='grid-pic' />
                    <Divider />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Choose your own strategy on your quest for $FISH
                    </Text>
                </Stack>
                <Stack p={4}  align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Collection
                    </Heading>
                    <Divider />
                    <Image borderRadius='7px' src={collect} alt='grid-pic' />
                    <Divider />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Collectible bears with over 69 unique attributes
                    </Text>
                </Stack>
                <Stack p={4}  align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Supply
                    </Heading>
                    <Divider />
                    <Image w='400px' src={exponential} alt='grid-pic' />
                    <Divider />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        $FISH supply that simulates natural population growth.
                    </Text>
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        1 $FISH = 1 $FISH
                    </Text>
                </Stack>
                <Stack p={4}  align='center' justify='start'>
                    {/* <Icon  /> */}
                    <Heading>
                        Game Theory
                    </Heading>
                    <Divider />
                    <Image w='400px' src={allThree} alt='grid-pic' />
                    <Divider />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Compete or work together to survive on The River
                    </Text>
                </Stack>
            </Grid>
        </Stack>
        <Stack m='2rem 0' p={6} w='100%' align='center' justify='center' >
            <Heading>
                Bears
            </Heading>
            <Text color='rgb(200,200,200)'>
                Over 200,000 unique bear options
            </Text>
            <Divider w='300px' />
            <Stack direction={{xsm: 'column', sm:'column', md:'row', lg: 'row'}} align='start' gap='2rem' w='100%' p={4}>
                <Box w='100%'>
                    <Image m='auto' w='100%' maxW='400px' src={selectBear} alt='bear-customization' />
                </Box>
                <Box w='100%'>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Background</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>3</Text>
                                    <AccordionIcon /> 
                                </Flex>
                                
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {backgrounds.map((type:string, index: number) => 
                                    <Flex key={index}  w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{backgroundStats[index].toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Bear</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>6</Text>
                                    <AccordionIcon /> 
                                </Flex>
                                
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {bearType.map((type:string, index: number) => 
                                    <Flex key={index + 7}  w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{bearTypeStats[index].toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Eyes</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>{eye.length}</Text>
                                    <AccordionIcon /> 
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {eye.map((type:string, index: number) => 
                                    <Flex key={index + 100}  w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{(eyeStats[index]* 2).toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Mouth</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>{mouth.length}</Text>
                                    <AccordionIcon /> 
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {mouth.map((type:string, index: number) => 
                                    <Flex key={index + 200}  w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{(mouthStats[index]* 2).toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Hat</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>{hat.length}</Text>
                                    <AccordionIcon /> 
                                </Flex>
                                
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {hat.map((type:string, index: number) => 
                                    <Flex key={index + 300}  w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{(hatStats[index] * 2).toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton h='50px'  >
                                <Box flex='1' textAlign='left'>
                                    <Heading fontWeight='medium' size='md'>Body</Heading>
                                </Box>
                                <Flex gap='0.7rem' align='center'>
                                    <Text>{shirt.length}</Text>
                                    <AccordionIcon /> 
                                </Flex>
                                
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex  w='100%' justify='space-between'>
                                    <Text fontWeight={'medium'}>Attribute</Text> 
                                    <Text fontWeight={'medium'}>Chance (%)</Text>
                                </Flex>
                                <Divider />
                                {shirt.map((type:string, index: number) => 
                                    <Flex  key={index + 400} w='100%' justify='space-between'>
                                        <Text fontWeight={'light'}>{type}</Text> 
                                        <Text fontWeight={'light'}>{(shirtStats[index] * 2).toFixed(1)}%</Text>
                                    </Flex>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Stack>
        </Stack>
        <Stack m='2rem 0' p={6}  bg={useColorModeValue('rgb(245,245,245)', 'gray.900')} align='center' justify='center'>
            {/* <Heading>
                Whitepaper
            </Heading>
            <Divider w='300px' /> */}
            <VStack w='100%'>
                <Text fontWeight='bold' color='rgb(100,100,100)'>
                    Stealth Mint
                </Text>
                <Text fontWeight='bold' color='rgb(100,100,100)'>
                    Bear Cost | 0.123 AVAX
                </Text>
                <HStack gap='1rem'>
                    <Heading>Pre-Sale</Heading>
                    <Text color='rgb(100,100,100)'>4,000 / 20,000 Bears</Text>
                </HStack>
                <Divider w='300px' />
                <Flex w='100%' justify='space-between' gap='1rem' align='center'>
                    <Heading size='xl'>25%</Heading>
                    <Text align='right'>AMA and alpha regarding future projects</Text>
                </Flex>
                <Flex w='100%' justify='space-between' gap='1rem' align='center'>
                    <Heading size='xl'>50%</Heading>
                    <Text align='right'>100 AVAX Donation to Sierra Club Foundation</Text>
                </Flex>
                <Flex w='100%' justify='space-between' gap='1rem' align='center'>
                    <Heading size='xl'>100%</Heading>
                    <Text align='right'>Experiment Begins</Text>
                </Flex>
            </VStack>
        </Stack>
        <Stack m='2rem 0' p={6} align='center' justify='center'>
            <Text fontWeight='bold' color='rgb(100,100,100)'>
                1 $FISH = 1 $FISH
            </Text>
            <Text fontWeight='bold' color='rgb(100,100,100)'>
                Bear Cost | 100 $FISH
            </Text>
            <HStack gap='1rem'>
                <Heading>Game</Heading>
                <Text color='rgb(100,100,100)' >16,000 / 20,000 Bears</Text>
            </HStack>
            <Divider w='300px' />
            <Grid alignContent='space-around' w='100%' templateColumns={{xsm: '1fr', md: '1fr 1fr', lg: '1fr 1fr', xl: '1fr 1fr'}}>
                <Stack  p={4} align='center' justify='start'>
                    <Heading>
                        Win
                    </Heading>
                    <Text color='rgb(100,100,100)' >Survive 69 Epochs</Text>
                    <Divider w='300px' />
                    <Image w='300px' src={win} alt='grid-pic' />
                    <Divider w='300px' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        Dont Deplete the River for 69 Epochs
                    </Text>
                </Stack>
                <Stack p={4} align='center' justify='start'>
                    <Heading>
                        Loss
                    </Heading>
                    <Text color='rgb(100,100,100)' >Overfish The River</Text>
                    <Divider w='300px' />
                    <Image w='300px' src={loss} alt='grid-pic' />
                    <Divider w='300px' />
                    <Text color='rgb(100,100,100)'  align='center' size='sm'>
                        River goes empty before 69 Epochs
                    </Text>
                </Stack>
            </Grid>
        </Stack>
        <Stack p={6} bg={useColorModeValue('rgb(245,245,245)', 'gray.900')}>
             <HStack w='100%' justify='center' gap='1rem' >
                <Link 
                  isExternal={true}
                  href='https://twitter.com/LazyBearRiver'
                  >
                  <Box size={'32px'} as={FaTwitter} />
                </Link>
                <Link 
                  isExternal={true}
                  href='#'
                  >
                  <Box size={'32px'} as={FaDiscord} />
                </Link>
                <Link 
                  isExternal={true}
                  href='https://lazybearriver.gitbook.io/docs/'
                  >
                  <Box size={'32px'} as={FaGithub} />
                </Link>
            </HStack>    
        </Stack>  
    </Box>
  )
}
