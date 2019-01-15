/*
  Integration tests for the BITBOX. Only covers calls made to
  rest.bitcoin.com.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOXSDK = require("../../src/bitbox-sdk").default
const BITBOX = new BITBOXSDK()

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#block`, () => {
  describe(`#detailsByHeight`, () => {
    it(`should GET block details for a given Height`, async () => {
      const block = 500000

      const result = await BITBOX.Block.detailsByHeight(block)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of blocks`, async () => {
      const blocks = [500000, 500001]

      const result = await BITBOX.Block.detailsByHeight(blocks)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const addr = "asdf"

        await BITBOX.Block.detailsByHeight(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a number or array of numbers.`
        )
      }
    })
  })

  describe("#detailsByHash", () => {
    it(`should GET block details for a given hash`, async () => {
      const hash =
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"

      const result = await BITBOX.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of hashes`, async () => {
      const hash = [
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
      ]

      const result = await BITBOX.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const hash = 12345

        await BITBOX.Block.detailsByHash(hash)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings`
        )
      }
    })
  })
})
