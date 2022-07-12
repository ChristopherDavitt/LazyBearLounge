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
        nfts.forEach((e:any) => nftsParsed.push(parseInt(e._hex, 16)))
    } catch (error) {
        console.log('Gettings NFT Unstaked ' + error)
        return []
    }

    // getting Approvals for Staking Contract
    try {
        const approved = await nftContract.isApprovedForAll(address);
    } catch (error) {
        console.log('Gettings Approvals ' + error)
        return []
    }
}

export const nftSupply = async( address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nftContract = new ethers.Contract(nft, nftABI, provider)

    // getting NFTs Unstaked
    try {
        const supply = await nftContract.totalSupply(address);
        return (parseInt(supply._hex, 16))
    } catch (error) {
        console.log('Gettings Current Supply' + error)
        return []
    }
}

export const stakingInfo = async( address:any) => {
    const ethers = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(staking, stakingABI, provider)

   
    try {
        const balance = await stakingContract.balanceOf(address);
        const parsedBalance = parseInt(balance._hex, 16);
    } catch (error) {
        console.log('Gettings Balance' + error)
        return []
    }

   
    try {
        const unclaimedRewards = await stakingContract.balanceOf(address);
        const parsedUnclaimedRewards = parseInt(unclaimedRewards._hex, 16);
    } catch (error) {
        console.log('Gettings Unclaimed Rewards' + error)
        return []
    }

    // Peaceful Bears
    try {
        const stakedBearsPeaceful = await stakingContract.getPeacefulList(address);
        const stakedBearsPeacefulParsed : number[] = [];
        stakedBearsPeaceful.forEach((e:any) => stakedBearsPeacefulParsed.push(parseInt(e._hex, 16)))
    } catch (error) {
        console.log('Gettings Peaceful Bears' + error)
        return []
    }
    // Hungry Bears
    try {
        const stakedBearsHungry = await stakingContract.getHungryList(address);
        const stakedBearsHungryParsed : number[] = [];
        stakedBearsHungry.forEach((e:any) => stakedBearsHungryParsed.push(parseInt(e._hex, 16)))
    } catch (error) {
        console.log('Gettings Hungry Bears' + error)
        return []
    }
    // Frenzy Bears
    try {
        const stakedBearsFrenzy = await stakingContract.getFrenzyList(address);
        const stakedBearsFrenzyParsed : number[] = [];
        stakedBearsFrenzy.forEach((e:any) => stakedBearsFrenzyParsed.push(parseInt(e._hex, 16)))
    } catch (error) {
        console.log('Gettings Frenzy Bears' + error)
        return []
    }
}