[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Computer Science: An Introduction

[Computer science](https://en.wikipedia.org/wiki/Computer_science) as an area
of study comprises everything necessary for the design, construction, and use
of computers.

We’ve focused heavily in this program on developing the practical skills needed
to be a developer rather than the theory of computation and software systems
design. As application developers, we can do our job well by applying best
practices, but there are many reasons we should also care about classic topics
in computer science:

First, classic problems allow us to practice our problem solving abilities,
which are essential to the continual improvement of our coding skills. Second,
being familiar with the tradeoffs inherent in choosing an algorithm or a data
structure have direct parallels in choices you make writing your application
code. Lastly, having a basic understanding of these topics will help you to
communicate more effectively during interviews and with your future colleagues.

We will start by looking into the history of computer science, and focus
on one major concept, recursion, before moving on to algorithms and data structures.

## Prerequisites

- Familiarity with a high-level programming language.

## Objectives

By the end of this, developers should be able to:

- Discuss what is meant by "computer science"
- Identify some of the major moments in computer science history
- Explain recursion and write a basic recursive function

### Lab: History of Computer Science

Take 15 minutes to take a look at the following:

- [A Brief History of Computer Science (infographic)](https://www.worldsciencefestival.com/infographics/a_history_of_computer_science/)
- [Evolution of Computer Science (infographic)](https://www.visualcapitalist.com/history-computer-science-one-infographic/)
- [History of Computing (detailed article)](https://www.britannica.com/technology/computer/History-of-computing)

In your teams, identify an event you find interesting and research it as a group.

Pick a spokesperson and answer the following questions to present to the class:

- What is the event? When? Who?
- How was this event influential? What other events relied on this event happening?
- Why do you find this interesting? Are there any interesting tidbits?

## Recursion

[Recursion](./recursion.md#recursion) is when a
function calls itself.

Think about an automated guessing game where a program guesses a number between
1 and 100. The algorithm (or set of rules) for guessing the right answer
might look like the following:

1. Choose a number between 1 and 100.
2. Check if it's the right answer. If correct, exit.
3. If incorrect, go back to step 1.

Notice how our algorithm calls itself. You are solving a large problem by
solving many small problems. You use recursion because the small problems are
all solved with the same method.

A recursive function will achieve a small part of a larger task, then pass the
partially completed problem to another call of itself. It’s just another way
of breaking down a large problem into smaller bits.

To write recursive functions, we need to plan for a stopping point
so that our function doesn't just continue to call itself forever. This is
called a **base case**.

> **Base case**: the case in which the solution is obtained directly

In addition to our base case, we will also have the **recursive case**.

> **Recursive case**: the case in which the method calls itself (recurs)

Finally, we need an **action** which would be whatever the function is doing.

Let's have a look at our recursive algorithm again and answer the following
questions together:

- What is our **base case**?

- What is our **recursive case**?

- What are the **actions?**

### Code-along: Iterate Recursively

We've seen how to iterate in the past using `for` loops. The example below shows
how we might print all of the numbers from 0 to 9:

```js
  const target = 10

  for (let i = 0; i < target; i++) {
    console.log(i)
  }

  console.log("We've reached the end")
```

Let's try doing this together, but with **recursion** instead!

### Lab: Recursively Reverse A String

Take a look at the following function that recursively reverses a string:

```js
const word = 'star'
const reverseString = str => {
  if (str === '') {
    // console.log('???')
    return ''
  } else {
    const firstCharacter = str.charAt(0)
    const remainingString = str.substr(1)

    // console.log(`${firstCharacter}: ${str} (string passed in)`)
    const returnValue = reverseString(remainingString) + firstCharacter
    // console.log(`${firstCharacter}: ${returnValue} (returned string)`)

    return returnValue
  }
}
reverseString(word)
```

In your teams, identify the following:

- What is the **base case**?
- What is the **recursive case**?
- What is the **action**?

### Lab: Recursive Steps

Take a look at the above code and figure out how it's working. Talk about it
with your team, draw diagrams, and especially try running it in node!

If you are having trouble identifying what each variable is at each step, try
uncommenting the `console.log` statements (and maybe add a few more of your own!).

Identify any questions you have about this process and be ready to discuss your
understanding of it with the class.

A note about stacks:

This series of method calls builds up the **call stack**. Think of a stack as
a stack of lunch trays, with each tray going on top of the previous. Each time
our recursive routine calls itself (the recursive case), the return value gets
added to the top of the stack. You will finally hit the end (your base case),
and then get all the return values, from the top of the stack down to the
bottom.

Now, as a squad, answer these questions:

- What are the drawbacks of recursive code, if any?

- What must you have in recursive code to eventually stop recursion?

- What is a stack overflow?

## Additional Resources

- [Basics of CS](https://medium.com/basecs)
- [Teach Yourself Computer Science](https://teachyourselfcs.com/)
- [CS Cheat Sheets](https://github.com/aspittel/coding-cheat-sheets)
- [Design Patterns](https://sourcemaking.com/design_patterns)
- [Memoization and Alternatives in Ruby](https://thoughtbot.com/blog/ruby-memoization-and-alternatives)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
