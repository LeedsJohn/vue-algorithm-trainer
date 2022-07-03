<template>
  <div>
    <h1>Optimize your learning experience</h1>
    <h2>Instructions</h2>
    <ol>
      <li>Select the algorithm set you wish to learn.</li>
      <li>
        Optionally, choose the specific algorithms you are currently learning.
      </li>
      <li>
        Apply the scramble to your cube and attempt to solve it. If you
        successfully recall the algorithm, hit the spacebar. Otherwise, hit the
        "x" key. On mobile, use the red and green buttons.
      </li>
      <li>
        You can view the solution to the algorithm by clicking the scramble or pressing the enter key on your keyboard.
      </li>
    </ol>
    <h2>About</h2>
    <p class="about">
      While there are many algorithm trainers out there, this one is unique
      because it does not select algorithms to quiz you on at random. Instead,
      it uses a modified version of the
      <a href="https://en.wikipedia.org/wiki/Leitner_system" target="_blank"
        >Leitner system</a
      >
      to strategically quiz you on algorithms that you don't know more often and
      to stop quizzing you on algorithms after you've successfully recalled the
      solution several times consecutively.
    </p>
    <h2>Contact me</h2>
    <p class="contact">
      If you have any questions, comments, or are interested in hiring me,
      please email me at
      <a href="mailto:john.algtrainer@gmail.com">john.algtrainer@gmail.com</a>
      or join my <a href="https://discord.gg/AjPerMsuZM">Discord Server</a>.
    </p>
    <p>
      If you have noticed any accessibility issues, would like to see an
      algorithm set added, or have other suggestions, any feedback is greatly
      appreciated.
    </p>
    <h3>Special Thanks</h3>
    <p>This project would not have been possible without the many people who generously offered their feedback and support. In particular, I would like to thank Herbert Kociemba for allowing me to use his Rubik's Cube solver which I used to generate scrambles and AlgDb.net for providing the algorithms.</p>
  </div>
</template>

<style scoped>
div {
  padding: 0 3%;
  font-size: 0.9rem;
}

h1 {
  margin: 10px 2.5rem;
  font-style: italic;
}

h2,
h3,
p,
li {
  text-align: left;
  line-height: 1.4rem;
  padding: 0;
  margin: 0;
}

h3 {
  font-style: italic;
  margin-top: 0.7rem;
  color: #2c3e50;
}

ol {
  padding-left: 1.25rem;
  margin: 0;
  margin-bottom: 0.7rem;
}

.about {
  margin-bottom: 0.7rem;
}

.contact {
  margin-bottom: 0.35rem;
}

a {
  color: #114;
}

a:hover {
  color: #558;
}
</style>
