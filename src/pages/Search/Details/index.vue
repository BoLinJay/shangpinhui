<template>
<div>
     <!--bread-->
      <div class="bread" >
          <ul class="fl sui-breadcrumb">
              <li>
                  <a href="#">全部结果</a>
              </li>
          </ul>
          <ul class="fl sui-tag">
              <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removecategoryName">×</i></li>
              <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
              <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
              <li class="with-x" v-for="(arrtV, index) in searchParams.props" :key="index">{{arrtV.split(':')[2]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
      </div>
       <!--selector-->
    <div class="clearfix selector">
        <div class="type-wrap logo">
            <div class="fl key brand">品牌</div>
            <div class="value logos">
                <ul class="logo-list">
                    <li v-for="brand in trademarkList" :key="brand.tmId" @click="trademarkInfo(brand)">{{brand.tmName}}</li>
                </ul>
            </div>
            <div class="ext">
                <a href="javascript:void(0);" class="sui-btn">多选</a>
                <a href="javascript:void(0);">更多</a>
            </div>
        </div>
        <div class="type-wrap" v-for="properties in attrsList" :key="properties.attrId">
            <div class="fl key">{{properties.attrName}} </div>
            <div class="fl value">
                <ul class="type-list">
                    <li 
                    v-for="(feature,index) in properties.attrValueList" 
                    :key="index"
                     @click="featureM(properties,feature)"
                     >
                        <a href="javascript:;">{{feature}}</a>
                    </li>
                </ul>
            </div>
            <div class="fl ext"></div>
        </div>
    </div>
   <!--details-->
    <div class="details clearfix">
        <div class="sui-navbar">
            <div class="navbar-inner filter">
                <ul class="sui-nav" >
                    <li  :class="isNum == index ? 'active' : '' " v-for="value,index in sort" :key="index" @click="classActive(index)">
                        <a>
                            {{value}}
                            <span 
                            v-if="isNum == index ? 'active' : ''" 
                            class="iconfont"
                            :class="{'icon-up' : isUP,'icon-down':isDOWN}"
                            >
                            </span>
                        </a>
                    </li> 
                </ul>
            </div>
        </div>
        <div class="goods-list">
            <ul class="yui3-g">
                <li class="yui3-u-1-5" v-for="details in goodsList " :key="details.id">
                    <div class="list-wrap">
                        <div class="p-img">
                            <router-link 
                            :to="{
                                name:'Detail',
                                params:{
                                    id:details.id
                                }
                            } "
                            >
                                <img :src="details.defaultImg" />
                            </router-link>
                        </div>
                        <div class="price">
                            <strong>
                                    <em>¥</em>
                                    <i>{{details.price}} </i>
                                </strong>
                        </div>
                        <div class="attr">
                            <a target="_blank" href="item.html"  :title="details.title">{{details.title}} </a>
                        </div>
                        <div class="commit">
                            <i class="command">已有<span>2000</span>人评价</i>
                        </div>
                        <div class="operate">
                            <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                            <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
                <ul>
                    <li class="prev disabled">
                        <a href="#">«上一页</a>
                    </li>
                    <li class="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li>
                        <a href="#">4</a>
                    </li>
                    <li>
                        <a href="#">5</a>
                    </li>
                    <li class="dotted"><span>...</span></li>
                    <li class="next">
                        <a href="#">下一页»</a>
                    </li>
                </ul>
                <div><span>共10页&nbsp;</span></div>
            </div>
        </div> -->
        <!-- <el-pagination
            class="center-el"
            background
            layout="prev, pager, next"
            :total="100">
        </el-pagination> -->
        <div class="block center-el">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchParams.pageNo"
            :pager-count="7"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'Details',
     data() {
        return {
            searchParams:{
                "category1Id": "",
                "category2Id": "",
                "category3Id": "", 
                "categoryName": "",
                "keyword": "",
                "order": "0:DOWN", 
                "pageNo": 1,
                "pageSize": 10,
                "props": [],
                "trademark": ""
            },
            mood:0,
            sort:['综合','销量','新品','评价','价格'],
        }
    },
    props:['goodsList','trademarkList','attrsList'],
    watch:{
        $route(newV, oldV) {
            this.clearID()
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.searchGet()
        },
        
    },
    computed:{
        isUP() {
            return this.searchParams.order.indexOf('UP') != -1
        },
        isDOWN() {
            return this.searchParams.order.indexOf('DOWN') != -1
        },
        isNum() {
            return this.searchParams.order.split(':')[0]
        }
    },
    methods: {
        handleSizeChange(val) {
            this.searchParams.pageSize = val
            console.log(this.searchParams.pageSize);
            this.searchGet()
        },
        handleCurrentChange(val) {
            this.searchParams.pageNo = val
            console.log(this.searchParams.pageNo);
            this.searchGet()
        },
        classActive(index) {
            let newOrder = ''
            let num = this.searchParams.order.split(':')[0]
            let orderF = this.searchParams.order.split(':')[1]
            if(parseInt(num) === index) {
                newOrder = `${index}:${orderF == 'DOWN' ? 'UP':'DOWN'}`
            } else {
                newOrder = `${index}:${'UP'}`
            }
            this.searchParams.order = newOrder
        },
        featureM(attr,feature) {
            // console.log(attr,feature);
            let prop = `${attr.attrId}:${attr.attrName}:${feature}`
            if(this.searchParams.props.indexOf(prop) === -1)
            this.searchParams.props.push(prop)
            // console.log(this.searchParams.props);
            this.searchGet()
        },
        removeAttr(index) {
            // console.log(index);
            this.searchParams.props.splice(index, 1)
            this.searchGet()
        },
        removeTrademark() {
            this.searchParams.trademark = undefined
            this.searchGet()
        },
        trademarkInfo(brand) {
            // 子给父传数据
            // this.$emit('trademarkClick',brand)
            this.searchParams.trademark = `${brand.tmId}:${brand.tmName}`
            this.searchGet()
        },
        searchGet() {
                this.$store.dispatch('searchList',this.searchParams)
        },
        removeKeyword() {
            this.$bus.$emit('clear')
            this.searchParams.keyword = undefined
            this.searchGet()
            if(this.$route.query) {
                this.$router.push({
                    name:'Search',
                    query:this.$route.query
                })
            } else {
                this.$router.push({name:'Search'})
            }
        },
        removecategoryName() {
            this.clearID()
            this.searchParams.categoryName = undefined
            this.searchGet()
            if(this.$route.params) {
                this.$router.push({
                    name:'Search',
                    params:this.$route.params
                })
            } else {
                this.$router.push({name:'Search'})
            }
        },
        clearID() {
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
        }
    },
    beforeMount() {
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
  
}
</script>

<style lang="less" scoped>
.center-el {
    text-align: center;
    margin: 5px 0;
}
.bread{
                margin-bottom: 5px;
                overflow: hidden;
                .sui-breadcrumb{
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float:left;
                    li{
                        display: inline-block;
                        line-height: 18px;
                        a{
                            color: #666;
                            text-decoration: none;
                            &:hover{
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                .sui-tag{
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    .with-x{
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition:color 400ms;
                        cursor: pointer;
                        i{
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        &:hover{
                            color: #28a3ef;
                        }
                    }
                }
            } 
.selector{
                border: 1px solid #ddd;
                margin-bottom: 5px;
                overflow: hidden;
                .logo{
                    border-top: 0;
                    margin: 0;
                    position: relative;
                    overflow: hidden;
                    .key{
                        padding-bottom: 87px!important;
                    }
                }
                .type-wrap{
                    margin: 0;
                    position: relative;
                    border-top: 1px solid #ddd;
                    overflow:hidden;
                    .key{
                        width: 100px;
                        background: #f1f1f1;
                        line-height: 26px;
                        text-align: right;
                        padding: 10px 10px 0 15px;
                        float:left;
                    }
                    .value{
                        overflow: hidden;
                        padding: 10px 0 0 15px;
                        color: #333;
                        margin-left: 120px;
                        padding-right: 90px;
                        .logo-list{
                            li{
                                float: left;
                                border: 1px solid #e4e4e4;
                                margin: -1px -1px 0 0;
                                width: 105px;
                                height: 52px;
                                text-align: center;
                                line-height: 52px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 700;
                                color: #e1251b;
                                font-style: italic;
                                font-size: 14px;
                                img{
                                    max-width: 100%;
                                    vertical-align: middle;
                                }
                            }
                        }
                        .type-list{
                            li{
                                float: left;
                                display: block;
                                margin-right: 30px;
                                line-height: 26px;
                                a{
                                    text-decoration: none;
                                    color: #666;
                                }
                            }
                        }
                    }
                    .ext{
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        .sui-btn{
                            display: inline-block;
                            padding: 2px 14px;
                            box-sizing: border-box;
                            margin-bottom: 0;
                            font-size: 12px;
                            line-height: 18px;
                            text-align: center;
                            vertical-align: middle;
                            cursor: pointer;
                            padding: 0 10px;
                            background: #fff;
                            border: 1px solid #d5d5d5;
                        }
                        a{
                            color: #666;
                        }
                    }
                }
            }
 .details{
                margin-bottom: 5px;
                .sui-navbar{
                    overflow: visible;
                    margin-bottom: 0;
                    .filter{
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        .sui-nav{
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            li{
                                float: left;
                                line-height: 18px;
                                a{
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                &.active{
                                    a{
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                .goods-list{
                    margin: 20px 0;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        li{
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;
                            .list-wrap{
                                .p-img{
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;
                                    a{
                                        color: #666;
                                        img{
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                                .price{
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .attr{
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    a{
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                .commit{
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    span{
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                .operate{
                                    padding: 12px 15px;
                                    .sui-btn{
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    .btn-bordered{
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        &:hover{
                                            border: 1px solid #666;
                                            color: #fff!important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    .btn-danger{
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        &:hover{
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color:white!important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .page{
                    width: 733px;
                    height: 66px;
                    overflow: hidden;
                    float:right;
                    .sui-pagination{
                        margin: 18px 0;
                        ul{
                            margin-left: 0;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 490px;
                            float: left;
                            li{
                                line-height: 18px;
                                display: inline-block;
                                a{
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    border: 1px solid #e0e9ee;
                                    margin-left: -1px;
                                    font-size: 14px;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                                &.active{
                                    a{
                                        background-color: #fff;
                                        color: #e1251b;
                                        border-color: #fff;
                                        cursor: default;
                                    }
                                }
                                &.prev{
                                    a{
                                        background-color: #fafafa;
                                    }
                                }
                                &.disabled{
                                    a{
                                        color: #999;
                                        cursor: default;
                                    }
                                }
                                &.dotted{
                                    span{
                                        margin-left: -1px;
                                        position: relative;
                                        float: left;
                                        line-height: 18px;
                                        text-decoration: none;
                                        background-color: #fff;
                                        font-size: 14px;
                                        border: 0;
                                        padding: 9px 18px;
                                        color: #333;
                                    }
                                }
                                &.next{
                                    a{
                                        background-color: #fafafa;
                                    }
                                }
                            }
                        }
                        div{
                            color: #333;
                            font-size: 14px;
                            float: right;
                            width: 241px;
                        }
                    }
                }
            }
</style>