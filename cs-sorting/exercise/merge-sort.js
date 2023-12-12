'use strict'

const mergeSort = (arr) => {
	// Lab goes here
}

// HELPER FUNCTION: merges two sorted arrays
const merge = (leftArr, rightArr) => {
	const result = []
	let leftIndex = 0
	let rightIndex = 0
	while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
		if (leftArr[leftIndex] <= rightArr[rightIndex]) {
			result.push(leftArr[leftIndex])
			leftIndex++
		} else {
			result.push(rightArr[rightIndex])
			rightIndex++
		}
	}
	return result.concat(leftArr.slice(leftIndex), rightArr.slice(rightIndex))
}

module.exports = {
	merge,
	mergeSort,
}
