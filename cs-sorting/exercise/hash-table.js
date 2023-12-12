'use strict'

const HashTable = function (size) {
	this.buckets = []
	for (let i = 0; i < size; i++) {
		this.buckets.push([])
	}
}

HashTable.prototype.insert = function (key, value) {}

HashTable.prototype.search = function (key) {}

HashTable.prototype.delete = function (key) {}

// _hash - a helper function, that hashes the given key, returning the index of
//         the bucket we should place the key in
HashTable.prototype._hash = function (key) {
	// create a number based on our key, here we assume the key will always be
	// a string
	let sum = 0

	// for each character in our key
	for (let i = 0; i < key.length; i++) {
		// add the character's Unicode value to our sum
		sum += key.charCodeAt(i)
	}

	// modulo our number by the number of buckets, so we can know which bucket
	// this key corresponds to
	return sum % this.buckets.length
}

module.exports = {
	HashTable,
}
