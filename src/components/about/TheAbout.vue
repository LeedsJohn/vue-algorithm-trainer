<template>
  <div>
    <h1>John's Algorithm Trainer</h1>
    <h2>Instructions</h2>
    <ol>
      <li>Select the algorithm set you wish to learn.</li>
      <li>
        Optionally, choose the specific algorithms you are currently learning.
      </li>
      <li>
        Apply the scramble to your cube and attempt to solve it. If you
        successfully recall the algorithm, hit the spacebar. Otherwise, hit the
        "x" key.
      </li>
    </ol>
    <h2>About</h2>
    <p>
      While there are many algorithm trainers out there, this one is unique
      because it does not select algorithms to quiz you on at random. Instead,
      it uses a modified version of the
      <a href="https://en.wikipedia.org/wiki/Leitner_system" target="_blank"
        >Leitner system</a
      > to strategically quiz you on algorithms that you don't know more often
      and to stop quizzing you on algorithms after you've successfully recalled
      the solution several times consecutively.
    </p>
  </div>
</template>

<style scoped>
div {
  padding: 1% 3%;
  font-size: 0.9rem;
}

h1 {
  margin: 20px 2.5rem;
}

h2, p, li {
  text-align: left;
}

p, li {
  line-height: 1.5em;
}

ol {
  padding-left: 1.25em;
}

</style>
