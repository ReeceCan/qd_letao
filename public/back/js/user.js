$(function () {

  // 记录当前页 
  var pageCurrent = 1;
  //每页条数
  var pageSize = 5;

  // 已进入页面就渲染一次 
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: pageCurrent,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
         console.log(info);
        // 连接模板引擎
         var htmlStr = template('tpl',info);
           // 根据生成的 htmlStr 模板, 渲染 tbody
         $('tbody').html(htmlStr);
  
        //  分页初始化 
        $("#paginator").bootstrapPaginator({
          // 指定 bootstrap 的版本
          bootstrapMajorVersion: 3,
          currentPage: pageCurrent,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数,
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c,page){
            // 给分页按钮添加点击事件
            console.log(page);
            pageCurrent = page;
            // 点击到对应页面时,重新渲染 
            render();
          }
        });
      }
    })
  }
  


})