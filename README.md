# cw-admin-web

> 基于vue的前端管理后台

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# ElementUI 组件库
>1,引入  
npm i element-ui -S  
>2,在main.js中引入并使用  
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css'  
Vue.use(ElementUI)  
>3,看官网使用组件即可  

# 引入sass语法
>1,安装依赖  
npm install node-sass --save-dev //安装node-sass   
npm install sass-loader --save-dev //安装sass-loader   
npm install style-loader --save-dev //安装style-loader 有些人安装的是 vue-style-loader 其实是一样的！  
上面几个相当于 npm install sass-loader node-sass vue-style-loader --D  一句话搞定  
>2,在build文件夹下的webpack.base.conf.js的rules里面添加配置  
{  
    test: /\.scss$/,  
    loaders: ["style", "css", "sass"]  
}  
>3,然后就可以正常使用了  
<style lang="scss"></style>  
>4,原理  
sass和scss是两个不同的东西！只是相似！sass借鉴了ruby语言的规范很严格！代码里面也没有大括号！  
这对于习惯用css{}的前端人员很难适应！于是就出现了scss!完美兼容css!还能有sass的功能！ 

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
