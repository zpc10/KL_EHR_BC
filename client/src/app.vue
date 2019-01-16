<style src="./app.css"></style>
<template>
  <div id="app">
      <vue-progress-bar></vue-progress-bar>
      <el-container>
          <el-main>
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
                <router-view></router-view>
            </transition>
          </el-main>
          <el-footer>
             <p>Copyright &copy; 2018-2019 KeLu . All rights reserved.</p>
          </el-footer>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

