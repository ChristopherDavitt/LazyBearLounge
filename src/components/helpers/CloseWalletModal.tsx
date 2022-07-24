import React from 'react'
import { 
    Button, Divider,
     Heading, HStack, Modal, 
     ModalOverlay, ModalHeader,
      ModalContent, Stack, 
      Text, Image } from '@chakra-ui/react';
import peaceful from '../assets/images/PeacefulIcon.png';

export default function CloseWalletModal (props:any) {
  return (
    <Modal closeOnOverlayClick={true} onClose={props.closeModal} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
            <Stack justify='space-between' align='center' p={6} h='300px'>
                <Heading size='xl'>Disconnect Wallet</Heading> 
                <Divider w='300px' />
                <Image w='120px' src={peaceful} alt='modalPic' />    
                <Text 
                    fontWeight='light'
                    color='rgb(120,120,120)'
                >
                    Enjoy the rest of your day :)    
                </Text>       
                <HStack>
                    <Button onClick={props.disconnect}>
                        Disconnect
                    </Button>
                    <Button onClick={props.closeModal}>
                        Cancel
                    </Button>
                </HStack>
            </Stack>
        </ModalContent>   
    </Modal>
  )
}
