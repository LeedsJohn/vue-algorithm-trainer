<template>
  <base-foreground v-if="show" @close="toggleShow" type="screen">
    <h2>Instructions</h2>
    <ol>
      <li>
        Select the algorithms you want to learn using the "Select Algorithms"
        button in the top right
      </li>
      <li>Apply the scramble to your Rubik's cube</li>
      <li>Attempt to solve the case</li>
      <li>
        If you remember the algorithm, press the spacebar. If you make a
        mistake, press the "x" key on your keyboard. On mobile, press the red /
        green buttons at the bottom.
      </li>
      <li>
        If you want to see the solution, either press the "enter" key or click
        the scramble
      </li>
    </ol>
    <p class="more-info">
      Click the question mark in the bottom left corner to learn what makes this
      website efficient for learning and for more information. Thank you for
      visiting my website, and good luck!
    </p>
    <p class="name">
      - John (<a class="email" href="mailto:john.algtrainer@gmail.com"
        >john.algtrainer@gmail.com</a
      >)
    </p>
  </base-foreground>
</template>

<script>
export default {
  created() {
    this.shouldShow();
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    /**
     * Show the instructions page if the user has not visited in over 30 days.
     */
    shouldShow() {
      const today = new Date();
      if (!localStorage["lastVisit"]) {
        localStorage["lastVisit"] = today.toDateString();
        this.show = true;
        return;
      }
      const lastVisit = new Date(localStorage["lastVisit"]);
      const msSinceVisit = today.getTime() - lastVisit.getTime();
      localStorage["lastVisit"] = today.toDateString();
      const daysSinceVisit = Math.ceil(msSinceVisit / (1000 * 60 * 60 * 24));
      this.show = daysSinceVisit > 30;
    },
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
ol {
  margin-left: 0.8rem;
  margin-right: 0.8rem;
}

li {
  text-align: left;
  padding-bottom: 0.4rem;
}

.more-info,
.name {
  text-align: left;
  margin-left: 1.6rem;
  margin-right: 1.2rem;
}

.more-info {
  margin-bottom: 0;
}

.name {
  margin-left: 3rem;
  margin-top: 1rem;
}

.email {
  color: #114;
}

.email:hover {
  color: #337;
}
</style>
