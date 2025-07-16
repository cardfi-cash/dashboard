import config from "./config"
import { parseUnits ,isAddress, ByteArray} from 'viem';
import { erc20Abi ,bytesToHex} from 'viem';
/**
 * 🐢 Static actions
 */



/**
 * 🚀 ERC20 Token actions
 */


const getTokenTotalSupply = async (token:string,publicClient:any) =>
    {
        return await publicClient.readContract({
            address: token,
            abi: erc20Abi,
            functionName: 'totalSupply',
          })
    }

const getTokenAllowance = async (token:string,me:string,who:string,publicClient:any) =>
    {
        return await publicClient.readContract({
            address: token,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [me,who]
          })
    }

const getTokenBlance = async (token:string,who:string,publicClient:any) =>
    {
        return await publicClient.readContract({
            address: token,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [who]
          })
    }

const getTokenDecimal = async (token:string,publicClient:any) =>
    {
        return await publicClient.readContract({
            address: token,
            abi: erc20Abi,
            functionName: 'decimals',
          })
    }


const tokenApprove = async (token:string,to:string,amount:string="0",sendTx:any) =>
    {
        try {
            const ret = await sendTx({
              address: token,
              abi: erc20Abi,
              functionName: 'approve',
              args: [
                to, 
                amount
              ],
            })
            return ret;
          } catch (error) {
            return false;
          }
    }


/**
 * 🚀 Vault actions
 */

const deposite = async (to:any,amount:string="0",me:string,token:string,publicClient:any,sendTx:any) =>
{
    try {
        console.log("Now try staking")
        let ret ;
        if(!isAddress(token))
        {
            return false;
        }
        //Check allowance
        if(amount > await getTokenAllowance(token,me,config.address.arb.contract,publicClient))
        {
            console.log(
                {
                                    token,
                address:config.address.arb.contract,
                amount,
                sendTx
                }
            )
            await tokenApprove(
                token,
                config.address.arb.contract,
                amount,
                sendTx
            )
        }
        //Send tx
        console.log(
            {
            address: config.address.arb.contract,
            abi: config.abi.vault,
            functionName: 'deposit',
            args: [
                token, 
                amount,
                to
            ],
            }
        )
        ret = await sendTx({
            address: config.address.arb.contract,
            abi: config.abi.vault,
            functionName: 'deposit',
            args: [
                token, 
                amount,
                bytesToHex(Buffer.from(to))
            ],
        });
        // ret = await sendTx({
        //     address: config.address.arb.contract,
        //     abi: config.abi.vault,
        //     functionName: 'deposit',
        //     args: [
        //         token, 
        //         amount,
        //         to
        //     ],
        //     })
        return ret;
      } catch (error) {
        console.error(error)
        return false;
      }
}

export {
    config,

    //ERC20 Tokens
    tokenApprove,
    getTokenAllowance,
    getTokenBlance,
    getTokenDecimal,
    getTokenTotalSupply,
    deposite,
}