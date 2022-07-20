import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import "../config"
import { toStr } from "../utils"

export const getSwapExactAToB = async (poolID , amount) => {
  const info = await fcl.query({
      cadence: `
      import EmuSwap from 0xEmuSwap

      pub fun main(poolID: UInt64, amount: UFix64): UFix64 {
          let poolRef = EmuSwap.borrowPool(id: poolID)
          return poolRef!.quoteSwapExactToken1ForToken2(amount: amount * (1.0 - EmuSwap.getLPFeePercentage() - EmuSwap.getDAOFeePercentage()))
      }
      `,
      args: (arg) => [arg(poolID, t.UInt64), arg(toStr(amount), t.UFix64)]
  })

  return info;
}
