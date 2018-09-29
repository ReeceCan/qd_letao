$(function () {


  // 向后台发送请求 渲染页面的表格 

  //记录当前页面
  var currentPage = 1;
  // 每页显示的条数 
  var pageSize = 5;

  // 一打开页面就渲染一次  
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //  绑定模板引擎 
        var str = template("tmpFirst", info);
        $('tbody').html(str);
  
        // 分页功能  
        $("#boxPaginator").bootstrapPaginator({
          //默认是2，如果是bootstrap3版本，这个参数必填
          bootstrapMajorVersion: 3,
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large

           // 给页码添加点击事件
          // event 是插件包装过的对象
          // originalEvent 是原始的事件对象
          // type 指代当前点击的页码类型, page普通页码, first, last, next, prev
          // page 指代当前点击按钮对应的页码
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
  
            currentPage = page;
            // 重新渲染页面  
            render();
          }
        });
      }
    });
  }
  


})