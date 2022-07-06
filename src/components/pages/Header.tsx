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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../assets/images/DiscordIcon.png'


export default function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>('home');



  return (
    <>
    <Box px={4}>
      <Flex
        p='0.1rem 1rem 0 1rem'
        gap='1rem'
        align='center'
        justify='space-between'
        sx={{borderBottom: 'solid 1px rgb(235, 235, 245)'}}
        >
          <Flex
            gap='2rem'
            align='center'
            
            >
            <Image w='80px' src={logo} alt='logo' />
            <Link 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              as={RouterLink} 
              to='/home'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'home' ? '700' : '400'}`, fontSize: '20px', color: 'rgb(60,60,60)'}}
              onClick={() => setSelected('home')}
              >
              Home
            </Link>
            <Link 
              as={RouterLink} 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              to='/home'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'staking' ? '700' : '400'}`, fontSize: '20px', color: 'rgb(60,60,60)'}}
              onClick={() => setSelected('staking')}
              >
              Staking
            </Link>
            <Link 
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: '400', fontSize: '20px', color: 'rgb(60,60,60)'}}
              isExternal={true}
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              href='https://github.com'
              >
              Docs
            </Link>
          </Flex>
          <Flex
            gap='1rem'
            align='center'>
            <Button
              display={{xsm: 'none', sm: 'none', md: 'inherit', lg: 'inherit'}}
              w='90px'
              h='36px'
              variant='unstyled'
              sx={{backgroundColor: 'rgb(254,249,244)', color: 'rgb(232,65,66)', cursor: 'text'}}>
              Avalanche
            </Button>
            <Button
              w='140px'
              h='36px'
              variant='outline'>
              Connect Wallet
            </Button>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ sm: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>
        {isOpen ? (
          <ScaleFade in={isOpen} initialScale={0.9}>
            <Box pb={4} display={{ sm: 'none' }}>
              <Stack as={'nav'} spacing={4} justify='center' align='center' p='2rem 0'>
                <Link 
                  
                  as={RouterLink} 
                  to='/home'
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: '700', fontSize: '20px', color: 'rgb(60,60,60)'}}
                  >
                  Home
                </Link>
                <Link 
                  as={RouterLink} 
                  to='/home'
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: '400', fontSize: '20px', color: 'rgb(60,60,60)'}}
                  >
                  Staking
                </Link>
                <Link 
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: '400', fontSize: '20px', color: 'rgb(60,60,60)'}}
                  isExternal={true}
                  href='https://github.com'
                  >
                  Docs
                </Link>
              </Stack>
            </Box>
          </ScaleFade>
        ) : null}
      </Box>
    </>
  )
}