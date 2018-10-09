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

  // 功能3 点击添加分类按钮显示模态框 
  $('#addSecond').click(function () {
     $('#addModalSecond').modal('show');
    // 点击一级分类,发送ajax请求,获取所有的一级分类列表.
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        //  console.log(info);
        var htmlStr = template("dropdownTpl",info)
        $('.dropdown-menu').html(htmlStr);
      }
    });

    
  
  
  })

  // 给下拉列表中的a添加点击事件,获取a的文本设置给按钮 
  $('.dropdown-menu').on('click','a',function () {
    //  获取a的文本 
    var txt = $(this).text();
    // console.log(txt);
    $('#dropdownTxt').text(txt);
    
  })
  

  // 图片上传初始化  
  $('#fileupload').fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
    }
});

})