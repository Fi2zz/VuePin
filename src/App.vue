<template>
    <main class="main">
        <header>
            <h1>Vue</h1>
            <h1>Pin</h1>
        </header>
        <Pin v-model="pin"/>
        <section>
            PIN
            <br>
            {{pin.join(' ')}}
        </section>
    </main>
</template>


<style>
html,
body {
  padding: 0;
  margin: 0;
  background-color: #222;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  box-sizing: border-box;
}

main {
  width: 360px;
  margin: auto;
  padding: 44px;
  background-color: #fff;
  height: 640px;
  /*border-radius: 50%;*/
}

section {
  text-align: center;
  padding-top: 16px;
  font-size: 24px;
  font-weight: bold;
}

header {
  margin: 0;
  font-size: 24px;
  text-align: center;
  padding: 0;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1:nth-of-type(1) {
  color: #4fc08d;
  margin-right: 10px;
}

header h1:nth-last-of-type(1) {
  text-transform: uppercase;
  color: #222;
}
</style>
<script>
import Pin from "./VuePin";

export default {
  name: "App",
  components: {
    Pin
  },
  data() {
    return {
      pin: []
    };
  }
};
</script>
