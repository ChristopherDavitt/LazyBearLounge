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


export default function Navbar() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>('home');

  return (
    <>
    <Box 
      px={4}
    >
      <Flex
        gap='1rem'
        align='center'
        justify='space-between'
        borderBottom={'solid 1px rgb(240,240,240)'}
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
              sx={{fontWeight: `${selected == 'home' ? '700' : '600'}`, fontSize: '18px', color: `${selected == 'home' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('home')}
              >
              Home
            </Link>
            <Link 
              as={RouterLink} 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              to='/home'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'staking' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'staking' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('staking')}
              >
              Staking
            </Link>
            <Link 
              as={RouterLink} 
              display={{xsm: 'none', sm:'inherit', md: 'inherit', lg:'inherit' }}
              to='/home'
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: `${selected == 'mint' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'mint' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
              onClick={() => setSelected('mint')}
              >
              Mint
            </Link>
            <Link 
              style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
              sx={{fontWeight: '600', fontSize: '18px', color: 'rgb(150,150,150)'}}
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
                  onClick={() => setSelected('home')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'home' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'home' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Home
                </Link>
                <Link 
                  as={RouterLink} 
                  to='/home'
                  onClick={() => setSelected('staking')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'staking' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'staking' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Staking
                </Link>
                <Link 
                  as={RouterLink} 
                  to='/home'
                  onClick={() => setSelected('mint')}
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: `${selected == 'mint' ? '700' : '600'}`, fontSize: '18px',  color: `${selected == 'mint' ? 'rgb(60,60,60)' : 'rgb(150,150,150)'}`}}
                  >
                  Staking
                </Link>
                <Link 
                  style={{textDecoration: 'none', WebkitTextDecorationLine: 'none'}}
                  sx={{fontWeight: '600', fontSize: '18px', color: 'rgb(150,150,150)'}}
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