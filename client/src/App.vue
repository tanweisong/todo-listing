<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-link id="home-link" @click="goTo('/')">Home</el-link>
        <el-link id="about-link" @click="goTo('/about')">About</el-link>
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import TodosService from '@/services/TodosService';
export default {
  async mounted() {
    const self = this;
    const todos = await TodosService.getTodos();

    self.$store.dispatch('setTodos', todos);
  },
  methods: {
    goTo(path) {
      const self = this;

      self.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .el-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .el-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      .el-link {
        margin-right: 1rem;
      }
    }
    .el-main {
      background-color: #f0f0f0;
      #main-container {
        & > div {
          padding: 1rem;
          border: 1px solid #e8e8e8;
          background-color: #fff;
        }
        & > div:not(:last-child) {
          border-bottom: 0;
        }
        .main-container-noitem {
          color: #b0b0b0;
        }
        .main-container-todo {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .todoDelete {
            visibility: hidden;
            &:hover {
              cursor: pointer;
            }
          }
          &:hover {
            background-color: #daf5ff;
            .todoDelete {
              visibility: visible;
            }
          }
        }
        #main-input-container {
          display: flex;
          flex-direction: row;
          .el-button {
            margin-left: 1rem;
          }
        }
      }
    }
  }
}
</style>
