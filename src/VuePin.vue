
<template>
        <div class="vue-pin">
                <input type="number" 
                v-for="(item,index) in size" 
                :key="index" 
                min="0"
                max="9"
                @input="onInput($event,index)"
                @keyup="onKeyPress($event,index)"
                @click="onItemClick(index)"
                @blur="onBlur(index)"
                @focus="onFocus(index)"
                :id="createId(index)"
                :readonly="readOnly[index]"
                 />
        </div>
</template>


<style>
.vue-pin {
  font-size: 0;
  text-align: center;
}

.vue-pin input {
  width: 44px;
  height: 44px;
  -webkit-appearance: none;
  text-align: center;
  line-height: 44px;
  padding: 0;
  margin: 0;
  border: 1px #ccc solid;
  border-right: none;
  outline: none;
  font-size: 16px;
  font-weight: bold;
}
.vue-pin input:nth-last-of-type(1) {
  border-right: 1px #ccc solid;
}

.vue-pin input::-webkit-inner-spin-button,
.vue-pin input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


<script>
export default {
  name: "VuePin",
  props: {
    size: {
      type: Number,
      default: 6
    },
    immediate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      values: {},
      readOnly: {},
      refsMap: {}
    };
  },
  watch: {
    values: {
      deep: true,
      //   immediate: true,
      handler(values) {
        let size = this.size;

        let value = Object.keys(values)
          .map(item => values[item])
          .filter(item => !!item);

        if (this.immediate && value.length > 0) {
          this.$emit("input", value);
        } else if (value.length === 6) {
          this.$emit("input", value);
        }

        console.log(values, value);
      }
    }
  },
  methods: {
    createId(index) {
      return `vue-pin-item_${index}`;
    },
    getHTMLNode(id) {
      return document.getElementById(id);
    },
    onInput(event, index) {
      let nextIndex = index + 1;
      let lastIndex = this.size - 1;
      let text = event.target.value;
      console.log(text);
      if (text) {
        this.$set(this.values, index, text);
        if (nextIndex <= lastIndex) {
          this.updateNode(nextIndex, el => el.focus());
        }
      }
    },
    onFocus(index) {
      console.log(index, "focus");
      this.$set(this.values, index, "");
      console.log("values", JSON.stringify(this.values, null, 2));
    },
    onBlur(index) {
      this.$set(this.readOnly, index, true);
    },
    onItemClick(index) {
      this.$set(this.readOnly, index, false);
    },
    onKeyPress(event, index) {
      if (event.key === "Backspace") {
        this.$set(this.values, index, "");
        const nextIndex = index > 0 ? index - 1 : 0;
        this.$set(this.readOnly, nextIndex, false);
        if (!this.values[index]) {
          this.updateNode(nextIndex, el => el.focus());
        }
      }
    },
    updateNode(index, next) {
      this.$nextTick(() => {
        let nextInputElId = this.createId(index);
        let nextInputEl = this.getHTMLNode(nextInputElId);
        next(nextInputEl);
      });
    }
  }
};
</script>



