
# vue-date-select
基于vue的一款移动端时间选择器，同时对PC端兼容友好，类似于ios、mobiscroll滚动方式选择。

[【English documents】](https://github.com/onlyhom/vue-date-select)

## 演示

#### 手机扫描二维码预览:
<img src="https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/code.png?raw=true" width="230">

#### Gif preview:
![](https://raw.githubusercontent.com/onlyhom/onlyhom.github.io/master/vue-date-select/demo.gif)

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
