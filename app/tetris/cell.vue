<template>
  <div :style="style" :class="display" class="cell"></div>
</template>

<script>
import stageComputed from "./stageComputed";

export default {
  name: "cell",
  props: ["stage", "data", "pos"],
  mixins: [stageComputed],
  computed: {
    display() {
      return this.data.class;
    },
    style() {
      return {
        width: this.cellSize + "px",
        height: this.cellSize + "px",
        left: this.pos[0] * this.cellSize + "px",
        bottom: this.pos[1] * this.cellSize + "px"
      };
    }
  }
};
</script>

<style scoped>
.cell {
  position: absolute;
  border-width: 3px;
  border-style: outset;
  box-sizing: border-box;
  border-left-color: rgba(255, 255, 255, 0.4);
  border-top-color: rgba(255, 255, 255, 0.4);
}
.cell.I {
  background-color: #111;
  border-right-color: #111;
  border-bottom-color: #111;
}
.cell.O {
  background-color: #222;
  border-right-color: #222;
  border-bottom-color: #222;
}
.cell.T {
  background-color: #333;
  border-right-color: #333;
  border-bottom-color: #333;
}
.cell.S {
  background-color: #444;
  border-right-color: #444;
  border-bottom-color: #444;
}
.cell.Z {
  background-color: #555;
  border-right-color: #555;
  border-bottom-color: #555;
}
.cell.J {
  background-color: #666;
  border-right-color: #666;
  border-bottom-color: #666;
}
.cell.L {
  background-color: #777;
  border-right-color: #777;
  border-bottom-color: #777;
}
</style>
