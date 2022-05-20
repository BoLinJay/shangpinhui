<template>
  <div>
      <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="imgList in List" :key="imgList.id">
                <img :src="imgList.imgUrl" alt="">
                </div>
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
export default {
    name:'Carousel',
    props:['List'],
    mounted() {
        // 轮播图swiper
         const swiper = new Swiper('.swiper', {
                        // Optional parameters
                        direction: 'horizontal',
                        // loop: true,
                         autoplay: {
                            delay: 3000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },

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
    },
}
</script>

<style>

</style>