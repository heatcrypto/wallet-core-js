import coinSelect from 'coinselect'
import coinSelectSplit from 'coinselect/split'

export class Coinselect {

  /**
   * Standard coin select
   * 
   * @param {Array<{
   *   txId: string;
   *   vout: number;
   *   value: number;
   * }>} utxos 
   * @param {Array<{
   *   address: string;
   *   value: number;
   * }>} targets 
   * @param {number} feeRate 
   * @returns {{
   *   inputs?:[];
   *   outputs?: Array<{
   *     address: string|false|null; // if no address we must provide a change address
   *     value: number;
   *   }>, 
   *   fee?: number; // total fee
   * }}
   */
  coinSelect(utxos, targets, feeRate) {
    return coinSelect(utxos, targets, feeRate)
  }

  /**
   * Spend all
   * 
   * @param {Array<{
   *   txId: string;
   *   vout: number;
   *   value: number;
   * }>} utxos 
   * @param {Array<{
   *   address: string;
   *   value: number;
   * }>} targets 
   * @param {number} feeRate 
   * @returns {{
   *   inputs?:[];
   *   outputs?: {
   *     address: string|false|null; // if no address we must provide a change address
   *     value: number;
   *   }[], 
   *   fee?: number; // total fee
   * }}
   */
  coinSelectSplit(utxos, targets, feeRate) {
    return coinSelectSplit(utxos, targets, feeRate)
  }
}