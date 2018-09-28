$(function () {
  // 实现柱状体和饼状图 
  // 1.左侧准备柱状图 

  // 基于准备好的DOM初始化一个 echarts 实例 
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option = {
    //大标题 
    title: {
      // 标题文本 
      text: '2017年注册人数',
      //标题配置样式 
      textStyle: {
        color: "#333",
      }
    },
    // 提示框组件 
    tooltip: {},
    // 图例  人数 
    legend: {
      data: ['人数']
    },
    // 表示x轴 
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // 表示 y 轴, y 轴一般是刻度, 尽量根据数据自适应
    yAxis: {},

    series: [{
      name: '人数',
      // type 表示图标的类型, bar柱状图, line 折线图, pie 饼图
      type: 'bar',
      data: [1000, 1500, 2500, 1300, 1800, 2400]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option);


  // 2. 右侧准备饼状图 
  // 基于准备好的DOM初始化一个 echarts 实例 
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

  // 指定图表的配置项和数据
  option = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    // 提示框组件 
    tooltip: {
      trigger: 'item', // // 表示鼠标滑到数据项上面时触发
      // 自定义提示框内容
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 配置图例的显示方式 
    legend: {
      orient: 'vertical',// 配置图例的显示方式, horizontal 水平排列
      left: 'left',
      data: ['耐克', '阿迪', '李宁', '耐克王', '李宁王']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',// type 类型是 饼状图    line/bar
        // 圆的大小
        radius: '50%',
        // 圆心的位置
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '耐克' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '李宁' },
          { value: 135, name: '耐克王' },
          { value: 1548, name: '李宁王' }
        ],
        // 表示额外的阴影等效果
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.7)'
          }
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option);


})