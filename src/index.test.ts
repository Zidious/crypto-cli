import 'mocha'
import { assert } from 'chai'
import { execa, ExecaError, ExecaReturnValue } from 'execa'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const CLI = path.resolve(path.dirname(__filename), '..', 'dist', 'index.js')

// TODO: Skipping tests, we're getting rate limited: https://github.com/Zidious/crypto-cli/issues/17
describe.skip('crypto-cli', () => {
  describe('no flags provided', () => {
    it('returns error', async () => {
      let err: ExecaError | null = null

      try {
        await execa(CLI, [])
      } catch (error) {
        err = error as ExecaError
      }

      assert.isNotNull(err)
      assert.equal(
        err?.stderr,
        'No coin name provided. Check `crypto --help` for help'
      )
      assert.equal(err?.exitCode, 1)
    })
  })

  describe('flags', () => {
    describe('with `--price`', () => {
      describe('with a valid coin name', () => {
        it('returns the price', async () => {
          const results = await execa(CLI, ['--price', 'bitcoin'])

          /* price will vary this output is always returned if successful */
          assert.include(results.stdout, 'Bitcoin: $')
          assert.equal(results.exitCode, 0)
        })
      })

      describe('with a invalid coin name', () => {
        it('returns the price', async () => {
          let err: ExecaError | null = null

          try {
            await execa(CLI, ['--price', 'abcd'])
          } catch (error) {
            err = error as ExecaError
          }

          assert.isNotNull(err)
          assert.equal(err?.stderr, 'Unknown coin: abcd')
          assert.equal(err?.exitCode, 1)
        })
      })
    })

    describe('with multiple `--price` flags', () => {
      describe('with valid coin names', () => {
        it('returns the price', async () => {
          const results = await execa(CLI, [
            '--price',
            'bitcoin',
            '--p',
            'ethereum'
          ])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'Ethereum: $')
          assert.equal(results.exitCode, 0)
        })
      })

      describe('with valid and invalid coin names', () => {
        it('returns the price', async () => {
          let err: ExecaError | null = null
          let results: ExecaReturnValue<string> | null = null
          try {
            /* we only return valid coin names so it should ignore invalid coin names */
            results = await execa(CLI, [
              '--price',
              'abcd',
              '--price',
              'bitcoin'
            ])
          } catch (error) {
            err = error as ExecaError
          }

          assert.isNull(err)
          assert.include(results?.stdout, 'Bitcoin: $')
          assert.notInclude(results?.stdout, 'abcd: $')
          assert.equal(results?.exitCode, 0)
        })
      })
    })

    describe('with `--price-change, --pc`', () => {
      describe('with a valid coin name', () => {
        it('returns the price change percentage', async () => {
          const results = await execa(CLI, [
            '--price',
            'bitcoin',
            '--priceChange'
          ])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'change (24H): ')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--high`', () => {
      describe('with a valid coin name', () => {
        it('returns the highest price sold in the previous 24H', async () => {
          const results = await execa(CLI, ['--price', 'bitcoin', '--high'])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'high (24H): ')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--low`', () => {
      describe('with a valid coin name', () => {
        it('returns the lowest price sold in the previous 24H', async () => {
          const results = await execa(CLI, ['--price', 'bitcoin', '--low'])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'low (24H): ')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--volume`', () => {
      describe('with a valid coin name', () => {
        it('returns the volume for a given coin', async () => {
          const results = await execa(CLI, ['--price', 'bitcoin', '--volume'])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'volume (24H): ')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--ath`', () => {
      describe('with a valid coin name', () => {
        it('returns the all time high price for a given coin', async () => {
          const results = await execa(CLI, ['--price', 'bitcoin', '--ath'])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'ATH: $')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--ath-change`', () => {
      describe('with a valid coin name', () => {
        it('returns the percentage from the all time high price', async () => {
          const results = await execa(CLI, [
            '--price',
            'bitcoin',
            '--athChange'
          ])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'ATH (%):')
          assert.equal(results.exitCode, 0)
        })
      })
    })

    describe('with `--save`', () => {
      describe('give format csv', () => {
        it('returns the price', async () => {
          const results = await execa(CLI, [
            '--price',
            'bitcoin',
            '--save',
            'csv'
          ])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'Exporting coin data...')
          assert.include(results.stdout, 'Export complete.')
          assert.equal(results.exitCode, 0)
        })
      })

      describe('give format json', () => {
        it('returns the price', async () => {
          const results = await execa(CLI, [
            '--price',
            'bitcoin',
            '--save',
            'json'
          ])

          assert.include(results.stdout, 'Bitcoin: $')
          assert.include(results.stdout, 'Exporting coin data...')
          assert.include(results.stdout, 'Export complete.')
          assert.equal(results.exitCode, 0)
        })
      })
    })
  })
})
