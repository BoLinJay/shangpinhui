<template>
  <div class="cart" v-if="show">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="list in cartInfoList" :key="list.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="list.isChecked" @change="upDataChecked(list,$event)"> 
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl">  
            <div class="item-msg">{{list.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{list.skuPrice}} </span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('jian',-1,list)" >-</a>
            <input autocomplete="off" type="text" :value="list.skuNum" class="itxt"  @change="handle('put',$event.target.value*1,list)">
            <a href="javascript:void(0)" class="plus" @click="handle('jia',1,list) " >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{list.skuPrice * list.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteList(list.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allCheckeds">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteChecked()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney" >{{totalPrices}} </i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import _ from 'lodash'
  export default {
    name: 'ShopCart',
    data() {
      return {
        show:0,
      }
    },
    methods: {
      // 进入结算页面
      goTrade() {
        this.$router.push({
          name:'Trade'
        })
      },
      // 购物车选中状态改变
      upDataChecked:_.throttle(async function(list,event) {
        let isChecked = event.target.checked ? '1' : '0'
        try {
           await this.$store.dispatch('reviseList',{
             skuId:list.skuId, 
             isChecked
             })
           this.getCartList()
        } catch (error) {
            console.log(error);
        }
      },600),    
        // 删除选中的
      async deleteChecked() {
        try {
            await this.$store.dispatch('deleteAllList')
            this.getCartList()
        } catch (error) {
            console.log(error);
        }

       
      },
      // 删除操作
      async deleteList(skuId) {
          try {
              await this.$store.dispatch('deleteCart',skuId)
              this.getCartList()
          } catch (error) {
            console.log(error);
          }
      },
      // 购物车数量操作
      handle: _.throttle(async function(type,value,list){
              switch (type) {
              case 'jia':
                  value = 1; break;
              case 'jian':
                value = list.skuNum > 1 ? -1 : 0; break;
              case 'put':
                if(isNaN(value) || value < 1) {
                  value = 0
                } else {
                  value = parseInt(value) - list.skuNum
                }; 
                break;
                }
              try {
                await this.$store.dispatch('addShopCarts',{skuId:list.skuId,skuNum:value})
                this.getCartList()
              } catch (error) {
                console.log(error);
              }
            },600),
      getCartList() {
          this.$store.dispatch('cartList')
      },
      clearUndefined() {
       let timer = setInterval(() => {
          if(this.$store.getters.cartInfoList != undefined) {
            this.show = 1
            clearInterval(timer)
          } 
        }, 600);
      }
    },
     computed:{
      ...mapGetters(['cartInfoList']),
      // 总价钱
      totalPrices() {
          let sum = 0
          this.cartInfoList.forEach(element => {
            if(element.isChecked == 1)  sum += element.skuNum * element.skuPrice
          });
          // this.$bus.$emit('totalPrices',sum)
          return sum
      },
      // 全选按钮
      allCheckeds:{
        get() {
        // 遍历数组，只要全部的isChecked的都为1 ，返回true  否则返回false
         let a = this.cartInfoList.every(item => {return item.isChecked == 1})
            return a
        },
        set(newV) {
          this.cartInfoList.forEach(item => {
            item.isChecked = newV
          })
        }
      },
      
    },
     mounted() {
      this.getCartList()
      this.clearUndefined()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width:13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>