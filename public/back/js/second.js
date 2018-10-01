$(function () {

  // 在全局声明变量  

  //记录当前页
  var pageCurrent = 1;
  // 每页条数 
  var pageSize = 5;

  // 已进入页面渲染一次 
  render();

  function render() {
    //  功能1 : 动态渲染页面  
    $.ajax({
      type: "get",
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pageCurrent,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        // 绑定模板
        var strHtml = template('tmpSecond', info);
        $('tbody').html(strHtml);

        // 功能2 分页功能 
        $("#boxPaginator2nd").bootstrapPaginator({
          // 对应bootstrap版本
          bootstrapMajorVersion: 3,
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            
            pageCurrent = page;
            // // // 渲染到当前页 
            render();

          }
        });

      }

    });
  }





})