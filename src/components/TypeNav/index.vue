<template>
    <div class="type-nav" @mouseleave="leaveShow">
            <div class="container" @mouseleave="leaveIndex" >
                <h2 class="all" @mouseenter="enterShow" >全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <div class="sort" v-show="cut" >
                    <div class="all-sort-list2" @click="goSearch" >
                        <div class="item" v-for="(C1,index) in categoryList" :key="C1.categoryId" :class="{cur:InitId == index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a href="javaScript:;" :data-categoryName="C1.categoryName" :data-category1Id="C1.categoryId">{{C1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:InitId == index?'block':'none'}">
                                <div class="subitem" v-for="C2 in C1.categoryChild" :key="C2.categoryId">
                                    <dl class="fore"> 
                                        <dt>
                                            <a href="javaScript:;" :data-categoryName="C2.categoryName" :data-category2Id="C2.categoryId">{{C2.categoryName}} </a>
                                        </dt>
                                        <dd>
                                            <em v-for="C3 in C2.categoryChild" :key="C3.categoryId" >
                                                <a href="javaScript:;" :data-categoryName="C3.categoryName" :data-category3Id="C3.categoryId"> {{C3.categoryName}} </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- 商品分类导航 -->
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data() {
        return {
            index:0,
            InitId: -1,
            cut:true
        }
    },
    methods: {
        enterShow() {
            if(this.$route.name === 'Search') {
                this.cut = true
            }
        },
        leaveShow() {
            if(this.$route.name === 'Search') {
                this.cut = false
            }
        },
        changeIndex:throttle(function(index) {
            this.InitId = index
        },60),
        leaveIndex() {
            this.InitId = -1
        },
        goSearch(event) {
               let {categoryname,category1id,category2id,category3id} = event.target.dataset
               if(categoryname){
                   let location = {
                       name:'Search'
                       }
                   let query = {categoryName:categoryname}
                   if(category1id){
                       query.category1Id = category1id
                   } else if(category2id) {
                       query.category2Id = category2id
                   }else if(category3id) {
                       query.category3Id = category3id
                   }
                    location.query = query
                    
                    this.$router.push(location)
                    this.cut = false
               }
        },
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        }),
    },
    mounted() {
        this.$store.dispatch('categoryList')
        this.cut = this.$route.path !== '/home' ? false : true
    },
  
}
</script>

<style lang="less" scoped>
.nav-enter-active {
    animation: nav .6s linear
}
.nav-leave-active {
    animation: nav .6s linear reverse
}
@keyframes nav {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                                outline:none;
                                background:none
                            }
                        }
                        .cur {
                            background-color: skyblue;
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                    .cur {
                            background-color: skyblue;
                        }

                }
            }
        }
    }
</style>