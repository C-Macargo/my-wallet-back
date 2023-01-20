import joi from 'joi'

export const WalletSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
  });