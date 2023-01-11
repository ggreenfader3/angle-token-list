import { ChainId } from '@angleprotocol/sdk'
import Joi from 'joi'

export type TokenType = {
  readonly address: string
  readonly symbol: string
  readonly decimals: number
  readonly hasPermit?: boolean
  readonly wrappingMethod?:
    | 'BorrowStaker'
    | 'Curve'
    | 'Aave Matic Market'
    | 'Wrap Native'
  readonly logoURI?: string
  readonly name: string
  readonly permitVersion?: string
  readonly underlyingTokens?: string[]
  readonly useInSwap?: boolean
  readonly description?: string
}

export type TokenListPerChainId = {
  [address: string]: TokenType
}

export type TokenList = {
  [chainId: string]: TokenListPerChainId
}

/** Joi schema */
const tokenInfo = Joi.object().keys({
  address: Joi.string(),
  decimals: Joi.number(),
  hasPermit: Joi.bool(),
  wrappingMethod: Joi.string(),
  isSanToken: Joi.bool(),
  logoURI: Joi.string(),
  name: Joi.string(),
  permitVersion: Joi.string(),
  symbol: Joi.string(),
  underlyingTokens: Joi.array().items(Joi.string()),
  useInSwap: Joi.bool(),
  description: Joi.string(),
})

// const items: any = {};
// for (const chain of Object.keys(ChainId)) {
//   items[chain] = Joi.object().pattern(Joi.string(), tokenInfo);
// }
export const joiSchema = Joi.object().keys({
  [ChainId.MAINNET]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.POLYGON]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.AVALANCHE]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.ARBITRUM]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.BSC]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.OPTIMISM]: Joi.object().pattern(/^/, tokenInfo),
  [ChainId.CELO]: Joi.object().pattern(/^/, tokenInfo),
})
