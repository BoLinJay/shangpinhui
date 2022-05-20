<template>
  <div class="swiper" onselectstart="return false;">
    <div class="swiper-wrapper">
      <div class="swiper-slide swiper-no-swiping "  v-for="img,index in skuImageList" :key="img.id" @click="clickImg(img)"> 
        <img :src="img.imgUrl" :class="{active:activeImg == index}" @click="indexImg(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    data() {
      return {
        activeImg:0
      }
    },
    methods: {
        clickImg(img) {
          // console.log(img.imgUrl);
          this.$bus.$emit('url',img.imgUrl)
        },
        indexImg(index) {
            this.activeImg = index
        }
    },
    watch: {
      skuImageList() {
      this.$nextTick(()=> {
          // 轮播图swiper
        const swiper = new Swiper('.swiper', {
                      // Optional parameters
                      direction: 'horizontal',
                      loop: true,
                      slidesPerView: 3,
                      noSwiping: true,
                      // If we need pagination
                      pagination: {
                          el: '.swiper-pagination',
                          clickable :true,
                      },

                      // Navigation arrows
                      navigation: {
                          nextEl: '.swiper-button-next',
                          prevEl: '.swiper-button-prev',
                      },
                      // And if we need scrollbar
                      });
      })
    }
      }
  }
</script>

<style lang="less" scoped>
  .swiper {
    height: 56px;
    width: 400px;
    box-sizing: border-box;
    padding: 0 12px;
    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 1px;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>