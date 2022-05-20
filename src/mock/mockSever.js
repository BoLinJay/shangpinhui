import Mock from 'mockjs'

import banner from './banner.json'
import floors from './floors.json'
import search from './search.json'
import navList from './navList.json'
import itemV from './item'
Mock.setup({
    timeout:200-500
})
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floors',{code:200,data:floors})
Mock.mock('/mock/list','post', {code:200,data:search})
Mock.mock('/mock/nav','get', {code:200,data:navList.data})  
Mock.mock('/mock/item','get', {code:200,data:itemV.item1})  