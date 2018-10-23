<template>
    <div class="vue-pin" :style="{width:`${size*45+2}px`}">


        <div class="input"
             v-for="(item,index) in nodes"
             :key="item"
             :class="{active:!readonly[index]}"
        >

            <div class="display">{{values[index]}}</div>
            <input type="number"
                   min="0"
                   max="9"
                   @input="onInput($event,index)"
                   @keyup.backspace="onBackspace(index)"
                   @click="onClick(index)"
                   @focus="onFocus(index)"
                   :id="item"
                   :readonly="readonly[index]"
                   :value="values[index]"
                   :autofocus="parseInt(index)===0"
            />
        </div>
    </div>
</template>


<style>
.vue-pin * {
  box-sizing: border-box;
}

.vue-pin {
  box-sizing: border-box;
  font-size: 0;
  text-align: center;
  margin: auto;
  position: relative;
}

.vue-pin .input {
  width: 44px;
  height: 44px;
  display: inline-block;
  vertical-align: top;
  border: 1px #ccc solid;
  border-right: none;
  position: relative;
  z-index: 9;
}

.vue-pin .input .display {
  font-size: 16px;
  font-weight: bold;
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 43px;
}

.vue-pin .input.active {
  border-color: orange;
  border-right: 1px orange solid !important;
}

.vue-pin .input.active + div {
  border-left: none;
}

.vue-pin input {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  height: 44px;
  -webkit-appearance: none;
  text-align: center;
  line-height: 44px;
  padding: 0;
  margin: 0;

  border: none;
  border-radius: 0;
  outline: none;
  cursor: none;
  font-size: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}

.vue-pin .input:nth-last-of-type(1) {
  border-right: 1px #ccc solid;
}

.vue-pin input[readonly="readonly"] {
  outline: none;
}

.vue-pin input::-webkit-inner-spin-button,
.vue-pin input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


<script>
let idGenerator = id => `vue-pin-item_${id}`;

let getNode = id => document.getElementById(idGenerator(id));

let delay = (fn, time = 0) => {
  let timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, time);
};

const updateNode = el => next => el && next(el);

const DOMUpdater = (index, next) =>
  delay(() => updateNode(getNode(index))(next), 5);

export default {
  name: "VuePin",
  props: {
    size: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      values: {},
      readonly: {},
      nodes: {}
    };
  },
  watch: {
    readonly: {
      immediate: true,
      deep: true,
      handler(readonly) {
        let notReadonlyIndex = -1;
        for (let index in readonly) {
          let value = readonly[index];
          if (value === false) {
            notReadonlyIndex = index;
          }
        }
        DOMUpdater(notReadonlyIndex, el => el.focus());
      }
    },
    size: {
      immediate: true,
      handler(size) {
        for (let i = 0; i < size; i++) {
          this.nodes[i] = idGenerator(i);
          this.$set(this.nodes, i, idGenerator(i));
          this.$set(this.readonly, i, i !== 0);
          this.$set(this.values, i, "");
        }
      }
    },
    values: {
      deep: true,
      immediate: true,
      handler(values) {
        let value = Object.keys(values)
          .map(item => values[item])
          .filter(item => !!item);
        this.$emit("input", value);
      }
    }
  },

  methods: {
    checkIndex(index) {
      index = parseInt(index);

      let lastIndex = index === this.size - 1;
      let firstIndex = index === 0;

      return {
        index,
        next: lastIndex || firstIndex
      };
    },
    onInput(event, index) {
      index = parseInt(index);
      let nextIndex = parseInt(index) + 1;
      let text = event.target.value;
      if (text) {
        text = text.length >= 2 ? text.substr(1, 1) : text;
        this.readonly[index] = true;
        if (nextIndex !== this.size) {
          this.readonly[nextIndex] = false;
        }
        this.values[index] = text;
      }
    },

    onFocus(index) {
      let check = this.checkIndex(index);
      if (check.next) {
        this.readonly[index] = false;
        delay(() => {
          let node = getNode(index);
          node && node.select();
        });
      }
    },

    cleanFocus() {
      for (let index in this.readonly) {
        this.readonly[index] = true;
      }
    },
    onClick(index) {
      if (!this.values[index]) {
        return;
      }

      this.cleanFocus();
      this.readonly[index] = false;
    },

    onBackspace(index) {
      index = parseInt(index);
      let value = this.values[index];
      if (value) {
        this.values[index] = "";
        this.readonly[index] = false;
      } else {
        let prevIndex = index - 1;
        if (prevIndex < 0) {
          return;
        }
        this.readonly[index] = true;
        this.values[prevIndex] = "";
        this.readonly[prevIndex] = false;
        DOMUpdater(index, el => el.blur());
      }
    }
  }
};
</script>
