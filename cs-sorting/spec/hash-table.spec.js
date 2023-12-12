'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const { HashTable } = require('../exercise/hash-table')

describe('hash table', () => {
	it('should return an integer key from hashing', () => {
		const hashTable = new HashTable(7)
		const hashResult = hashTable._hash('marmalade')
		expect(typeof hashResult).to.equal('number')
	})
	it('should be able to successfully search for inserted elements', () => {
		const hashTable = new HashTable(3)
		hashTable.insert('hashing time', 'now')
		const value = hashTable.search('hashing time')
		expect(value).to.equal('now')
	})
	it('should return undefined on unfound elements with search', () => {
		const hashTable = new HashTable(3)
		hashTable.insert('hashing time')
		const missingNode = hashTable.search('hash the planet')
		expect(missingNode).to.equal(undefined)
	})
	it('should successfully delete elements', () => {
		const hashTable = new HashTable(3)
		hashTable.insert('hashing time', 'now')
		hashTable.insert('red shirt', 'my first mission')
		hashTable.delete('red shirt')
		expect(hashTable.search('red shirt')).to.equal(undefined)
	})
})
