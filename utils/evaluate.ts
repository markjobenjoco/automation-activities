import { TestOptions } from '../config/types/test.type'

/**
 * Normalizes test options to ensure validation is enabled unless explicitly disabled
 *
 * @param {TestOptions | undefined} opts - The test options to normalize
 * @returns {TestOptions} The normalized test options
 */
export const normalizeTestOptions = (opts?: TestOptions): TestOptions => {
  if (!opts || opts.toValidate === undefined || opts.toValidate === null) {
    return { toValidate: true }
  }
  return opts
}
