# Sets

```python
# you pass an array into set() and it gets converted to a set by removing duplicates
arr = [1, 2, 2, 3, 3, 3]
my_set = set(arr)
print(my_set)

fruits_arr = ["avocado", "tomato", "banana"]
veggies_arr = ["beets", "carrots", "tomato"]
fruits_set = set(fruits_arr)
veggies_set = set(veggies_arr)

# UNION (Things that are fruits OR veggies)
print(fruits_set | veggies_set)

# INTERSECTION (fruits AND veggies)
print(fruits_set & veggies_set)

# DIFFERENCE
print(fruits_set - veggies_set)
print(veggies_set - fruits_set)
```

If you're into this stuff, set theory goes _way_ further. Start by looking up _subsets_ and the _power set_!

_These examples are adapted from_ _**Grokking Algorithms**_ _Aditya Y. Bhargava_

# Intro to Sorting

## Objectives

* Describe the difference between a stable and unstable sort
* Describe the difference between a comparison sort and a distribution sort
* Describe what an in-place sort is 
* Name a few common sorting algorithms and...
  * Describe the time complexity
  * Describe the space complexity
  * Tell whether it is a stable sort or not
  * Describe what kind of mechanism the algorithm uses to perform the sort \(i.e., comparison, distribution, or hybrid\)

## What is a sorting algorithm?

A sorting algorithm takes an unordered collection and gives you an ordered collection. Most commonly, this means numerical order or alphabetical order.

## How many sorting algorithms could there really be?

You'd be surprised. Even a quick glance at your [Big O cheatsheet](http://bigocheatsheet.com/) tells you about bubble sort, merge sort, quick sort, heap sort, radix sort, cube sort, bucket sort, shell sort, tree sort, insertion sort, selection sort, and counting sort. And those are just the more common ones! Check [wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm) for even more sorts.

## Can't you just tell me which one is the best and teach me that one?

Well, yes and no. While there are a few choice sorts you should get very familiar with, there isn't just one answer for which one is the "best" because different sorts are good at different things. Based on your needs for a specific situation, you may want to consider time complexity, space complexity, whether the sort is stable or not, and what kind of mechanism that the algorithm uses to sort.

## Your first sort

### Group Activity

Before we get into any code, let's try sorting a deck of cards by hand.

With a partner, acquire a set of playing cards. Assign one person to move cards and one person to be in charge of comparisons.

The card person should lay the cards out in a line on the table. The card person's goal is to sort the cards. Starting at the beginning of the list, for the first two cards, ask the comparison person whether they should swap the two cards or not. Continue this process for the next two cards, and so on until the end of the line. Start over at the beginning when you're done. Keep doing this process until you make a pass through of your line of cards and make zero swaps. Congratulations, you have a sorted deck of cards!

Comparison person: `Always answer ties with "don't swap"` - we'll talk about why that's important in a moment.

Typically, you might have your chosen card order be numerical \(as it is in poker\), but feel free to pick whatever variation you would like. For example - what if aces were always low? How about reverse order? Or what about using pinochle ordering - \[9, J, Q, K, 10, A\]?

Swap roles, shuffle your deck, and repeat the process.

### After you're done with the activity

When you're finished having each person sort the cards at least once, discuss with your partner your thoughts on the following questions:

1. How fast was this sort? Fast, slow, medium?
2. Did you require any extra space besides the space that the cards were originally laid out in?
3. What effect did it have on the end result that you did not swap "ties" \(e.g., a 5 of hearts and a 5 of diamonds\)?
4. How fast or slow would it be to sort cards that start out already in order?
5. How fast or slow would it be to sort cards that start out in completely reversed order?
6. Hypothetically, if you wanted to sort by suits \(e.g., clubs &lt; diams &lt; hearts &lt; spades\), and then by card value, how would your swap/comparison logic change?
7. Given your answers to the previous questions, hazard a guess at what this sort's stats are:
   * Best case time complexity \(Big Ω\)
   * Worst case time complexity \(Big O\)
   * Space complexity? \(Big O\)
   * Is this a stable or unstable sort?

The sort you performed is called "Bubble sort". Perhaps you were able to see why in a visual way when you were sorting your cards. For example, if you had a face card at the front of the deck then it sort of `bubbled` up to the place it was supposed to be.

## Sorting Types

The two basic types of sorts are comparison sorts and distribution sorts.

A _comparison sort_ is a sort that compares values to determine what their place is in the final list. An example of a comparison sort would be bubble sort, which compares two items and swaps them depending on the outcome of the comparison. Usually this comparison will be numerical or alphabetical order, but as you may have noted, you can define the comparison however you'd like.

`"A comparison sort is a type of sorting algorithm that only reads the list elements through a single abstract comparison operation (often a "less than or equal to" operator or a three-way comparison) that determines which of two elements should occur first in the final sorted list."`

* [Wikipedia](https://en.wikipedia.org/wiki/Comparison_sort)

A _distribution sort_ is a sort that groups together certain items based on their properties. We'll see an example of this later on with bucket sort, or variations of bucket sort such as radix sort.

`"Distribution sort refers to any sorting algorithm where data are distributed from their input to multiple intermediate structures which are then gathered and placed on the output."`

* [Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm#Distribution_sort)

A combination of both of these methods may be used, and this would be known as a _hybrid sort_. An example would be Timsort, which combines merge sort, insertion sort, and other logic \(including binary search\).

## Sorting Mechanisms

This isn't really an official term, but often you may hear sorts described in greater detail. For example, yes, bubble sort is a comparison sort, but there are lots and lots of comparison sorts. More likely, you might describe the sorting mechanism as 'swapping'. Other sorts you may hear described as 'inserting', 'merging'

## Stable vs. Non-Stable

![Stability](https://infogalactic.com/w/images/thumb/8/82/Sorting_stability_playing_cards.svg/300px-Sorting_stability_playing_cards.svg.png)

A stable sort preserves the ordering of "ties", meaning that if we started out with say a 5♦ in position 2 and a 5♠ in position 10, then the 5♦ would be first and the 5♠ would be second in our final result.

## Time Complexity

People care a lot about the time complexity of sorting, to the point that they study the best, worst, and average time complexity of each algorithm. You may have noticed that in an ideal scenario, \(already sorted or nearly sorted\) bubble sort wasn't half bad, but on average, it was really slow. The actual stats for bubble sort are O\(n\) for best case and O\(n2\) for the worst case. For this reason, sometimes it is good to consider what sort of data you will be usually sorting and what kind of case that would be - best, worst, or average.

## Space Complexity

You may have heard people describe a sort as an "in-place" sort. This means that instead of creating a whole new array to store our data, we can sort simply by moving things around in the existing array. For example - our bubble sort didn't require an

## Okay, where's the cheatsheet?

| Sort | Best Case | Worst Case | Space | Stable | Mechanism | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Bubble Sort | Ω\(n\) | O\(n2\) | O\(1\) | Yes | Comparison | Easiest to understand; uses swaps |
| Selection Sort | Ω\(n2\) | O\(n2\) | O\(1\) | Yes | Comparison | - |
| Insertion Sort | Ω\(n\) | O\(n2\) | O\(n\)\* | Yes | Comparison | In-place version exists; Uses insertions |
| Bucket Sort | Ω\(n+k\) | O\(n2\) | O\(n+k\) | Yes | Distribution | - |
| Radix Sort | Ω\(nk\) | O\(nk\) | O\(n+k\) | Yes | Distribution | Variation of bucket sort; in place versions exist but are not stable |
| Merge Sort | Ω\(n log\(n\)\) | O\(n log\(n\)\) | O\(n\)\* | Yes | Comparison | Divide and conquer, uses merges, \*in-place version exists |
| Quick Sort | Ω\(n log\(n\)\) | O\(n2\)\* | O\(log\(n\)\) | No | Comparison | Stable versions exist; uses partitioning |
| Heap Sort | Ω\(n log\(n\)\) | O\(n log\(n\)\) | O\(1\) | No | Comparison | In-place, but not stable. Like improved selection sort |

#### Notes about table

* Quick sort has an _average_ time complexity of n log\(n\), and is actually considered a "good" sort despite the fact that it has a quadratic time worse case scenario. In fact, on average, it's even faster than merge sort!
* Many sorts such as merge sort or insertion sort have an in-place version of the algorithm, however, these solutions may be more complex to implement or have different time complexities than the basic algorithm
* Quick sort has stable implementations available, however the time and space complexity of this alteration of the algorithm is different.
* Quick sort performs worst on data sets with few unique values. An implementation called [Quick3](https://www.toptal.com/developers/sorting-algorithms/quick-sort-3-way) \(because it has 3-way partitions instead of 2-way\) solves this issue.

### Additional Activities

Get back into your groups of two from earlier and layout your shuffled deck of cards once more.

#### 1. Selection sort

This sort is similar to Bubble Sort, but this time, you're only going to make a swap if your smaller number will be in its final resting place. Thus, you should go through the array and find the lowest number and swap it with the first card. Then do the same thing with the second card, and so on until you're finished.

After you're done, add `Selection Sort` to the table above with your best guesses about what its stats are based on your experience.

#### 2. Insertion sort

You and your partner each have your own table. Start with the cards in random order on one person's table. That person takes one card from the front of the deck and then hands it to the second person. The second person organizes the card on their own table, placing each successive card in order as they come. To do this, compare the new card received to every card in on the new table until you find where it fits.

After you're done, add `Insertion Sort` to the table and guess what the stats are for this sort based on your experience.

# Insertion Sort

The next sort we will be learning is insertion sort. Like bubble sort, it is one of the less efficient sorting algorithms, having a time complexity of O\(n2\). Bubble sort, insertion sort, and another simple one called selection sort make up the family of quadratic sorting algorithms. They are called quadratic because their time complexity is a square of the number of elements, meaning that to sort 10 elements takes around 100 comparisons. The reason for this is the nested loops in these algorithms. Creating nested loops where the entire array is iterated once for every element in the array will always create a O\(n2\) algorithm.

However, insertion sort, in practice, is more efficient than both bubble sort and selection sort. It is for this reason that more complex sorts use insertion sort internally as a step in their sorting process. Since we may find an insertion sort inside some other sorting algorithms, we will show you how it works here.

## Characteristics

* Comparison Sort - compares values and swaps them
* In-place - makes swaps directly in the array that was passed in
* Stable - preserves original ordering of ties

## The Algorithm

Insertion sort works the way we sort a deck of cards in our hands. We start at one end and decide whether we want to sort ascending or descending. We look at the cards that come after the first. If a subsequent card belongs in an earlier place in the deck, we move it down until it is located in the right place. Here is some pseudocode:

1. Create an outer loop that goes from 1 through the end of the array to be sorted. We start at 1 and not 0 because when an element has been swapped all the way to the leftmost side \(index 0 in the array\) we say that it is sorted for the purposes of the algorithm. Other elements may be moved past it but once an element has stopped being swapped it will never evaluated again.
2. Inside the outer loop, create a variable j and set it equal to i.
3. Create an inner while loop that loops while `j > 0` and the element to the left of j is greater than the one at j. If either `j = 0` \(we are at the leftmost edge\) or if `array[j - 1] <= array[j]` \(we don't need to swap\) then the inner loop ends and we go back to the next iteration of the outer loop.
4. Inside the inner loop, swap `array[j]` and `array[j - 1]`.
5. Lastly, inside the inner loop, subtract one from j.

That's it! We start at the second element and swap it with the first if the first is greater. The swapping continues until either we reach the leftmost side of the array or until it finds a number with which it should not swap places. Then we increment i to go to the next element and swap it downward until we get it to the right place. Each successive element will swap downward until it is the right place. At the end of the loops, we will have a sorted array.

## Implement It!

### Further Research Resources

* [Insertion Sort illustrated with Hungarian Dance](https://www.youtube.com/watch?v=ROalU379l3U)
* [Wikipedia - Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort)

# Bucket Sort

Bucket sort is a distribution sort in which we take the original unsorted elements in an array and distribute them into a set of buckets. Each bucket is meant to hold a range of element values. After we have distributed all the elements from the array into the buckets, we sort each bucket and then concatenate them all into a single array again. At the end of the process, the original array will be sorted.

## Algorithm Analysis

In the best and average cases, bucket sort operates at O\(n+k\) time efficiency where `n` is the number of elements in the array and `k` is the number of buckets you create for sorting. Every operation that we do in a bucket sort is actually O\(n\) which is "linear time" but the final concatenation of the buckets can be done in constant time, or O\(k\). As a result, our efficiency for this algorithm is the sum of both of those: O\(n+k\). In the worst case, bucket sort can perform like a quadratic search at O\(n2\).

This worst case can happen when we don't have a very even distribution of the values to be sorted. If we have a bunch very near each other, they will all be sorted into the same bucket. This will increase the time needed to sort to closer to a quadratic. As a result, bucket sort is not a great option when you have a lot of repeats or an uneven range of values.

## Characteristics

* Distribution Sort - puts values into auxilliary data structures
* Not in place - requires additional space and returns a new sorted array
* Stable - preserves original ordering of duplicates

## The Algorithm

* The function takes as parameters the array to be sorted \(`arr`\) and the number of buckets to create \(`k`\). \(Remember that the number of elements in the array/list and the number of buckets determines the efficiency of this algorithm since it is O\(n+k\).\)
* Create a new array of `k` empty buckets \(array of arrays / list of lists\).
* Iterate over the unsorted array to find the maximum value.
* Iterate over that array again to scatter each element into the appropriate bucket.
* Iterate over the buckets array and sort each bucket \(usually we use **insertion sort**\).
* Return all the buckets concatenated in order.

## Calculating the Correct Bucket

This can actually be done mathematically if we know both the number of buckets and the maximum value in our unsorted array. Consider a list of integers:

```python
ints = [19, 28, 61, 32, 17, 59, 48, 4, 10, 74, 39, 69]
```

Our maximum value in here is 74. We don't want too few buckets but we also don't want too many. Having one bucket for each element actually becomes a different kind of sort known as pidgeonhole sort. With 12 values in the list, why don't we choose 6 which will make sorting each bucket extremely easy. Then the formula for calculating the bucket for each unsorted element is:

```python
bucket_index = math.floor((unsorted_value / maximum + 1) * k)
```

> NOTE: As we will see, this works great for integers but will need to be tweaked for other types like floats or strings.

Let's see if we can understand what this is doing. When we divide the unsorted value by the maximum value in our list plus one, we get a fractional value that helps us approximate where it should be placed in our range. Values closer to the max will have a ratio closer to 1 while lower values will have ratios closer to 0. This gives us a kind of measurement of where this value should go in the final sorted list. We take this ratio and multiply it by the number of buckets and then get the floor of the whole thing to find the index of the bucket closest to where that value should end up. Let's see where our values end up:

```text
math.floor((19 / 75) * 6) = 1
math.floor((28 / 75) * 6) = 2
math.floor((61 / 75) * 6) = 4
math.floor((32 / 75) * 6) = 2
math.floor((17 / 75) * 6) = 1
math.floor((59 / 75) * 6) = 4
math.floor((48 / 75) * 6) = 3
math.floor(( 4 / 75) * 6) = 0
math.floor((10 / 75) * 6) = 0
math.floor((74 / 75) * 6) = 5
math.floor((39 / 75) * 6) = 3
math.floor((69 / 75) * 6) = 5
```

```python
#    0         1         2         3         4         5
[ [4, 10], [19, 17], [28, 32], [48, 39], [61, 59], [74, 69] ]
```

Not too shabby! Now all we need to do is sort each bucket and then concatenate them all together and return it.

## Implement it!

Now that you have an understanding of how this works, take a stab at implementing it for sorting a list of integers.

### Bonus:

If you get that working, try changing it to a list of float values between zero and one \(e.g. 0.334, 0.167, 0.834, etc.\). How would you need to modify the bucket index calculation to make it work for a list of fractional float values?

# Bubble Sort - Challenge

For this challenge, your goal is to sort an array of numbers in python, with the following guidelines:

* Cannot use any built-in sort functions
* Must be in-place \(cannot create a new array\)
  * therefore, you'll need to swap values

The name of this challenge contains **bubble sort**, so you may want to either research the sort **or** think about how you can sort the array by having the items "bubble" up to their correct positions.

**Data for testing:**

```text
numbers = [413, 445, 403, 224, 157, 312, 785, 862, 602, 354, 90, 442, 458, 641, 595, 441, 661, 690, 963, 376, 840, 463, 514, 919, 789, 423, 81, 272, 46, 981, 375, 70, 139, 955, 399, 179, 346, 369, 827, 171, 460, 982, 721, 631, 218, 200, 163, 510, 56, 30, 490, 320, 326, 327, 161, 586, 949, 244, 857, 750, 290, 716, 511, 573, 96, 340, 78, 800, 821, 417, 627, 847, 906, 672, 294, 279, 554, 709, 731, 344, 449, 790, 231, 307, 39, 574, 566, 941, 72, 884, 763, 486, 66, 578, 261, 723, 914, 104, 256, 600, 32, 358, 762, 526, 495, 367, 2, 875, 500, 165, 813, 172, 419, 616, 809, 699, 908, 945, 381, 742, 408, 575, 260, 468, 1, 959, 969, 755, 492, 135, 714, 624, 648, 336, 298, 464, 922, 18, 635, 874, 45, 370, 647, 769, 347, 772, 479, 140, 412, 118, 415, 170, 596, 798, 420, 250, 406, 73, 839, 656, 662, 512, 444, 324, 659, 363, 60, 69, 74, 633, 845, 537, 466, 19, 421, 844, 362, 166, 430, 62, 503, 202, 175, 888, 257, 696, 125, 206, 300, 726, 803, 836, 644, 741, 150, 353, 443, 233, 323, 396, 454, 356, 751, 31, 724, 747, 666, 236, 131, 151, 848, 736, 704, 240, 728, 299, 568, 990, 892, 855, 920, 424, 950, 379, 319, 304, 665, 766, 207, 846, 398, 730, 828, 177, 88, 5, 540, 44, 707, 54, 329, 357, 858, 132, 913, 84, 100, 680, 816, 551, 225, 305, 122, 757, 291, 478, 310, 583, 743, 205, 41, 186, 866, 655, 547, 764, 694, 748, 284, 8, 107, 562, 749, 679, 673, 833, 351, 28, 245, 143, 902, 20, 642, 784, 791, 604, 998, 893, 531, 989, 783, 980, 612, 221, 960, 964, 475, 268, 251, 416, 7, 992, 570, 293, 119, 116, 133, 29, 501, 316, 987, 713, 660, 504, 410, 541, 405, 418, 601, 465, 832, 854, 338, 863, 865, 219, 453, 469, 296, 975, 843, 653, 43, 211, 1000, 437, 619, 232, 685, 439, 447, 899, 697, 249, 876, 814, 801, 128, 13, 782, 237, 947, 489, 628, 544, 905, 303, 988, 390, 753, 470, 572, 10, 582, 431, 203, 180, 560, 141, 546, 65, 123, 695, 860, 598, 350, 111, 330, 943, 183, 51, 525, 775, 508, 923, 451, 682, 289, 138, 557, 640, 274, 49, 808, 286, 102, 173, 422, 456, 886, 273, 881, 765, 872, 308, 306, 35, 608, 334, 539, 625, 212, 455, 414, 850, 195, 711, 794, 282, 129, 335, 137, 962, 932, 811, 958, 101, 333, 188, 283, 771, 907, 677, 585, 227, 795, 168, 768, 910, 190, 997, 977, 281, 228, 254, 382, 158, 497, 38, 693, 687, 719, 933, 651, 758, 754, 868, 532, 965, 530, 820, 167, 159, 861, 930, 86, 246, 427, 343, 520, 124, 545, 95, 607, 924, 387, 404, 621, 113, 302, 611, 345, 230, 386, 328, 698, 321, 852, 946, 715, 134, 536, 438, 482, 898, 52, 178, 688, 515, 938, 819, 432, 556, 341, 16, 361, 927, 838, 729, 654, 318, 9, 733, 75, 26, 24, 793, 897, 538, 121, 93, 196, 339, 954, 292, 851, 645, 220, 571, 488, 162, 372, 313, 591, 457, 22, 110, 589, 563, 266, 364, 429, 710, 725, 717, 953, 505, 377, 64, 146, 325, 564, 903, 818, 271, 773, 270, 434, 277, 94, 614, 535, 740, 951, 529, 702, 384, 671, 674, 452, 594, 467, 603, 643, 181, 735, 99, 189, 870, 169, 473, 802, 629, 509, 352, 916, 761, 79, 366, 378, 617, 103, 209, 770, 502, 904, 581, 287, 285, 986, 263, 823, 548, 472, 144, 658, 901, 259, 223, 528, 984, 976, 650, 683, 280, 634, 374, 692, 92, 760, 182, 3, 380, 349, 737, 275, 174, 752, 337, 746, 37, 620, 995, 435, 87, 689, 397, 342, 278, 185, 85, 956, 499, 448, 243, 807, 389, 192, 638, 184, 450, 885, 506, 632, 744, 918, 276, 153, 780, 105, 411, 331, 204, 738, 48, 817, 193, 675, 622, 994, 667, 636, 983, 461, 891, 550, 663, 164, 147, 297, 34, 605, 931, 708, 552, 527, 11, 597, 481, 176, 966, 258, 792, 214, 580, 973, 649, 235, 565, 76, 701, 371, 606, 734, 208, 61, 829, 579, 590, 301, 657, 309, 720, 935, 14, 264, 332, 799, 426, 895, 670, 652, 974, 229, 355, 815, 55, 584, 727, 126, 63, 774, 498, 837, 767, 942, 36, 117, 407, 826, 210, 985, 993, 804, 706, 939, 613, 926, 82, 705, 360, 42, 558, 145, 841, 778, 507, 6, 388, 593, 97, 664, 686, 213, 787, 17, 567, 265, 15, 47, 21, 239, 476, 588, 58, 533, 849, 142, 433, 238, 215, 776, 676, 446, 887, 89, 523, 991, 156, 576, 940, 630, 948, 883, 879, 516, 639, 425, 485, 136, 796, 483, 921, 392, 368, 191, 67, 459, 120, 553, 267, 4, 834, 393, 252, 216, 255, 618, 517, 262, 491, 160, 409, 894, 900, 718, 822, 108, 873, 25, 197, 522, 474, 496, 201, 400, 712, 436, 519, 53, 967, 979, 915, 669, 480, 912, 952, 12, 112, 856, 77, 199, 543, 609, 806, 970, 317, 315, 972, 882, 681, 812, 911, 909, 365, 471, 98, 402, 610, 148, 810, 646, 521, 114, 217, 961, 937, 518, 241, 385, 149, 462, 373, 878, 853, 777, 957, 756, 494, 234, 484, 487, 703, 391, 869, 805, 929, 788, 824, 781, 917, 152, 599, 830, 222, 71, 968, 896, 542, 797, 248, 637, 127, 759, 877, 928, 27, 978, 678, 288, 577, 996, 477, 23, 226, 50, 401, 925, 561, 934, 40, 890, 493, 835, 864, 198, 383, 314, 295, 155, 831, 524, 322, 348, 745, 626, 57, 80, 115, 534, 825, 440, 68, 59, 971, 880, 615, 779, 722, 187, 859, 684, 154, 559, 91, 269, 513, 83, 623, 936, 786, 253, 587, 700, 555, 194, 592, 311, 130, 867, 944, 871, 109, 359, 549, 242, 668, 395, 394, 106, 999, 569, 732, 691, 428, 889, 842, 33, 247, 739]
```

Hint: Start figuring out how to move the first element to the right place, and go from there \(the elements will have to **bubble** up to the top\).

# Merge Sort

We are now moving away from the slower quadratic sort algorithms and are going to take a look at two of the faster sorts. The first is Merge Sort.

Merge Sort operates on the principle that an array of 1 or 0 elements is inherently sorted. The first step is to recursively divide the original array into smaller and smaller halves until you end up comparing an array of 1 to an array of either 0 or 1, which is a very easy comparison to make. At that point, you concatenate the values into a new array in the proper sorted order. This now-sorted array is compared with the next now-sorted array and those are merged into a single sorted array. This process continues until the orignal halves are re-joined in the sorted order.

[Watch Merge Sort illustrated by Germanic folk dance](https://www.youtube.com/watch?v=XaqR3G_NVoo)

## Algorithm Analysis

The time complexity of merge sort is O\(n log\(n\)\). O\(n log\(n\)\) time is faster than O\(n2\) or quadratic sorts, but it is not as fast O\(n\) or linear sorts. Linear time on sorts \(needing only ~1 comparison per element\) is rare and is usually only possible if the dataset to be sorted is already very close to sorted. As such, O\(n log\(n\)\) sorts are usually the best ones we can use.

Merge sort does not produce an in-place sort. Therefore, there is some additional space requirement for running this sort. We express the space complexity as O\(n\) or linear space complexity. This means you need one additional place in memory for every element in the array, \(but not more than one.\) The only thing better than linear time or space complexity is **constant time or space complexity** which means that the time or space requirements for it never change regardless of how much data needs to be sorted. Any sort that does an in-place sort is said to have constant space complexity since it needs no additional space.

## Characteristics

* Comparison Sort - compares values and swaps them
* NOT In-place - allocates additional memory for sorting items
* Stable - preserves original ordering of ties

## The Algorithm

Merge sort actually involves two functions: one to split the array in successive halves until you are dealing with single or no-element arrays, and the other to merge them back together in sorted order. Typically, we name the first one `merge_sort` and the second one just `merge`.

Let's start with `merge_sort` since that it the one that starts the process:

1. The `merge_sort` function takes an array as a parameter and calls itself recursively to split the array so we need to define a base case. Above, we learned that an array of 1 or 0 elements is inherently sorted so those are our base cases. We simply return the array if the length is 1 or less.
2. If the length is longer, we find the middle index of the array and split the array in equal halves \(or nearly equal halves\).
3. We then call `merge_sort` on each side, saving the array that is returned form each side.
4. Finally we call `merge` passing in the now-sorted left and right arrays.

The `merge` function takes a `left` and a `right` parameter that are the arrays to merge. It is also called recursively so we must identify base cases. This function is meant to take two sorted arrays, merge them together into one sorted array, and return that array. So what are the cases where we automatically know what to return. Well, we know that the base cases from the `merge_sort` function operate on the principle that an array of 0 or 1 element is sorted. With that being the case, if either array is empty, simply return the other one. Obviously, the result of merging two sorted arrays, where one contains nothing, is the only array that contains anything. This logic works for empty arrays, too, since sorting two empty arrays together always will just be an empty array. With that in mind...

1. If the right array is empty, return the left array
2. If the left array is empty, return the right array
3. Else, get the first value from both arrays \(should be the least value\) and compare them:
4. If left is smaller than right, remove that element from the left array and store it in a `smallestNumber` variable. Else, remove and store the first element from the right array.
5. Call `merge` again, passing in the arrays in their new state \(one of them just had an element removed\). Store the resulting sorted array in a variable.
6. Finally, add the smallest number to the first position in the sorted array and return it.

Between step 5 and 6 is some magic. Each time we call `merge` recursively, we are removing the smallest element from one of the arrays. Eventually, this will cause one of the arrays to be empty. But at this point, we know the smallest number because we saved it. We simply insert it into the final sorted array to return at position 0 and it will be in its correct place.

## Implement It!

### Further Research Resources

* [MergeSort on TurtorialsPoint](https://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm)
* [MergeSort on Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)

# Quick Sort

Another very popular fast sorting algorithm, Quicksort has an interesting way of choosing an arbitrary element, called the `pivot`, and then recursively grouping values less than the pivot to the left and values greater to its right. There are a few rules to this algorithm that make it a little challenging to understand but we will lay them all out very clearly.

Let's start by looking at the key players in this sort:

* **left**: A marker used for finding numbers lower than the pivot. It moves one element at a time from the leftmost position until it finds a value greater than or equal to the pivot value. If it ever reaches the rightmost edge of the array, it stops.
* **right**: A marker used for finding numbers higher than the pivot. It moves one element at a time from the rightmost position until it finds a value less than the pivot. If it ever reaches the **left** marker, it stops.
* **pivot**: An initially randomly chosen element in the array. It's value is meant to be the point around which things swap: higher numbers go to the right while lower numbers go to the left. Basically, when the **right** and **left** find their values that are lower or higher than the pivot, respectively, those values are swapped. Though it can be chosen randomly, many basic implementations simply use the leftmost or rightmost element as the initial pivot.

**Example**

```text
[8, 5, 2, 7, 1, 9, 3, 6, 4]
```

If we choose the last element as the pivot by default \(in this case, the number **4**\), we need to partition the array like so:

```text
  left    pivot      right
[2, 1, 3], [4], [8, 5, 7, 9, 6]
```

In this case, the pivot \(number **4**\) is considered sorted, and then we call quicksort on the remaining two partitions.

```text
left
[2, 1, 3] <= choose 3 as the pivot
[1], [2], [3] <= partitioned
```

Now, the left partition pivot \(number **3**\) is considered sorted. Since the left and right partitions are single-element arrays, they're sorted as well.

```text
  left    pivot       right
[1, 2, 3], [4], [8, 5, 7, 9, 6]
```

```text
Right partition
[8, 5, 7, 9, 6] <= choose 6 as the pivot
[5, 6, 7, 9, 8] <= partitioned
       |                <= now we need to partition again (this is the recursive step)
       V
left2       pivot2  right2
[5],         [6],    [7, 9, 8]
```

Now, the right partition pivot \(number **6**\) is considered sorted. Since left2 is a single-element array, it's considered sorted as well. Now for right2.

```text
left2 partition
[7, 9, 8] <= choose 8 as the pivot
[7, 8, 9] <= partitioned

Now left2 is sorted. Final right partition:
[5, 6, 7, 8, 9]

Combining the left partitions and right partitions give us:
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

[Another good explanation \(with visuals\)](http://me.dt.in.th/page/Quicksort/)

## Algorithm Analysis

Quicksort is another O\(n log\(n\)\) algorithm similar to Merge Sort. Normally, it outperforms similarly efficient sorts like merge sort and heapsort but there are rare cases when it can perform as poorly as a quadratic like bubble sort. Usually this has to do with the data being in the exactly perfect wrong order which causes the algorithm to work to its maximum or beyond. Interestingly, the exact wrong order for Quicksort that causes it to degrade to O\(n2\) is an array that is already sorted!

## Characteristics

* Comparison Sort - compares values and swaps them
* In-place - operates directly on the array argument
* Unstable - does not preserve original ordering of ties

## The Algorithm

Quicksort is a two-parter like merge sort. We have the actual `quicksort` function that someone would call to sort an array that they pass in as an argument. It operates a little like `binarySearch`: The first parameter is the array to be sorted, and the second and third parameters are where to start and where to stop for the sub-portion of the array on which this recursive step is operating. On the first invocation of `quicksort` you can use default values for these. The "left" marker will always start at 0 and the "right" should be set to the array's length - 1 if it isn't specified \(if it is set to null\).

1. First, we make sure that the "left" or "low" index is less than the "right" or "high" index. If that is true, we call a `partition` function that will return a new pivot index.
2. Then we call `quicksort` on the left half of the array \(from "left" to "pivot"\) and also call `quicksort` on the right half \(from "pivot + 1" to "right"\).
3. The `quicksort` function returns whenever the "left" index ends up greater than or equal to the "right" index. It doesn't need to return any value because the array has been sorted in place.

The `partition` function does the heavy lifting. This partition scheme is called Hoare's Partition Scheme and he is the person who invented quicksort. It takes the same parameters as quicksort: the array, the left index and the right index.

1. Get the value in the middle of the array and store this as the pivot value.
2. Set `i` to be "left" and set `j` to be "right". \(many uses of Hoare's partition use a `do...while` construct that is absent in python's standard library and will show `i = left - 1` and `j = right + 1`... **this will not work with this python implementation**\)
3. Now inside of an infinite loop, do the following:
   1. Increment `i` by 1 while the value in the array at that index is less than the pivot value.
   2. Decrement `j` by 1 while the value in the array at that index is greater than the pivot value.
   3. If `i` is greater than or equal to `j`, return `j` as the new pivot. \(This return is what will end the infinite loop.\) Else, swap the values in the array at indices `i` and `j`.

## Let's implement it!

### Further Research Resources

* [Quicksort Visualized with Hungarian Dance](https://www.youtube.com/watch?v=ywWBy6J5gz8)
* [Quicksort on Wikipedia](https://en.wikipedia.org/wiki/Quicksort)

# Heap Sort

## What is a heap?

A heap is a tree that has the "heap" property. There can be either max heaps or min heaps. A max heap has the property that for every parent node, it's key is greater than or equal to the key of its child nodes. In other words, in a max heap, the biggest number is at the top.

![Max Heap](https://res.cloudinary.com/briezh/image/upload/v1519762182/Max-Heap_eir7zo.png)

A min heap is similar to a max heap, except that the parent's key is less than or equal to the child's key. Therefore in a min heap, the smallest number is at the top \(or root\) of the tree.

## What is heapsort?

Heapsort uses a heap data structure in order to perform a sort. It's an in-place comparison sort. The code implementation uses 3 functions: Heapsort, BuildHeap, and Heapify. Heapsort is the main/entry function, BuildHeap forms your initial heap, and Heapify is to make a non-heap tree into a heap. An important thing to recognize is that an array can be a representation of a tree. Imagine arr\[0\] as the root of the tree and arr\[1\] and arr\[2\] as the left and right nodes of the root. Then arr\[3\] and arr\[4\] would be the left and right nodes of arr\[1\], and so on. For example, take the max heap pictured above. In an array representation that would look like:

```text
arr = [100, 19, 36, 17, 3, 25, 1, 2, 7]
```

Thus, for any given index `i`, its children are:

* left: `2*i + 1`
* right: `2*i + 2`

### Pseudocode

The pseudocode for the algorithm goes like this: 1. Using the given array, build a heap using recursive insertion 2. Iterate to extract the max element in the heap and then reheapify the heap 3. Extracted elements form a sorted subsequence

```text
Heapsort(Arr)
    BuildHeap(Arr)
    for i in range Arr size down to 1
        swap(Arr[1], Arr[i])
        NewSize = reduce size by one
        Heapify(Arr, NewSize, 1)

BuildHeap(Arr)
    n = Arr size
    for i in floor(n/2) down to 0
        Heapify(Arr, n, i AKA the RootIndex)

Heapify(Arr, i, size)
    max = i
    left = 2i
    right = 2i+1

    if (left <= size) and (Arr[left] > Arr[max])
        max = left

    if (right<=size) and (Arr[right] > Arr[max])
        max = right

    if (max != i)
        swap(Arr[i], Arr[max])
        Heapify(Arr, max)
```

### Code in Python

For working code in Python, [visit this repl](https://repl.it/@brandiw/HeapSort).

```text
def heap_sort(list):
  # For ease, let's make a variable for the size of the array
  size = len(list)

  # Build inital heap structure
  build_heap(list, size)

  # Loop from length down to 2 to heapify
  for i in range(size - 1, 0, -1):
    #swap first and "last"
    list[0], list[i] = list[i], list[0]

    # Call heapify on reduced list size
    heapify(list, i, 0)

  return list

# Convert array/list to a heap  
def build_heap(list, size):
  for i in range(size // 2, -1, -1):
    heapify(list, size, i)

# Make our tree into a max heap
def heapify(sublist, size, root_index):
  largest = root_index
  left = 2*root_index + 1
  right = 2*root_index + 2

  if(left < size and sublist[left] > sublist[largest]):
    largest = left
  if(right < size and sublist[right] > sublist[largest]):
    largest = right

  if(root_index != largest):
    sublist[largest], sublist[root_index] = sublist[root_index], sublist[largest]
    heapify(sublist, size, largest)


# Test Data
print(heap_sort([8, 2, 1, 4, 6, 5, 7, 3, 22, 1, 19, 3, 33, 7, -3, 111, 21, -4, 0, 99, 89]))
```

## References

* [Pseudocode Source](http://www.algorithmist.com/index.php/Heap_sort)
* [Coding Geek Implementation/Explanation](https://www.codingeek.com/algorithms/heap-sort-algorithm-explanation-and-implementation/)
* [Example Code](https://repl.it/@brandiw/HeapSort)

# Sorting Wrapup

This week, we've gone over the following sorts:

* Bucket sort
* Bubble sort
* Merge sort
* Quick sort

### Here's some more.

* [15 Sorts in 6 minutes \(warning, flashing colors\)](https://www.youtube.com/watch?v=kPRA0W1kECg)

## Why we have different sorts

* [Side by Side Comparisons](https://www.youtube.com/watch?v=ZZuD6iUe3Pc)
* [Sorting Algorithm Animations](http://www.sorting-algorithms.com/)

Find out which sort is the fastest for each type of data.

## Other sorting topics

### Stability

_What's the difference between stable and unstable sorts? Why would we want a stable sort?_

Stable sorts are sorts that preserve original order of items, when encountering two items of the same value. A good example is when sorting some people. Let's say there's an array of 4 people, represented by hashes:

```ruby
my_people = [
  {name: 'Robert', age: 23},
  {name: 'Riley', age: 35},
  {name: 'Rich', age: 43},
  {name: 'Rich', age: 28}
]
```

Sorted by age:

```ruby
my_people = [
  {name: 'Robert', age: 23},
  {name: 'Rich', age: 28},
  {name: 'Riley', age: 35},
  {name: 'Rich', age: 43}
]
```

What if I want to now sort by name? This is where stability comes into play. A stable sort will preserve the orders of the ages.

**Stable Sort**

```ruby
my_people = [
  {name: 'Rich', age: 28}, # the two Riches are ordered by age
  {name: 'Rich', age: 43},
  {name: 'Riley', age: 35},
  {name: 'Robert', age: 23}
]
```

An unstable sort may not necessary preserve the orders of the ages.

**Unstable Sort**

```ruby
my_people = [
  {name: 'Rich', age: 43}, # the two Riches are not ordered by age
  {name: 'Rich', age: 28},
  {name: 'Riley', age: 35},
  {name: 'Robert', age: 23}
]
```

### Types of sorts

**NOTE:** These are not exclusive definitions \(for example, a comparison sort can also be an adaptive sort\)

#### Comparison Sorts

Bubble sort, merge sort, and quicksort have all been examples of comparison sorts. Positions in a data structure are changed based on comparing values.

#### Distribution Sorts

Bucket sort is an example of a distribution sort, where values are grouped based on certain attributes.

#### Hybrid Sorts

Since sorts like insertion sort are faster for smaller datasets, some recursive sort algorithms can be implemented as hybrid sorts, utilizing sorts like insertion sort on smaller datasets.

