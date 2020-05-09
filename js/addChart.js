var addChart = {
    //投产主变容量统计配置项
    touchangZhuBianOption: {
        //--------------    标题 title  ----------------
        title: {
            //text: '主变容量',
            x: 'center', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top',
            textStyle: { //---主标题内容样式
                color: '#fff',
                fontSize: 30,
            },
            // subtext:'副标题',          //---副标题内容样式
            // subtextStyle:{
            //      color:'#bbb'
            // },

            //padding:[0,0,0,0]               //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位

        },

        //----------------   图例 legend  -----------------
        legend: {
            type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            top: '1%', //----图例相对容器位置,top\bottom\left\right
            selected: {
                '销量': true, //----图例选择,图形加载出来会显示选择的图例，默认为true
            },
            textStyle: { //----图例内容样式
                color: '#fff', //---所有图例的字体颜色
                //backgroundColor:'black',  //---所有图例的字体背景色
            },
            tooltip: { //图例提示框，默认不显示
                show: true,
                color: 'red',
            },
            data: [ //----图例内容
                {
                    name: '数量',
                    icon: 'circle', //----图例的外框样式
                    textStyle: {
                        color: '#fff', //----单独设置某一个图例的颜色
                        //backgroundColor:'black',//---单独设置某一个图例的字体背景色
                    }
                }
            ],
        },

        //--------------   提示框 -----------------
        tooltip: {
            show: true, //---是否显示提示框,默认为true
            trigger: 'item', //---数据项图形触发
            axisPointer: { //---指示样式
                type: 'shadow',
                axis: 'auto',

            },
            padding: 5,
            textStyle: { //---提示框内容样式
                color: "#fff",
            },
        },

        //-------------  grid区域  ----------------
        grid: {
            show: false, //---是否显示直角坐标系网格
            top: 80, //---相对位置，top\bottom\left\right
            containLabel: false, //---grid 区域是否包含坐标轴的刻度标签
            tooltip: { //---鼠标焦点放在图形上，产生的提示框
                show: true,
                trigger: 'item', //---触发类型
                textStyle: {
                    color: '#666',
                },
            }
        },

        //-------------   x轴   -------------------
        xAxis: {
            show: true, //---是否显示
            position: 'bottom', //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            type: 'category', //---轴类型，默认'category'
            //  name:'容量',              //---轴名称
            nameLocation: 'end', //---轴名称相对位置
            nameTextStyle: { //---坐标轴名称样式
                color: "#fff",
                padding: [5, 0, 0, -5], //---坐标轴名称相对位置
                fontSize: 30,

            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,           //---坐标轴名字旋转

            axisLine: { //---坐标轴 轴线
                show: false, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: true, //---是否朝内
                lengt: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度
                margin: 5, //---刻度标签与轴线之间的距离
                //color:'red',              //---默认取轴线的颜色
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },
            },
            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                lineStyle: {
                    //color:'red',
                    //width:1,
                    //type:'solid',
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            },
            data: [9, 12, 15, 18, 24, 36, 48, 72, 75, 100, 150, 200, 300], //内容

        },

        //----------------------  y轴  ------------------------
        yAxis: {
            show: true, //---是否显示
            position: 'left', //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: 'value', //---轴类型，默认'category'
            //  name:'数量',              //---轴名称
            nameTextStyle: { //---坐标轴名称样式
                color: "#fff",
                padding: [5, 0, 0, 5], //---坐标轴名称相对位置
                fontSize: 30,
            },
            nameLocation: 'end', //---轴名称相对位置value

            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,           //---坐标轴名字旋转

            axisLine: { //---坐标轴 轴线
                show: false, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: true, //---是否朝内
                length: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度
                margin: 8, //---刻度标签与轴线之间的距离
                //color:'red',              //---默认取轴线的颜色
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },
            },
            splitLine: { //---grid 区域中的分隔线
                show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed', //---类型
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            }
        },

        //------------ 内容数据  -----------------
        series: [{
            name: '电站数量', //---系列名称
            type: 'bar', //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'white',
                        fontSize: 20
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                                offset: 0,
                                color: '#bbf618'
                            },
                            {
                                offset: 0.5,
                                color: '#18f00e'
                            },
                            {
                                offset: 1,
                                color: '#1d56f0'
                            }
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                                offset: 0,
                                color: 'rgb(207,182,84)'
                            },
                            {
                                offset: 0.7,
                                color: '#2378f7'
                            },
                            {
                                offset: 1,
                                color: '#83bff6'
                            }
                        ]
                    )
                }
            },
            barWidth: '20', //---柱形宽度
            barCategoryGap: '20%', //---柱形间距
            data: [1, 12, 3, 15, 2, 37, 20, 1, 7, 5, 1, 4, 1]
        }]
    },
    //折单公里数配置项
    unilatKeralKilometreOption: {
        color: ['#0077FF', '#006699', '#4cabce', '#e5323e'],
        title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            // text: '折单公里数',//主标题文本，'\n'指定换行
            x: 'center', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            //             textAlign: null,//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
            //             backgroundColor: 'rgba(0,0,0,0)',//标题背景颜色，默认'rgba(0,0,0,0)'透明
            //             borderColor: 'white',//标题边框颜色,默认'#ccc'
            //             borderWidth: '',//标题边框线宽，单位px，默认为0（无边框）
            //             padding: 0,//标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            //             itemGap: 10,//主副标题纵向间隔，单位px，默认为10
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: '40',
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: 'white',
            },


        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return "单折线" + ' : ' + tar.value;
            },

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {

            type: 'category',
            data: ['05', '06', '07', '08', '09', '10', 11, 12, 13, 14, 15, 16, 17, 18, 19, 'total'],

            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            axisLabel: {
                interArrival: 0, //设置x坐标内容全部显示
                rotate: -30, //设置坐标倾斜角度
            },
            //设置x轴字体大小及颜色
            axisLabel: {
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },

            }
        },
        yAxis: {
            type: 'value',
            //y轴颜色
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            //y轴设置为百分比
            axisLabel: {
                formatter: '{value}',
            },

            //坐标轴内线的样式
            splitLine: {
                show: true, //去除网格线
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed',
                },
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },
            }

        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },

                data: [0, 631, 1165, 2353, 2459, 3026, 3566, 4334, 4556, 5178, 5504, 5916, 6361,
                    7025, 7181, 0
                ]
            },

            {
                name: '单折公里数',
                type: 'bar',
                stack: '总量',
                label: {
                    //position:'top',
                    normal: {
                        show: true,
                        position: 'top',

                        textStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },

                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#c5f6ad'
                                },
                                {
                                    offset: 0.5,
                                    color: '#5ff0a5'
                                },
                                {
                                    offset: 1,
                                    color: '#4794f0'
                                }
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#2378f7'
                                },
                                {
                                    offset: 0.7,
                                    color: '#2378f7'
                                },
                                {
                                    offset: 1,
                                    color: '#83bff6'
                                }
                            ]
                        )
                    }
                },
                data: [631, 534, 1188, 106, 567, 540, 768, 222, 622, 326, 412, 445, 664, 156,
                    143, 7324
                ]
            }
        ]
    },
    //统计05-19年每年对应的200KV以及500KV工程数量配置项
    yearAndTowerOption: {
        legend: {
            orient: 'vertical',
            x: 830,
            y: 0,
            icon: 'pie',
            color: ['#4472C5', '#ED7C30', '#80FF80'],
            data: ['总工程', '220KV工程', '500KV工程'],
            textStyle: { //图例文字的样式
                color: 'white',
                fontSize: 13
            },

            //backgroundColor:'rgba(100,0,100,0.5)',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            //name:'年份',
            nameTextStyle: {
                fontSize: 20,
            },
            type: 'category',
            data: ['05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            axisLabel: {
                interArrival: 0, //设置x坐标内容全部显示
                rotate: 0, //设置坐标倾斜角度
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },
            },
            //设置x轴字体大小及颜色

        },
        yAxis: {
            // name:'工程数量',              //---轴名称
            nameTextStyle: {
                fontSize: 20,
            },
            type: 'value',
            //y轴颜色
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },

            //坐标轴内线的样式

            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed', //---类型
                },
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    fontSize: 20,
                    color: 'white',
                },

            }

        },
        series: [
            {
                name: "总工程",
                //每年对应的（200KV+500KV）工程的数量
                data: [10, 14, 13, 8, 9, 9, 17, 8, 14, 13, 11, 12, 16, 10,
                    10
                ], //[11,26,42,51,65,76,94,103,121,135,145,157,177,188,201]
                type: 'line',
                symbol: 'square',
                symbolSize: 5,
                smooth: true,
                lineStyle: {
                    normal: {
                        color: 'rgb(24,190,188)',
                        width: 5,
                        //type: 'dashed'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: 'white',
                        color: 'rgb(24,190,188)',
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                            }
                        },
                        lineStyle: {
                            width: 10
                        },
                        // areaStyle:{
                        //      type:'default'
                        // }
                    }
                },
            },
            {
                name: "220KV工程",
                //05-19年每年修建的220KV工程的数量
                data: [9, 14, 9, 5, 7, 8, 14, 6, 14, 10, 9, 9, 10, 10,
                    6
                ], //[11,26,42,51,65,76,94,103,121,135,145,157,177,188,201]
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                smooth: true,
                lineStyle: {
                    normal: {
                        color: 'green',
                        width: 5,
                        type: 'dashed'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: 'white',
                        color: 'green',
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                            }
                        },
                        lineStyle: {
                            width: 10
                        },
                        // areaStyle:{
                        //      type:'default'
                        // }
                    }
                },
            },
            {
                name: "500KV工程",
                //05-19年每年对应的500KV工程的数量
                data: [1, 0, 4, 3, 2, 1, 3, 2, 0, 3, 2, 3, 6, 0, 4], //[11,26,42,51,65,76,94,103,121,135,145,157,177,188,201]
                type: 'line',
                symbol: 'square',
                symbolSize: 5,
                smooth: true,
                lineStyle: {
                    normal: {
                        color: 'rgb(52,79,120)',
                        width: 5,
                        type: 'dashed'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: 'white',
                        color: 'rgb(52,79,120)',
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                            }
                        },
                        lineStyle: {
                            width: 10
                        },
                        // areaStyle:{
                        //      type:'default'
                        // }
                    }
                },
            }
        ],
    },
    //在建和扩建比列
    constructorArr:[150,40],
    //用来显示区域排行榜里面的8个省份
    showProvice(id, imagePath,province,projNum,towerNum) {
        //设置背景图片
        let element = document.getElementById(id);
        element.style.backgroundImage = 'url(./image/CQdistrict/beibei.png)';
         //设置区域名称
        element.getElementsByClassName('area')[0].innerHTML = province;
        //设置工程数量
        element.getElementsByClassName('projNum')[0].innerHTML = '~ 工程数量：'+ projNum;
         //设置变电站数量
        element.getElementsByClassName('towerNum')[0].innerHTML = '~ 变电站：'+ towerNum;
    },
    //展示新建和扩建
    //[74,40]
    showConstructor(id, data) {
        let $el = document.getElementById(id);
        let myChart = echarts.init($el);
        let total = 0;
        data.forEach((res) => {
             total += parseFloat(res);
        });
        var jiancheng = parseFloat(data[0]/ total * 100).toFixed(2);
        var name = data.type;
        let option = {
             title: {
                  zlevel: 0,
                  text: [
                       jiancheng + "%" + "\n" + data[0] + "个",
                  ],
                  rich: {
                       value: {
                            color: '#303133',
                            fontSize: 20,
                            fontWeight: 'bold',
                            lineHeight: 40,
                       },
                       name: {
                            color: '#909399',
                            lineHeight: 20
                       },
                  },
                  top: 'center',
                  left: '100',
                  textAlign: 'center',
                  textStyle: {
                       color: '#e4393c', //京东红
                       fontStyle: 'normal', //主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                       fontWeight: "bold", //可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                       fontFamily: "san-serif", //主题文字字体，默认微软雅黑
                       fontSize: 20, //主题文字字体大小，默认为18px
                       color: 'white',
                  },
             },
             tooltip: { // 悬停指示
                  trigger: 'item',
                  formatter: "{b}: {c} ({d}%)"
             },
             legend: {
                  orient: 'vertical',
                  x: 'right',

                  itemGap: 30,
                  top: 'middle',
                  align: 'left',
                  icon: 'circle',
                  formatter: function (name) {
                       return name;
                  },
                  show: false
             },
             series: [{
                  name: '访问来源',
                  type: 'pie',
                  radius: ['67%', '75%'],
                  center: ['50%', '50%'],
                  stillShowZeroSum: false,
                  avoidLabelOverlap: false,
                  itemStyle: {
                       borderWidth: 5, //设置border的宽度有多大
                       borderColor: '#fff',
                  },
                  zlevel: 1,
                  label: {
                       normal: {
                            padding: [30, 30, 30, 30],
                            backgroundColor: 'green',
                            show: false,
                            position: 'center',
                            formatter: [
                                 '{value|￥{c}}',
                                 '{name|{b}}'
                            ].join('\n'),
                            rich: {
                                 value: {
                                      color: '#303133',
                                      fontSize: 40,
                                      fontWeight: 'bold',
                                      lineHeight: 40,
                                 },
                                 name: {
                                      color: '#909399',
                                      lineHeight: 20
                                 },
                            },
                       },
                       emphasis: {
                            show: false,
                            textStyle: {
                                 fontSize: '16',
                                 fontWeight: 'bold'
                            }
                       }
                  },
                  data: data
             }],
             color: ['rgb(204,199,180)', 'rgb(38,54,79)']
        };
        myChart.setOption(option);
    },
    setOption(option, id) {
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);
    },
    init() {
        //投产主变容量统计 添加
        this.setOption(this.touchangZhuBianOption, 'tongJi1');
        this.setOption(this.unilatKeralKilometreOption, 'tongjitu');
        this.setOption(this.yearAndTowerOption, 'yearAndTower');
        this.showConstructor('touchan',this.constructorArr,0);
        this.showConstructor('sheji',this.constructorArr.reverse(),1);
        //this.showProvice('top2', 'imagePath');
    },
    //元素消失的方法
    hide(elClass) {
        $(elClass).fadeOut({
            duration: 1000,
        })
    },
    show(elClass) {
        $(elClass).fadeIn({
            duration: 1000,
        })
    },
    //变电站总数和折单公里数
    showNum(totalTower, totalKm) {
        //$(el).prepend('');
        $('#middle').fadeOut(2000);
        totalTower = '变电站总数:' + totalTower;
        totalKm = '折单公里数:' + totalKm;
        $('#totalTower').text(totalTower);
        $('#totalKm').text(totalKm);
        $('#middle').fadeIn(2000);
    }
}
export {
    addChart
}