<template>
  <div class="main">
    <div class="py-container">
      <TypeNav></TypeNav>
    <!--details-->
      <Details 
       v-if="isShow"
      :goodsList="goodsList" 
      :trademarkList="trademarkList" 
      :attrsList="attrsList"
       />
  <!-- Hotsale -->
      <Hotsale/>
    </div>
  </div>
</template>

<script>
import Details from '@/pages/Search/Details' 
import Hotsale from '@/pages/Search/Hotsale' 
import {mapGetters} from 'vuex'
export default {
    name:'Search',
    data() {
      return {
        isShow:0,
      }
    },
    components:{Hotsale,Details},
    methods: {
       searchGet() {
            this.$store.dispatch('searchList',this.searchParams)
        },
        clearUndefined() {
          let timer = setInterval(() => {
              if(this.goodsList != undefined) {
                this.isShow = 1
                clearInterval(timer)
              }
          }, 600);
        }
    },
    computed:{
      ...mapGetters(['goodsList','trademarkList','attrsList']),
    },
    created() {
        this.searchGet()
    },
    mounted() {
     this.clearUndefined()
    },
}
</script>

<style lang="less" scoped>
.main{
        margin: 10px 0;
        .py-container{
            width: 1200px;
            margin: 0 auto;
        }
}
</style>
