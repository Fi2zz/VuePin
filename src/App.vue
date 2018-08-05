<template>
    <div>
       
       <Pin @input="onchange"/> 
       {{pin}}
    </div> 
</template>

<script>
import Pin from "./VuePin";
export default {
  name: "App",
  components: {
    Pin
  },
  data() {
    return {
      pin: ""
    };
  },
  methods: {
    onchange(pin) {
      console.log(pin, "onchange");
    }
  }
};
</script>
