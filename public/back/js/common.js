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
  
