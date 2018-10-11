// 区域滚动初始化
// 创建mui区域滚动实例,就可以调用插件实例方法
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

// 手动初始化,设置轮播周期
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});