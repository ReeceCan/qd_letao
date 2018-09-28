 // 4. 登录拦截功能  用于拦截未登录用户 
  // 登录拦截功能思路 
  // 1. 如果当前用户未登录 ,需要拦截到登录页 
  // 2. 如果已经登录,直接进入页面 
  // 但是前端并不知道用户是否登录,后端知道 ,需要向后端发送请求 获取用户状态

$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function (info) {
    // 如果未登录,拦截到登录页 
    if(info.error === 400) {
      location.href = "login.html";
    }if(info.success) {
      // 已登录,用户可以继续访问 
      console.log("已登录");   
    }
     
  }
});