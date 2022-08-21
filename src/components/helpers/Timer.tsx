import React, {useEffect, useState} from 'react'
import { Button, Stack, Text, useToast } from '@chakra-ui/react';

import { staking } from './contracts';
import { stakingABI } from './abis';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getEpoch, getTokenInfo } from './getValues';


export default function Timer(props: any) {

    const [timer, setTimer] = useState(0);
    const [epochButton, setEpochButton] = useState(false)

    const connected = useAppSelector((state) => state.connected);
    const paused = useAppSelector((state) => state.stakingPaused);
    const address = useAppSelector((state) => state.address);

    const timeToNextEpoch = 180;
    const toast = useToast();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (props.time > 0) {
            var intervalId = setInterval(() => {
                var date = Date.now();
                const newTimer:number = ((180) + props.time) - (Math.trunc(date/1000)); 
                if (newTimer < 0) {
                    clearInterval(intervalId);
                    setTimer(0);
                    setEpochButton(true)
                } else {
                    setTimer(parseInt(String(newTimer)));  
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
            });
            setTimeout(async () => {
                const [ balance, rewards, allowance, paused ] = await getTokenInfo(address);
                console.log([ balance, rewards ])
                dispatch({type: 'UPDATE_BALANCE', payload: balance});
                dispatch({type: 'UPDATE_CLAIMABLE', payload: rewards});
                dispatch({type: 'UPDATE_APPROVAL_TOKEN', payload: allowance});
                dispatch({type: 'UPDATE_RIVER_PAUSED', payload: paused});
                const [epoch, epochTime, riverSupply] = await getEpoch(address);
                console.log([epoch, epochTime, riverSupply])
                dispatch({type: 'UPDATE_EPOCH', payload: epoch});
                dispatch({type: 'UPDATE_EPOCH_TIME', payload: epochTime});
                dispatch({type: 'UPDATE_RIVER', payload: riverSupply})
                setTimer(timeToNextEpoch);
            },1000)
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
                fontWeight='medium'
                align='center'
            >
                0{Math.trunc(timer / 3600)} : {(timer / 60) % 60 < 10 && '0'}{Math.trunc((timer / 60) % 60)} : {timer % 60 < 10 && '0'}{Math.trunc(timer % 60)}
            </Text>

            : 

            <Button
                w='180px' 
                h='30px'
                variant={'outline'}
                boxShadow={'md'}
                disabled={paused || !connected} onClick={() => changeTheEpoch()}
            >
                Change Epoch
            </Button>
        }
    </Stack>
  )
}
