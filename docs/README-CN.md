
# vue-date-select
基于vue的一款移动端时间选择器，同时对PC端兼容友好，类似于ios、mobiscroll滚动方式选择。

[【View English Documents】](https://github.com/onlyhom/vue-date-select) | 【中文文档】

## 演示

#### 手机扫描二维码预览:
<img src="https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/code.png?raw=true" width="230">

#### Gif preview:
![](https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/demo.gif)


## 安装

#### 标签引入：
```html
<link rel="stylesheet" type="text/css" href="path/mobileSelect.css">
<script src="path/mobileSelect.js" type="text/javascript"></script>
```

## 快速开始

### 使用
```html 
<vue-date-select v-model="dateVal"></vue-date-select>
```

### 使用 (个性化配置)
```html
 <vue-date-select 
     placeholder="请选择日期" 
     v-model="dateVal"
     :theme-color="'#2196f3'"
     :min="'2000-01-01'"
     :max="'2030-01-01'"
     :input-class="'vue-date-input'" 
     :input-style="{color:'#333333'}">
 </vue-date-select>
```


## 参数

|选项|默认值|类型|描述|
| ------ |------|-----|-----|
|v-model|当天的日期字符串，例如:'2019-09-16'|String(date)| 该表单组件的value值 |
|placeholder|```''```| String| input输入框的占位符 |
|theme-color|```'#4eccc4'```| String(HEX/RGB color)| 组件的主题颜色 |
|min| 基于v-model中十年前的一个日期， 例如:'2009-09-16' | String(date)| 可选日期范围的最小值。 |
|max| 基于v-model中两年前的一个日期， 例如:'2021-09-16' | String(date)| 可选日期范围的最大值。 |
|input-class|```''```| String / Array / Object|	input输入框的class值。 |
|input-style|```''```| String / Array / Object|	input输入框的style值。 |


## 更新日志
### 2019-09-13[创建项目]
提交基本文件。

### 2019-09-16[更新]
1、增加一些新的配置项: 

 - 使用 'v-model' 语法糖
 - 增加 'input-class' 输入框配置项
 - 增加 'input-style' 输入框配置项

2、增加中文版README.

## License
[MIT LICENSE](https://github.com/onlyhom/vue-date-select/blob/master/LICENSE)

Copyright (c) 2019-present, LIHONG OU(onlyhom)