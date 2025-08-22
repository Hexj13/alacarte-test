/* eslint-disable import/no-unresolved */
import * as constants from '@fixtures/constants';

export type PriceType =
  (typeof constants.priceType)[keyof typeof constants.priceType];

export type HotelType =
  (typeof constants.hotels)[keyof typeof constants.hotels];

export type HotelId = keyof typeof constants.hotels;
