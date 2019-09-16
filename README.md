
# vue-date-select
A mobile datetime picker/selector based on Vue.js, also friendly to PC. Similar to IOS, Mobiscroll scroll selection mode.

[【查看中文文档】](https://github.com/onlyhom/vue-date-select/blob/master/docs/README-CN.md)

## Preview

#### Use mobile phone scan code to preview:
<img src="https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/code.png?raw=true" width="230">

#### Gif preview:
![](https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/demo.gif)

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
