# Computer Science: Sorting

## Hash Table

JavaScript objects are implemented as hash tables. Let's implement them together
so we can have a better understanding of what is happening behind the scenes.

### Annotate Along: constructor

Let's open up [`exercise/hash-table.js`](./exercise/hash-table.js) and we'll annotate an implementation
of a hash table's constructor.

### Code Along: insert (hash table)

Hash tables are able to insert data in O(1) or constant time. `insert` takes a
`key`/`value` pair, then stores them in the hash table by hashing the `key`.

Let's implement `insert` together.

<p>
  <details>
    <summary><strong>❓Question:</strong> What is the <strong>average-case</strong> Big O for the insert operation?</summary>

|Operation   |Average-Case Complexity|
|------------|----------|
|**insert**  |**O(1)**      |

  </details>
</p>

<p>
  <details>
    <summary><strong>❓Question:</strong> What is the <strong>worst-case</strong> Big O for the insert operation?</summary>

|Operation   |Average-Case Complexity |Worst-Case Complexity|
|------------|----------|----------|
|**insert**  |O(1)  |**O(n)**  |

  </details>
</p>

### Lab: search

Now try implementing `search`:

- search, which returns the `value` that corresponds to the `key`, otherwise
    returns `undefined` if the `key` doesn't exist in the hash table.

<p>
  <details>
    <summary><strong>❓Question:</strong> What is the <strong>average-case</strong> Big O for the search operation?</summary>

|Operation   |Average-Case Complexity|
|------------|----------|
|insert  |O(1)      |
|**search**  |**O(1)**      |

  </details>
</p>

<p>
  <details>
    <summary><strong>❓Question:</strong> What is the <strong>worst-case</strong> Big O for the search operation?</summary>

|Operation   |Average-Case Complexity |Worst-Case Complexity|
|------------|----------|----------|
|insert  |O(1)  |O(n)  |
|**search**  |O(1)  |**O(n)**  |

  </details>
</p>

## Binary Search

The algorithm that gets you there in the minimum number of guesses is called a
"binary search". It goes like this:

1. Set the initial start & stop index values
1. Calculate the mid-point between the start and stop index value
1. If the mid-point is the target element, return the mid-point and you're done.
1. Otherwise, if the midpoint is less than the target element, then the target
element is in the upper half-range.
1. Otherwise, the target element is in the lower half-range.
1. Repeat steps 2-5 while the range has elements
1. If the element wasn't found in the range, return -1

It's relatively easy to see in a tree diagram. Can you see the binary structure
of the tree?

A binary search works with any direct access weakly ordered set (an ordered
array with elements that may compare equal). See
[here](https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure) for a
more rigorous algorithm.

**Question:** Explain why this algorithm is an example of divide-and-conquer in
your own words.

##### Code Along: Binary Search

Now that we've discussed binary search. Let's implement it together in
[`exercise/binary-search.js`](exercise/binary-search.js)

### O(n log(n)) Quasilinear Time

A quasilinear complexity, represented as O(n log(n)), is a combination of linear
O(n) and logarithmic O(log(n)) time complexities. Quasilinear algorithms are
extremely efficient. In fact quasilinear means "seemingly linear", since these
algorithms are so close to O(n) complexity.

An O(n log(n)) algorithm must perform a divide and conquer operation O(log(n))
for every element O(n). We'll see two common O(n log(n)) algorithms, merge sort
and quick sort, shortly which efficiently sort elements.

### O(n!) Factorial Time

Factorial complexity, represented as O(n!), should be avoided at all costs.
Here’s why.

One example of an O(n!) algorithm is the “bogosort” — aka, the “slow sort.” Why
so slow? An array is randomly ordered over and over again until it is correctly
sorted. For an array with a length of 10, this sort may have to run up to
3,628,800 times!

Sometimes this complexity category can’t be avoided, but it should raise some
red flags.

### Predicting Complexity

How can you predict the complexity of a given algorithm? We can look for certain
features to help us characterize it.

- Loops take linear time to complete (`O(n)`).
- Nested loops looping over the same elements take quadratic time to complete
(O(n<sup>2</sup>)), or worse, cubic time (O(n<sup>3</sup>))
- For branching statements (`if/else`), take the complexity of the worse
  branch.
- Generating all the possible permutations of a set, e.g. `abc`, `acb`, `cba`,
  etc, takes factorial time (`O(n!)`)

## Sorting

A well-known problem in computer science is sorting an array. There are many
strategies (read: algorithms) for accomplishing this. Here are two incomplete
lists:

### The Basic Sorts

- Bubble sort
- Insertion sort
- Selection sort

### The Divide & Conquer Sorts

- Quick sort
- Merge sort

This illustrates something important about algorithms: you nearly always have a
choice. There is no "one way" to solve a problem, no "right" way. Different
algorithms are better in different contexts, or with different constraints. It's
up to you to consider the options and pick the one that best meets your needs.

### Lab: Sorting Cards

I have a deck of unsorted playing cards. Describe in English an algorithm for
sorting them. Can you think of any algorithms that are very inefficient but do
sort the deck properly?

### Basic Sorts

#### Bubble Sort

##### Demo: Visualize Bubble Sort

Examine how bubble sort works using [this visualization.](https://www.hackerearth.com/practice/algorithms/sorting/bubble-sort/visualize/)

##### Annotate Along: Bubble Sort

Annotate bubble sort together in [`exercise/bubble-sort.js`](exercise/bubble-sort.js)

##### Big O

<details><summary><strong>Average</strong></summary>
<p>
O(n^2)
</p>
</details>

<details><summary><strong>Worst</strong></summary>
<p>
O(n^2)
</p>
</details>

<details><summary><strong>Best</strong></summary>
<p>
O(n)
</p>
</details>

#### Insertion Sort

##### Lab: Visualize Insertion Sort

Visualize [insertion sort](https://www.hackerearth.com/practice/algorithms/sorting/insertion-sort/visualize/)
with six volunteers holding cards.

##### Code Along: Insertion Sort

Now that we've visualized insertion sort, let's write it together in
[`exercise/insertion-sort.js`](exercise/insertion-sort.js)

##### Big O

<details><summary><strong>Average</strong></summary>
<p>
O(n^2)
</p>
</details>

<details><summary><strong>Worst</strong></summary>
<p>
O(n^2)
</p>
</details>

<details><summary><strong>Best</strong></summary>
<p>
O(n)
</p>
</details>

### Divide & Conquer Sorts

Merge sort and quick sort, use a "divide & conquer" approach. Divide and conquer
methods are commonly very efficient, so they are widely used in programming.

#### Quick Sort

##### Lab: Research Quick Sort

Take 10 minutes to work with a partner to read the
[rosettacode](http://rosettacode.org/wiki/Sorting_algorithms/Quicksort)
pseudocode implementations of quick sort. Then read through the 3-way Quick
Sort algorithm below. One of you will be asked to explain quick sort in
your own words.

###### 3-Way Quick Sort Algorithm

1. **Base Case:** If the array has less than or equal to `1` element, then it is
sorted.
1. Choose a pivot. A pivot can be any element in the array.
1. **Divide:** Divide the array into three arrays. An array with the values less
than the pivot, an array with the values equal to the pivot, and an array with
the values greater than the pivot.
1. **Recursive Case:** Recursively call quick sort on the less than and greater
than arrays.
1. **Conquer:** Combine the **sorted** less than, equal, and greater than arrays.

**Note:** A 3-way quick sort puts any element that is a duplicate of the pivot
into an `equals` array. This is an efficient optimization when there are
duplicate elements in the array. If we didn't have an equals array, the
algorithm would repeat for each duplicate element.

##### Code Along: Implement Quick Sort

Now that we've discussed quick sort. Let's implement it together in
[`exercise/quick-sort.js`](exercise/quick-sort.js)

##### Big O

<details><summary><strong>Average</strong></summary>
<p>
O(n log(n))
</p>
</details>

<details><summary><strong>Worst</strong></summary>
<p>
O(n log(n))
</p>
</details>

<details><summary><strong>Best</strong></summary>
<p>
O(n log(n))
</p>
</details>

#### Merge Sort

##### Demo: Merge Sort

Let's discuss how [merge sort](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/Mergesort.html)
works.

###### Merge Sort Algorithm

1. **Base Case:** If the array has less than or equal to `1` element, then it is
sorted.
1. **Divide:** Evenly divide the array into two arrays, an array of elements on
the left side and the right side.
1. **Recursive Case:** Recursively call merge sort on the left side and right
side arrays.
1. **Conquer:** Merge the **sorted** left side and right side arrays together.

**Note:** Merging the sorted left side and right side of the arrays, does not
mean concatenating them. Merging is the process of combining two sorted arrays
and producing a new *sorted* array. To learn more, see the
[merge(left,right) pseudocode](https://rosettacode.org/wiki/Sorting_algorithms/Merge_sort).

##### Lab: Merge Sort

Now it's your turn. Implement the `mergeSort` method in
[`exercise/merge-sort.js`](exercise/merge-sort.js). A helper method for merging two sorted
arrays has been provided.

##### Big O

<details><summary><strong>Average</strong></summary>
<p>
O(n log(n))
</p>
</details>

<details><summary><strong>Worst</strong></summary>
<p>
O(n log(n))
</p>
</details>

<details><summary><strong>Best</strong></summary>
<p>
O(n log(n))
</p>
</details>

## Additional Resources

- [Big-O Algorithm Complexity Cheat Sheet](http://bigocheatsheet.com/)
- [Sorting Algorithm Animations](http://www.sorting-algorithms.com/)
- [A Beginner’s Guide to Big O Notation « Rob Bell](http://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)
- [Fibonacci sequence - Rosetta Code](http://rosettacode.org/wiki/Fibonacci_sequence#Recursive_51)
- [Bubble-sort with Hungarian ("Csángó") folk dance - YouTube](https://www.youtube.com/watch?v=lyZQPjUT5B4)
- [Quick-sort with Hungarian (Küküllőmenti legényes) folk dance - YouTube](https://www.youtube.com/watch?v=ywWBy6J5gz8)
- [CS50's Sort lesson](https://youtu.be/IEOO5UToo6A?list=PLhQjrBD2T383Xfn0zECHrOTpfOSlptPAB&t=1109)
- [Big O Notation in JS](https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b)
- [Algorithms in JS](https://github.com/mgechev/javascript-algorithms)
- [More Algorithms in JS](https://github.com/trekhleb/javascript-algorithms)
- [The Definitive Guide To Time Complexity For Ruby Developers](https://www.rubyguides.com/2018/03/time-complexity-for-ruby-developers/)
- [The Sound of Sorting - "Audibilization" and Visualization of Sorting Algorithms](http://panthema.net/2013/sound-of-sorting/#video)
- [Visualization of Common Time Complexities](https://i.stack.imgur.com/8nXvk.jpg)
- [Ruby Binary Search Implementation](https://gist.github.com/danman01/fcb74a041864ac2733e59dd93c7e6a62)
- [Algorithms Explained like Ikea Instruction Manuals](https://idea-instructions.com/)
- [Sorting Algorithms Visualization](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)
- [When to use each Sorting Algorithm](https://stackoverflow.com/questions/1933759/when-is-each-sorting-algorithm-used)
- [Selection Sort Visualized](https://www.hackerearth.com/practice/algorithms/sorting/selection-sort/visualize/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.



## Additional Resources

- [Data Structure Visualization](http://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- [Implementing Data Structures in JavaScript](https://www.youtube.com/playlist?list=PLWKjhJtqVAbkso-IbgiiP48n-O-JQA9PJ)
