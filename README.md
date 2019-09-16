
# vue-date-select
A mobile datetime picker/selector based on Vue.js, also friendly to PC. Similar to IOS, Mobiscroll scroll selection mode.

【English Documents】 | [【查看中文文档】](https://github.com/onlyhom/vue-date-select/blob/master/docs/README-CN.md)

## Preview

#### Use mobile phone scan code to preview:
<img src="https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/code.png?raw=true" width="230">

#### Gif preview:
![](https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/demo.gif)


## Installation

####  Tag import：
```html
<link rel="stylesheet" type="text/css" href="path/mobileSelect.css">
<script src="path/mobileSelect.js" type="text/javascript"></script>
```

## Getting Started

### Usage (minimal)
```html 
<vue-date-select v-model="dateVal"></vue-date-select>
```

### Usage (more)
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

## Options

|Option|Default|Type|Description |
| ------ |------|-----|-----|
|v-model|dateString of today,example:'2019-09-16'|String(date)| The value of the form component. |
|placeholder|```''```| String|Text displayed when no selected content is present. |
|theme-color|```'#4eccc4'```| String(HEX/RGB color)|The theme color of the component. |
|min| A date string of ten years ago base on v-model value, example:'2009-09-16' | String(date)|Minimum date for optional range date. |
|max| A date string of two years after base on v-model value, example:'2021-09-16' | String(date)|Maximum date for optional range date. |
|input-class|```''```| String / Array / Object|	Class for the input. |
|input-style|```''```| String / Array / Object|	Style for the input. |


## Logs
### 2019-09-13[create repositorie]
First commit with base files.

### 2019-09-16[update]
1、Add some new options: 

 - use 'v-model' syntactic sugar
 - add 'input-class' option
 - add 'input-style' option

2、Add chinese version of readme.

## License
[MIT LICENSE](https://github.com/onlyhom/vue-date-select/blob/master/LICENSE)

Copyright (c) 2019-present, LIHONG OU(onlyhom)