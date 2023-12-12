'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const { binarySearch } = require('../exercise/binary-search')

describe('Binary Search', () => {
	it('returns the index of found elements', () => {
		const things = [1, 3, 5, 7, 9]
		expect(binarySearch(things, 3)).to.equal(1)
		expect(binarySearch(things, 7)).to.equal(3)
		expect(binarySearch(things, 9)).to.equal(4)
	})
	it('returns negative one for unfound elements', () => {
		const things = [1, 3, 5, 7, 9]
		expect(binarySearch(things, 4)).to.equal(-1)
		expect(binarySearch(things, 99)).to.equal(-1)
		expect(binarySearch(things, 1)).to.equal(0)
	})
})
