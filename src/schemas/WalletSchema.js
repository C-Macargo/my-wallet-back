import joi from 'joi'

export const WalletSchema = joi.object({
    value: joi.string().replace(',', '.', true).regex(/^\d+(\.\d{1,2})?$/).required(),
    description: joi.string().required(),
  });