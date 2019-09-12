// 全局注册组件

Vue.component('vue-date-select', {
    // 选项
    props: ['value', 'min', 'max', 'placeholder'],
    props: {
        value: String,
        min: String,
        max: String,
        placeholder: {
            type: String,
            default: ''
        }
    },
    template: '<div>'+
            '<input type="text" readonly="readonly" class="vue-date-input" :placeholder="placeholder" v-model="selectValue" @focus="showPanel"/>'+
            '<div class="vue-date-select-container" :class="{\'vm-date-show\': popShow}"'+
                    '@mousemove="handleTouch($event)"'+
                    '@mouseup="handleTouch($event)"'+
                '>'+
                '<div class="vm-dialog-content" :style="{\'margin-top\': parseInt((windowHeight-260)*0.4)+\'px\'}">'+
                    '<div class="vm-wheels">'+
                        '<div class="vm-wheel" v-for="(item, wheelIndex) in wheels"'+
                            '@touchstart="handleTouch($event, wheelIndex)"'+
                            '@touchmove="handleTouch($event, wheelIndex)"'+
                            '@touchend="handleTouch($event, wheelIndex)"'+
                            '@mousedown="handleTouch($event, wheelIndex)"'+
                            '@mousewheel="handleTouch($event, wheelIndex)"'+
                            '@DOMMouseScroll="handleTouch($event, wheelIndex)"'+
                        '>'+
                            '<div class="vm-line"></div>'+
                            '<div class="vm-items-wrapper" :class="{\'anim\': item.anim}"'+
                                    ':style="{'+
                                        '\'transform\':\'translate3d(0,\'+ item.translateY +\'px, 0)\','+
                                        '\'transition-duration\': item.anim ? item.transitionTime : \'0s\''+
                                    '}">'+
                                '<div v-for="(optionItem, itemIndex) in item.data"'+
                                    'class="vm-option" :class="{\'color-bg\': wheelIndex==activeClick.wheelIndex && itemIndex==activeClick.itemIndex}" '+
                                    '@click="handleSingleClick($event, wheelIndex, itemIndex)"'+
                                    '@touchstart="hoverClass($event, wheelIndex, itemIndex)"'+
                                    '@touchend="hoverClass($event, wheelIndex, itemIndex)"'+
                                    '@mousedown="hoverClass($event, wheelIndex, itemIndex)"'+
                                    '@mouseup="hoverClass($event, wheelIndex, itemIndex)"'+
                                '>{{(optionItem<10? (\'0\'+optionItem) : optionItem)+ (wheelIndex==1?\'月\':\'\')}} </div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="vm-btns">'+
                        '<div class="vm-btn" @click="hidePanel">取消</div>'+
                        '<div class="vm-btn" @click="getSelectData">确定</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',
    data: function () {
        return {
            popShow: false,
            selectValue: '',
            wheels :[
                {
                    type: 'year',
                    translateY: 0,
                    anim : false,
                    transitionTime: '700ms',
                    data: []
                },
                {
                    type: 'month',
                    translateY: 0,
                    anim : false,
                    transitionTime: '700ms',
                    data: []
                },
                {
                    type: 'day',
                    translateY: 0,
                    anim : false,
                    transitionTime: '700ms',
                    data: []
                }
            ],
            startY: 0,
            moveY: 0,
            oldMoveY: 0,
            moveEndY: 0,
            offsetDistance: 0,
            offset: 0,
            oversizeBorder: 0,
            startTime: 0,
            liHeight : 40,
            minDate: '',
            maxDate: '',
            initDate: '',
            clickFlag: false,
            activeClick: {
                wheelIndex: -1,
                itemIndex: -1
            },
            activeWheelIndex: 0,
            windowHeight: window.screen.availHeight||200
        }
    },
    computed: {
    },
    mounted: function(){
        this.initSetting();
        this.initOption();

            window.addEventListener("DOMMouseScroll", function(e){
                console.log('IE滚动~~~');
            },false);


    },
    methods:{
        initSetting: function(){
            this.initDate =  this.value&&this.checkIsFormatStr(this.value)? this.value : this.getDateStr(new Date());
            this.maxDate = this.max && this.checkIsFormatStr(this.max)? this.max : this.getDateStr(new Date(), 2);
            this.minDate = this.min && this.checkIsFormatStr(this.min)? this.min : this.getDateStr(new Date(), -10);
        },
        initOption: function(){
            var maxDateObj = this.getDateStrObj(this.maxDate);
            var minDateObj = this.getDateStrObj(this.minDate);
            var initDateObj = this.getDateStrObj(this.initDate);

            for(var i=minDateObj.year; i<=maxDateObj.year; i++){
                this.wheels[0].data.push(i);
            }
            for(var j=1; j<=12; j++){
                this.wheels[1].data.push(j);
            }
            for(var k=1; k<=this.calcDays(initDateObj.year, initDateObj.month); k++){
                this.wheels[2].data.push(k);
            }
            this.locateWheelByVal(this.initDate);
        },
        locateWheelByVal: function(dateString){
            var minDateObj = this.getDateStrObj(this.minDate);
            var dateObj = this.getDateStrObj(dateString);
            // 定位显示初始值
            this.wheels[0].translateY = this.getDistanceByIndex(dateObj.year-minDateObj.year);
            this.wheels[1].translateY = this.getDistanceByIndex(dateObj.month-1);
            this.wheels[2].translateY = this.getDistanceByIndex(dateObj.day-1);
        },
        getDateStrObj: function(dateString, offsetYear, offsetMonth, offsetDay){
            // 特殊情况的处理
            var tempArr = dateString.split('-');
            return {
                year: ~~tempArr[0],
                month: ~~tempArr[1],
                day: ~~tempArr[2]
            }
        },
        addPrefix: function(num){
            return num<10? '0'+num : num;
        },
        getDateStr: function(dateObj, offsetYear, offsetMonth, offsetDay){
            var tempArr = [];
            tempArr.push(dateObj.getFullYear()+(offsetYear||0));
            tempArr.push(this.addPrefix(dateObj.getMonth()+1+(offsetMonth||0)));
            tempArr.push(this.addPrefix(dateObj.getDate()+(offsetDay||0)));
            return tempArr.join('-'); 
        },
        checkIsFormatStr: function(dateString){
            if(dateString && typeof(dateString)=='string'){
                var tempArr = dateString.split('-');
                if(tempArr.length>2){
                    var year = ~~tempArr[0],
                        month = ~~tempArr[1],
                        day = ~~tempArr[2];
                    if((year>0&&year<10000)&&(month>=1&&month<=12)&&(day>=1&&day<=this.calcDays(year,month))){
                        return true;
                    }
                }
            }
            console.warn('日期"'+dateString+'"不符合"yyyy-mm-dd格式"，或不存该日期，已替换为默认值。');
            return false;
        },
        getDistanceByIndex: function(index){
            return (2-index)*this.liHeight;
        },
        getIndexByDistance: function(translateY){
            return parseInt(-translateY/this.liHeight)+2;
        },
        getWheelData: function(wheelIndex){
            var dataIndex = this.getIndexByDistance(this.wheels[wheelIndex].translateY);
            dataIndex = dataIndex<0 ? 0 : dataIndex; 
            dataIndex = dataIndex>=this.wheels[wheelIndex].data.length? this.wheels[wheelIndex].data.length-1 : dataIndex; 
            return this.wheels[wheelIndex].data[dataIndex];
        },
        //求月份最大天数
        calcDays: function(year, month) {
            // 传进来的month值是已经加1的，而下面的技巧中刚好Month也需要+1
            return new Date(year, month, 0).getDate();
        },
        fixPosition: function(distance){
            //修正位置
            return Math.round(distance/this.liHeight) * this.liHeight;
        },
        checkIsOverBorder: function(curWheelObj){
            //反弹
            var _this = this;
            this.oversizeBorder = -(curWheelObj.data.length-3)*this.liHeight; 
            if(curWheelObj.translateY > 2*this.liHeight){
                setTimeout(function(){
                    curWheelObj.transitionTime = '700ms';
                    curWheelObj.translateY = 2*_this.liHeight; // 需要增加动画
                }, 100);

            }else if(curWheelObj.translateY < this.oversizeBorder){
                setTimeout(function(){
                    curWheelObj.transitionTime = '700ms';
                    curWheelObj.translateY = _this.oversizeBorder;
                }, 100);
            }
        },
        updateDays: function(){
            var newMonthDaysNum = this.calcDays(this.getWheelData(0), this.getWheelData(1));
            if(newMonthDaysNum>0 && this.wheels[2].data.length!=newMonthDaysNum){
                var tempArr = [];
                for(var k=1; k<=newMonthDaysNum; k++){
                    tempArr.push(k);
                }
                this.wheels[2].data = tempArr;
                this.checkIsOverBorder(this.wheels[2]);
            }
        },
        handleTouch: function(e, index) {
            e = e || window.event;
            var curWheelObj = typeof(index)=='number' ? this.wheels[index]: this.wheels[this.activeWheelIndex];
            switch (e.type){
                case 'touchstart':
                case 'mousedown':
                    if(e.type == 'touchstart'){
                        this.startY = e.touches[0].clientY;
                    }else{
                        // mousedown
                        this.startY = e.clientY;
                        this.activeWheelIndex = index;
                        this.clickFlag = true;
                        e.preventDefault();
                    }
                    curWheelObj.anim = false;
                    this.oldMoveY = this.startY;
                    this.startTime = (new Date()).getTime();
                    break;

                case 'touchend':
                case 'mouseup':
                    if(e.type == 'touchend'){
                        this.moveEndY = e.changedTouches[0].clientY;
                    }else{
                        // mousedown
                        this.moveEndY = e.clientY;
                        this.clickFlag = false;
                    }

                    this.offsetDistance = this.moveEndY - this.startY;
                    curWheelObj.anim = true;
                    curWheelObj.translateY = this.fixPosition(curWheelObj.translateY+this.offset);
                    var offsetTime =  (new Date()).getTime() - this.startTime;
                    var scrollSpeed = this.offsetDistance/offsetTime;
                    var tempTime = Math.abs(parseInt(scrollSpeed*1000));
                    curWheelObj.transitionTime = '700ms';
                    if(Math.abs(scrollSpeed)>0.3){
                        curWheelObj.transitionTime = tempTime > 700? (tempTime+'ms') : '700ms';
                        curWheelObj.translateY = this.fixPosition(curWheelObj.translateY + scrollSpeed*250);
                    }
                    this.checkIsOverBorder(curWheelObj);
                    break;

                case 'mousemove':
                case 'touchmove':
                    e.preventDefault();
                    if(e.type=='mousemove' && !this.clickFlag){
                        return false;
                    }
                    this.moveY = e.type=='touchmove'? e.touches[0].clientY : e.clientY;
                    this.offset = this.moveY - this.oldMoveY;
                    curWheelObj.translateY += this.offset;
                    this.oldMoveY = this.moveY;
                    break;

                case 'mousewheel':
                    curWheelObj.anim = true;
                    curWheelObj.translateY = this.fixPosition(curWheelObj.translateY-parseInt(e.deltaY*0.4));
                    this.oversizeBorder = -(curWheelObj.data.length-3)*this.liHeight; 
                    this.checkIsOverBorder(curWheelObj);
                    break;
            }
            // 切换年月的时候，更新天数
            if(index<=1){
                this.updateDays();
            }
        },
        handleSingleClick: function(e, wheelIndex, itemIndex){
            if(Math.abs(this.offsetDistance)<30){
                this.wheels[wheelIndex].translateY = this.getDistanceByIndex(itemIndex);
            }
        },
        hoverClass: function(e, wheelIndex, itemIndex){
            switch (e.type){
                case 'touchstart':
                case 'mousedown':
                    this.activeClick.wheelIndex = wheelIndex;
                    this.activeClick.itemIndex = itemIndex;
                    break;
                case 'touchend':
                case 'mouseup':
                    this.activeClick.wheelIndex = -1;
                    this.activeClick.itemIndex = -1;
                    break;
            }
        },
        getSelectData: function(){
            var _this = this;
            var tempArr = [];
            this.wheels.forEach(function(item, wheelIndex){
                tempArr.push(_this.addPrefix(_this.getWheelData(wheelIndex)));
            });
            this.selectValue = tempArr.join('-');
            this.$emit('pick', this.selectValue);
            this.hidePanel();
        },
        hidePanel: function(){
            this.popShow = false;
            // 关闭后 复位已选中的值
            if(this.selectValue){
                this.locateWheelByVal(this.selectValue);
            }
        },
        showPanel: function(){
            this.popShow = true;
        },
    }
});

