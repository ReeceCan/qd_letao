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

  // 添加分类功能   
  
  // 思路  : 

  // 1.  引入模态框  点击按钮显示模态框 .
  // 2.  表单验证功能  

  $('#addCate').click(function () {
     $('#addCateModal').modal('show');
  });

  // 通过表单校验插件实现表单的校验  
  //初始化表单校验插件 
  $('#form').bootstrapValidator({
    // 配置图标 
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',  //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败 
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 指定校验字段
    fields: {
      //配置校验规则,校验name非空 
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类名称'
          },
        }
      },
    }

  });

  // 注册表单校验成功事件  校验成功后,发送ajax请求给后台,添加数据并渲染到页面上 
  $('#form').on('success.form.bv',function (e) {
    // 阻止默认跳转行为  
     e.preventDefault();
     
    //  发送ajax请求 ,添加1级分类,并返回数据渲染到页面上  
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        //  console.log(info);
         if(info.success) {
          //  关闭模态框 
          $('#addCateModal').modal('hide');

          // 重新渲染第一页面  
          currentPage = 1;
          render();
          // 表单内容和校验状态都要重置   resetForm传true才能将内容和状态全部重置
          $('#form').data('bootstrapValidator').resetForm(true);
         }
      }
    })
  })
 

})