$(function () {


  // 向后台发送请求 渲染页面的表格 

  //记录当前页面
  var currentPage = 1;
  // 每页显示的条数 
  var pageSize = 5;


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
      var str = template("tmpFirst",info);
      $('tbody').html(str);
    }
  })







})