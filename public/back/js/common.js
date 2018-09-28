// 进度条功能
/*
  想要实现进度条功能 使用NProgress插件 
  .ajaxStart() 在Ajax请求发送之前绑定一个要执行的函数，这是一个 Ajax Event.
.ajaxError() Ajax请求出错时注册一个回调处理函数，这是一个 Ajax Event。
.ajaxSuccess() 绑定一个函数当 Ajax 请求成功完成时执行。 这是一个Ajax Event.
.ajaxStop() 在AJAX 请求完成时执行一个处理函数。 这是一个 Ajax Event。
.ajaxComplete() 当Ajax请求完成后注册一个回调函数。不管成功或失败
.ajaxStop() 在AJAX 请求完成时执行一个处理函数


需求 : 发送第一个ajax时开启进度条 ,在ajax全部回来时关闭进度条

*/ 

  $(document).ajaxStart(function() {
    NProgress.start();
    // console.log('开启');
    
  });

  $(document).ajaxStop(function() {
    // 模拟网络延迟 关闭进度条
    //实际开发中不用
  setTimeout(function () {
    NProgress.done(); 
  },500);
  });

  // 公共效果  
/*
  1 二级菜单切换效果
  2 左侧菜单栏切换
  3 退出效果 

* */
$(function () {
  //  1. 二级菜单显示与隐藏
  $('.lt_aside .category').on('click',function () {

     $('.lt_aside .child').stop().slideToggle();
     
  })
  // 2. 左侧菜单栏切换功能 
  $('.icon_menu').click(function () {
     $('.lt_aside').toggleClass('hidemenu');
     $('.lt_topbar').toggleClass('hidemenu');
     $('.lt_main').toggleClass('hidemenu');
  })
  // 3. 退出效果 
  // 点击退出显示模态框
  $('.icon_modal').click(function () {
    $('#logoutModal').modal('show');
  })

  // 退出功能 应在后台提供接口 在服务器端销毁用户的登录状态 
  $('#logoutBtn').click(function () {
     $.ajax({
       type: "get",
       url: "/employee/employeeLogout",
       dataType: "json",
       success: function (info) {
          if(info.success) {
            // 退出成功,跳转到登录页 
            location.href = "login.html";            
          }        
       }
     });
  });

})

  
  
