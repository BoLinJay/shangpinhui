<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <TodyRecommend/>
      <Rank/>
      <Like/>
      <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
      <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/ListContainer'
import TodyRecommend from '@/pages/TodyRecommend'
import Rank from '@/pages/Rank'
import Like from '@/pages/Like'
import Floor from '@/pages/Floor'
import Brand from '@/pages/Brand'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components: {
    ListContainer,
    TodyRecommend,
    Rank,
    Like,
    Floor,
    Brand,
    },
    mounted() {
      this.$store.dispatch('floorList')
      // 获取用户信息
      this.$store.dispatch('getUserInfo')
    },
    computed: {
      ...mapState({
        floorList:(state)=> state.home.floorList
      })
    }
}
</script>

<style>

</style>