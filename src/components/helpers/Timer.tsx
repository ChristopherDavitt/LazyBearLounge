import React, {useEffect, useState} from 'react'
import { Button, Stack, Text, useToast } from '@chakra-ui/react';

import { staking } from './contracts';
import { stakingABI } from './abis';
import { useAppSelector } from '../store/hooks';


export default function Timer(props: any) {

    const [timer, setTimer] = useState(0);
    const [epochButton, setEpochButton] = useState(false)

    const connected = useAppSelector((state) => state.connected);
    const paused = useAppSelector((state) => state.stakingPaused);
    const toast = useToast();
    
    useEffect(() => {
        if (props.time > 0) {
            var intervalId = setInterval(() => {
                var date = Date.now();
                const newTimer:number = ((4 * 60 * 60) + props.time) - (date/1000); 
                if (newTimer < 0) {
                    clearInterval(intervalId);
                    setTimer(0);
                    setEpochButton(true)
                } else {
                    console.log(newTimer);
                    setTimer(newTimer);  
                }
            }, 1000)
        }
        return () => clearInterval(intervalId);
    }, [timer, props.time])

    const changeTheEpoch = async() => {
        const ethers = require('ethers')
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const stakingContract = new ethers.Contract(staking, stakingABI, signer)
        // Staked Bears
        try {
            const tx = await stakingContract.changeEpoch();
            toast({
              title: 'Transaction Sent',
              description: 'Changing Epoch.',
              status: 'info',
              position: 'top-right',
              isClosable: true
            })
            await tx.wait()
            toast({
              title: 'Transaction Success',
              description: 'Thank you for changing the Epoch :)',
              status: 'success',
              position: 'top-right',
              isClosable: true
            }) 
        } catch (error:any) {
          if (error.code != 4001)
            toast({
              title: 'Transaction Failed',
              description: 'TXN Failed...',
              status: 'error',
              position: 'top-right',
              isClosable: true
            })
            console.log(error)
        }
    }
  return (
    <Stack align='center'>
        {!epochButton ?  
            <Text 
                fontSize='lg'
                fontWeight='light'
                color='rgb(90,90,90)'
                align='center'
            >
                0{timer / 3600} : {(timer / 60) % 60 < 10 && '0'}{(timer / 60) % 60} : {timer % 60 < 10 && '0'}{timer % 60}
            </Text>

            : 

            <Button
                w='180px' 
                h='30px'
                variant={'outline'}
                bg='white'
                boxShadow={'md'}
                _hover={{backgroundColor: 'rgb(245,245,245)'}}
                disabled={!connected} onClick={() => changeTheEpoch()}
            >
                Change Epoch
            </Button>
        }
    </Stack>
  )
}
