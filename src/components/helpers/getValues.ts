import { ethers } from 'ethers';
import { stakingABI, nftABI } from './abis';
import {staking, nft} from './contracts';
// get unstaked IDs, = walletOfOwner

export const getNFTData = async (address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftContract = new ethers.Contract(nft, nftABI, provider)
    
    // getting NFTs Unstaked
    try {
        const nfts = await nftContract.walletOfOwner(address);
        const nftsParsed:number[] = [];
        nfts.forEach((e:any) => nftsParsed.push(parseInt(e._hex, 16)));
        const supply = await nftContract.totalSupply();
        const parsedSupply = parseInt(supply._hex, 16)
        const approved = await nftContract.isApprovedForAll(address, staking);
        const paused = await nftContract.paused();
        return [nftsParsed, parsedSupply, approved, paused];
    } catch (error) {
        console.log('Gettings NFT data ' + error)
        return []
    }
}

export const getTokenInfo = async( address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(staking, stakingABI, provider)

    try {
        const balance = await stakingContract.balanceOf(address);
        const parsedBalance = parseInt(balance._hex, 16);
        const rewards = await stakingContract.calculateRewards(address);
        const parsedRewards = parseInt(rewards._hex, 16);
        const allowance = await stakingContract.allowance(address, nft);
        const parsedAllowance = parseInt(allowance._hex, 16);
        const paused = await stakingContract.paused();
        console.log(paused)
        return [parsedBalance, parsedRewards, parsedAllowance, paused]
    } catch (error) {
        console.log('Gettings Balance' + error)
        return []
    }
}

export const getEpoch = async(address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(staking, stakingABI, provider)
    try {
        const epochNum = await stakingContract.epochNum();
        const parsedEpochNum = parseInt(epochNum._hex, 16);
        const epochTime = await stakingContract.lastEpochTime();
        const parsedEpochTime = parseInt(epochTime._hex, 16);
        const riverSupply = await stakingContract.supply();
        const parsedRiverSupply = parseInt(riverSupply._hex, 16);
        return [parsedEpochNum, parsedEpochTime, parsedRiverSupply];
    } catch (error) {
        console.log('Getting Epoch Stuff' + error)
        return []
    }
}

export const getStaked = async(address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(staking, stakingABI, provider)
    // Staked Bears
    try {
        const stakedBearsPeaceful = await stakingContract.getPeacefulList(address);
        const stakedBearsPeacefulParsed : number[] = [];
        stakedBearsPeaceful.forEach((e:any) => stakedBearsPeacefulParsed.push(parseInt(e._hex, 16)));
        const stakedBearsHungry = await stakingContract.getHungryList(address);
        const stakedBearsHungryParsed : number[] = [];
        stakedBearsHungry.forEach((e:any) => stakedBearsHungryParsed.push(parseInt(e._hex, 16)));
        const stakedBearsFrenzy = await stakingContract.getFrenzyList(address);
        const stakedBearsFrenzyParsed : number[] = [];
        stakedBearsFrenzy.forEach((e:any) => stakedBearsFrenzyParsed.push(parseInt(e._hex, 16)))
        const totalPeaceful = await stakingContract.totalPeacefulStaked()
        const totalPeacefulParsed = parseInt(totalPeaceful._hex, 16)
        const totalHungry = await stakingContract.totalHungryStaked()
        const totalHungryParsed = parseInt(totalHungry._hex, 16)
        const totalFrenzy = await stakingContract.totalFrenzyStaked()
        const totalFrenzyParsed = parseInt(totalFrenzy._hex, 16)
        return [stakedBearsPeacefulParsed, stakedBearsHungryParsed, stakedBearsFrenzyParsed, totalPeacefulParsed, totalHungryParsed, totalFrenzyParsed]

    } catch (error) {
        console.log('Getting Bears Staked' + error)
        return []
    }
}
