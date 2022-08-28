<!-- 拖拽滑动 -->
<template>
  <div id="default_drag_comp"
    @click="goNext"
    @touchstart="down"
    @touchmove="move"
    @touchend="end"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "defaultDrag",
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },

  methods: {
    goNext() {
      this.$emit("goNext");
    },
    // 实现移动端拖拽
    down(event) {
      const default_drag_comp = document.querySelector("#default_drag_comp");
      this.flags = true;
      let touch;
      if (event.touches) {
        [touch] = event.touches;
      } else {
        touch = event;
      }
      this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth;
      this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight - 50;

      this.position.x = touch.clientX - default_drag_comp.offsetLeft;
      this.position.y = touch.clientY - default_drag_comp.offsetTop;
      this.dx = touch.clientX;
      this.dy = touch.clientY;
    },
    move(event) {
      event.preventDefault();
      const default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        let touch;
        if (event.touches) {
          [touch] = event.touches;
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 0) {
          this.ny = 120;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
        }

        default_drag_comp.style.left = `${this.nx}px`;
        default_drag_comp.style.top = `${this.ny}px`;
        // 阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          () => {
            // event.preventDefault();
          },
          false
        );
      }
    },
    // 鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  }
};
</script>
<style scoped lang="less">
#default_drag_comp {
  width: 100px;
  height: 40px;
  position: fixed;
  z-index: 1000;
  bottom: 130px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
