import { HStack, Heading, Stack, Text, Image } from '@chakra-ui/react'
import React from 'react'

import roboBear from '../assets/images/RoboBear.png';

export default function ErrorPage() {
  return (
    <Stack align='center' p={4} direction={{xsm: 'column-reverse' , md: 'row'}} w='100vw' h='calc(100vh - 150px)'>
        <Stack justify='center' align='left' gap='1rem'>
           <Heading size='2xl'>
            404 Error
            </Heading>
            <Text color='rgb(160,160,160)'>
                Uh oh... Something went wrong
            </Text> 
            <Text color='rgb(160,160,160)'>
                Use the Nav Bar above to redirect you to one of our pages
            </Text>
        </Stack>
        <Image h={{xsm:'200px' , md:'400px'}} w={{ xsm:'200px' , md:'400px'}} src={roboBear} alt='roboBear' />
    </Stack>
  )
}
