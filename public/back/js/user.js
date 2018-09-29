$(function () {

  // 记录当前页 
  var pageCurrent = 1;
  //每页条数
  var pageSize = 5;

  // 声明一个全局变量,专门用来获取需要修改的用户信息 .
  var currentId;
  var isDelete;


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
        // console.log(info);
        // 连接模板引擎
        var htmlStr = template('tpl', info);
        // 根据生成的 htmlStr 模板, 渲染 tbody
        $('tbody').html(htmlStr);

        //  分页初始化 
        $("#paginator").bootstrapPaginator({
          // 指定 bootstrap 的版本
          bootstrapMajorVersion: 3,
          currentPage: pageCurrent,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数,
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
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




  // 启用禁用功能 
    // 1. 点击启用/禁用 开启模态框  通过事件委托绑定事件 
    $('tbody').on('click', '.btn', function () {
      //  显示模态框 
      $('#userModal').modal("show");
      // console.log(this);
      // 获取需要修改的当前用户的id
      currentId = $(this).parent().data("id");
      // console.log(currentId);

      isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
      // console.log(isDelete);

    });
    // 2. 向后台发送请求,改变启用禁用状态 
    // 点击确定按钮,修改用户状态 发送ajax请求 
    // 如果isDelete传值为0,改为禁用状态 
    //  传值为1,改为禁用状态 .

    $('#submitBtn').on("click",function () {
      // console.log(isDelete,currentId);
      
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        dataType: "json",
        data: {
          id: currentId,
          isDelete: isDelete
        },
        dataType: "json",
        success: function (info) {
          // console.log(info);
          if(info.success) {
            //关闭模态框
            $('#userModal').modal("hide");
            // 重新渲染页面 
            render();
          }
        }
      })
    });
})