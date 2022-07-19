import { Box, Button, Divider, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'

export default function CloseWalletModal (props:any) {
  return (
    <Stack justify='center' align='center' position='fixed' w='100vw' h='100vh' top={0} left={0} zIndex={10000} bg='rgba(152, 152, 152, 0.356)'>
        <Stack minH='250px' w='300px' justify='center' align='center' gap='2rem' bg='white' boxShadow='lg' borderRadius='7px'>
            <Stack>
                <Heading>
                    Disconnect Wallet
                </Heading>
                <Divider />
            </Stack>
            
            <HStack>
                <Button onClick={props.disconnect}>
                    Disconnect
                </Button>
                <Button onClick={props.closeModal}>
                    Cancel
                </Button>
            </HStack>
        </Stack>    
    </Stack>
  )
}
