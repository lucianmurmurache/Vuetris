<template>
  <div class="player">
    <div
      :style="{
        height: height * cellSize + 'px',
        width: width * cellSize + 'px',
      }"
      class="game"
    >
      <ground
        :stage="stage"
        ref="ground"
        class="ground"
        @clearRow="clearRow"
        @clearAll="clearAll"
      />
      <!-- ==Shadow== -->
      <block
        v-if="curBlock"
        :init="curBlock"
        :stage="stage"
        ref="shadow"
        :shadow="true"
      />
      <!-- ==Tetromino== -->
      <block
        v-if="curBlock"
        :init="curBlock"
        :stage="stage"
        ref="block"
        :key="curBlock.id"
      />
    </div>
    <!-- == Next tetromino== -->
    <div class="panel">
      <h2 class="nextText">Next block</h2>
      <div class="nextBox">
        <block
          v-if="nextBlock"
          :init="nextBlock"
          :stage="stage"
          class="next"
          :style="nextBlockStyle"
          :key="nextBlock.id"
        />
      </div>
      <!-- ==User data== -->
      <div class="score">
        <div class="row">
          <!-- ==Score== -->
          <h4 class="title">Score:</h4>
          <span>{{ score | numberComma }}</span>
        </div>
        <div class="row">
          <!-- ==Level== -->
          <h4 class="title">Level:</h4>
          <span>{{ level | numberComma }}</span>
        </div>
        <div class="row">
          <!-- ==Rows== -->
          <h4 class="title">Rows:</h4>
          <span>{{ rowCleared | numberComma }}</span>
        </div>
      </div>
      <div class="buttons">
        <!-- ==Resume || Pause== -->
        <button v-if="state.playing" @click="pause">
          {{ state.pause ? "Resume" : "Pause" }}
        </button>
        <!-- ==Game over ? || Start== -->
        <button v-else @click="start" autofocus>
          {{ state.gameover ? "Restart" : "Start" }}
        </button>
        <!-- ==Sound || Mute== -->
        <button @click="muteSound">
          {{ this.muted ? "&#128263;" : "&#128266;" }}
        </button>
      </div>
      <h2 class="state">{{ stateText }}</h2>
    </div>
  </div>
</template>

<script>
import block from "./block.vue"; /* Not ready */
import ground from "./ground.vue"; /* Also not ready */
import stageComputed from "./stageComputed"; /* Has no errors so far */
import soundService from "./soundService/soundService.mjs"; /* Not tested */

let blockId = 0;
export default {
  name: "player",
  props: ["stage", "keys"],
  mixins: [stageComputed, soundService],
  data() {
    return {
      curBlock: null,
      nextBlock: null,
      actionOf: {},
      tickInterval: 0,
      rowCleared: null,
      level: null,
      score: null,
      state: null
    };
  },
  computed: {
    tickTime() {
      return Math.max(11 - this.level, 1) * 50;
    },
    nextBlockStyle() {
      return {
        left: `calc(50% - ${this.cellSize}px)`,
        top: `calc(50% + ${this.cellSize}px)`
      };
    },
    canPlay() {
      let { gameover, pause, playing } = this.state;
      return !gameover && !pause && playing;
    },
    stateText() {
      let { gameover, pause } = this.state;
      if (gameover) return "Good Game!";
      if (pause) return "Paused";
      return "";
    }
  },
  created() {
    _.forEach(this.keys, (v, k) => this.$set(this.actionOf, v, k));
    window.addEventListener("keydown", this.keydown);
    this.reset();
  },
  methods: {
    reset() {
      Object.assign(this, {
        rowCleared: 0,
        level: 0,
        score: 0,
        state: { playing: false, gameover: false, pause: false }
      });
    },
    playBgm(type = `bgm${(this.level % 4) + 1}`, isRepeat = true) {
      // Music
      this.playSound(type, isRepeat);
    },
    playFX(name) {
      // Sound effects
      this.playEffect(name);
    },
    start() {
      if (this.state.playing) return;
      this.reset();
      this.$refs.ground.reset();
      this.createNextBlock();
      this.next();
      this.state.playing = true;
      this.playBgm();
    },
    tick() {
      if (!this.canPlay) return;
      this.move(0, -1);
    },
    setTick() {
      this.tickInterval = setInterval(this.tick, this.tickTime);
    },
    clearTick() {
      this.tickInterval = clearInterval(this.tickInterval);
    },
    resetTick() {
      this.clearTick();
      this.setTick();
    },
    clearRow(n) {
      this.rowCleared += n;
      this.getScore([0, 40, 100, 300, 1200][n] * (this.level + 1));
      this.level = Math.floor(this.rowCleared / 10);
      this.playFX("lineClear");
    },
    clearAll() {
      this.getScore(3000 * (this.level + 1));
    },
    keydown($event) {
      if ($event.keyCode === 32) $event.preventDefault();
      if (!this.state.playing) return;
      if ($event.keyCode === 27) return this.pause();
      if (!this.canPlay) return;
      switch (this.actionOf[$event.keyCode]) {
        case "straight":
          this.moveStraight();
          $event.preventDefault();
          break;
        case "left":
          this.move(-1, 0);
          $event.preventDefault();
          break;
        case "rotate":
          this.rotate();
          $event.preventDefault();
          break;
        case "right":
          this.move(1, 0);
          $event.preventDefault();
          break;
        case "down":
          this.move(0, -1);
          this.resetTick();
          $event.preventDefault();
          break;
      }
    },
    pause() {
      if (this.state.pause) {
        this.state.pause = false;
        this.resumeSound();
        this.setTick();
      } else {
        this.state.pause = true;
        this.pauseSound();
        this.clearTick();
      }
      this.$emit("pause", this.state.pause);
    },
    pushBlock() {
      let { block, ground } = this.$refs;
      this.getScore(3 * (this.level + 1));
      let allPushed = ground.push(block.cells);
      this.curBlock = null;
      allPushed ? this.next() : this.gameover(); // Check "gameover?"
      this.playFX("drop");
    }
  },
  watch: {
    level(v) {
      v && this.playBgm();
    }
  },
  destroyed() {
    window.removeEventListener("keyodwn", this.keydown);
  },
  components: { ground, block }
};
</script>

<style scoped>
.player {
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  display: inline-block;
  background-image: url("../../public/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px;
  color: #fff;
  border: solid 2px #000;
  border-radius: 10px 10px 100px 10px;
}

/* ====================To do next==================== */
/**
.game
.buttons
.next
.score
.state
*/
</style>
