# Linked Lists

A linked list a data structure, used for fast and memory-efficient insertions and deletions. Unlike arrays, which are single objects, a linked list is a collection of _**node**_ objects that are linked via _**pointers**_ aka _references_.

## Nodes

Each _**node**_ is an object that has the following properties:

* **data** \(sometimes called _item_\): the piece of data to be stored
* **next**: the location of the next node in the list
* **previous** _\(optional\)_: the location of the previous node in the list, if it is a _**doubly linked**_ list

## Singly vs. Doubly Linked Lists

Singly linked lists only have references to the next item in the list, so they look like this:

![http://www.lisha.ufsc.br/teaching/sce/ine6511-2003-2/work/gp/lists\_files/image001.gif](http://www.lisha.ufsc.br/teaching/sce/ine6511-2003-2/work/gp/lists_files/image001.gif)

While doubly linked lists _also_ have references to the previous node, so they look like this:

![https://www.java2blog.com/wp-content/uploads/2017/09/DoublyLinkedList.png](https://www.java2blog.com/wp-content/uploads/2017/09/DoublyLinkedList.png)

## Wait, why not use arrays instead?

In lower level languages, arrays are allocated in **blocks.** Therefore, arrays are static in size and can only hold a specific data type. Linked lists store data in the **heap**, meaning that the data can be stored in an unorganized manner. Since each node points to the next one, it's still possible to maintain the list structure.

## Heads or tails?

To indicate the start and end of the list, we call the first node the _**head**_ and the last node the **\*tail**. The head node doesn't have another node pointing to it, and the tail node doesn't point anywhere \(in code, this looks like setting `next` to `null` or the equivalent\).

![https://hackernoon.com/hn-images/1\*GOKmkucFHN\_gmTMUtyC2sQ.png](https://hackernoon.com/hn-images/1*GOKmkucFHN_gmTMUtyC2sQ.png)

There is also such a thing as a _**circular linked list**_ which doesn't have a true head or tail, though you can designate a head and/or tail if it makes sense in your application of the list:

![https://static.packt-cdn.com/products/9781783554874/graphics/4874OS\_05\_18.jpg](https://static.packt-cdn.com/products/9781783554874/graphics/4874OS_05_18.jpg)

When coding a linked list, you will generally have a `Node` objects to represent each piece of data \(and the pointers\), as well as a `LinkedList` object that stores the head, tail, and all of the list's functionality \(which will be dependent on what type of linked list it is and how you plan to use it\).


## Let's start with the basics

Here we'll use object-oriented programming to build a basic linked list in python. We'll need a `Node` class and a `LinkedList` class.

## Node

```python
class Node:
    # constructor
    def __init__(self, data, next):
        self.data = data
        self.next = next

    def __str__(self): # tell python how to print this node
        return str(self.data)
```

_**Challenge:**_ How would you modify this code to accomodate a doubly linked list? \(This is currently only set up for a singly-linked list.\)

## LinkedList

Properties and basic functionality we'll include:

* head
* tail
* length \(how many nodes in the list\)
* `__len__` \(return the length of the list\)
* `__str__` \(return a string representation of the list\)

```python
class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    # returns length of the list
    def __len__(self):
        return self.size

    def __str__(self):
        if self.size == 0:
            return '[]'

        current = self.head
        result = str(current) # what we return once we've concantenated all the nodes to it
        while current.next:
            result += f' -> {str(current.next)}'
            current = current.next
        return f'[{result}]'
```

This is great and all, but how we need to actually load our list with nodes, which means we need to add some functionality to our `LinkedList` class that allows us to add nodes to our list!

## Node Transactions

_\(This lesson assumes you already have the code from the_ [_basics lesson_](https://gawdiseattle.gitbook.io/wdi/08-cs/intro/basics)_\)_

In order to actually _**use**_ our LinkedList class, we'd better have a way to add nodes to a list! Let's add the following methods:

* `insert_front`
* `insert_end`
* `insert_after`

## insert\_front

In order to insert a node at the beginning of our list, we need to:

* create a new node
* insert the node \(three cases\)
* increment the length of the list

Note that there are three different possible cases:

* the list is currently empty
* the list has only one node
* the list has more than one node

```python
    # insert a new Node at the front of the list
    def insert_front(self, data):
        if self.size == 0: # list is empty
            # do something
        elif self.size == 1: # there is one node already in the list
            # do something else
        else:
            # do something else
        self.size += 1
```

What does inserting a new node at the beginning of the list look like for each of these cases?

```python
    def insert_front(self, data):
        if self.size == 0: # list is empty
            self.head = Node(data, None) # create a new node and make it the head
            self.tail = self.head # also set the tail to the same node
        elif self.size == 1:
            self.head = Node(data, self.tail)
        else:
            temp = self.head
            self.head = Node(data, temp)
        self.size += 1
```

Test it!

```python
myList = LinkedList()
myList.insert_front('Taylor')
myList.insert_front('Dave')
myList.insert_front('Anna')
```

```text
[Anna -> Dave -> Taylor]
3
```

## Exercise: insert\_end

Try writing an `insert_end` method that adds a new node to the **end** of a linked list.

#### Solution:

```python
    def insert_end(self, data):
        if self.size == 0:
            self.head = Node(data, None)
            self.tail = self.head
        else:
            temp = self.tail
            self.tail = Node(data, None)
            temp.next = self.tail
        self.size += 1
```

**Test**:

```python
myList = LinkedList()
myList.insert_front('Taylor')
myList.insert_front('Dave')
myList.insert_front('Anna')
myList.insert_end('King')
print(myList)
print(len(myList))
```

```text
[Anna -> Dave -> Taylor -> King]
4
```

## insert\_after

Let's say we want to insert `Gavin` after `Anna` in the list. How would we do this?

### Find the reference node and store it

We would first certainly need a reference to the `Anna` node, which means we have to start at the `head` and iterate through the list until we find her! Once we find the `Anna` node, we'll store it in a holder variable called `temp`:

```python
    def insert_after(self, data, node_data):
        temp = None
        current = self.head
        while current:
            if current.data == node_data:
                temp = current
                break
            current = current.next
```

We should also handle the case in which we _didn't_ find the `Anna` node:

```python
    def insert_after(self, data, node_data):
        temp = None
        current = self.head
        while current:
            if current.data == node_data:
                temp = current
                break
            current = current.next
        if temp == None:
            return 'check your node_data, we couldn\'t find it!'
```

Assuming we _do_ find the node we're looking for, which should now be stored in `temp`, we can create the new node, make it point to the node that comes after `temp`, then reassign `temp` to point to the new node:

```python
    def insert_after(self, data, node_data):
        temp = None
        current = self.head
        while current:
            if current.data == node_data:
                temp = current
                break
            current = current.next
        if temp == None:
            return 'check your node_data, we couldn\'t find it!'
        newNode = Node(data, temp.next)
        temp.next = newNode
        self.size += 1
```

Test it!

```python
myList = LinkedList()
myList.insert_front('Taylor')
myList.insert_front('Dave')
myList.insert_front('Anna')
myList.insert_end('King')
myList.insert_after('Gavin', 'Anna')
myList.insert_after('Nick', 'King')
print(myList)
print(len(myList))
```

```text
[Anna -> Gavin -> Dave -> Taylor -> King -> Nick]
6
```

## Bonus Challenge: insert\_before

Try implementing an `insert_before` method!
