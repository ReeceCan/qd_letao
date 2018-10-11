$(function () {
  // 要进行搜索历史记录管理,就必须进行本地存储操作 所以我们要约定一个键名
  // 专门用于历史记录管理 键名search_list  键名定了以后就用这个 
  
  // 下面 3 行代码, 用于在控制台执行, 进行假数据初始化
  // var arr = [ "艾迪", "爱迪王", "耐克", "匡威" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem("search_list", jsonStr);


  // (1) 搜索历史记录渲染
  // 从本地存储中读取历史记录 jsonStr
  // 解析jsonStr 转成数组
  // 结合模板引擎进行渲染

  render();


  // 读取历史记录,以数组的形式返回
  function getHistory() {
    // 没有数据时,读取的是null,要做数据处理
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr =  JSON.parse(jsonStr);
    return arr;
  }
  

  // 读取历史记录,得到数组,并进行页面渲染
  function render() {
    var arr = getHistory();
    // template(模板id, 数据对象)
    var htmlStr = template("history_tpl",{ arr: arr });
    $('.lt_history').html(htmlStr);
    // console.log(arr);
    
  }
  

  // (2) 清空历史记录功能
      // (1) 点击事件  注意 事件委托绑定
      // (2) 使用removeItem() 清除的是本地存储
      // (3) 页面重新渲染 
      $('.lt_history').on("click",".icon_empty",function () {

        // 消息提示框 
        // mui.toast("haha");

        // 确认框 confirm
        // 参数1: 确认框内容
        // 参数2: 标题文本
        // 参数3: 按钮文本, 数组
        // 参数4: 关闭确认框后的回调函数
        mui.confirm("您确认清空历史记录吗?","温馨提示",["取消","确认"],function (e) {
           if(e.index === 1) {
            // 清空数据 
            localStorage.removeItem("search_list");
            //重新渲染
            render();
           } 
        });
        
        
         
      })

  // (3)删除单挑历史记录功能
        // 通过事件委托绑定事件 
        // 取出数组,从自定义属性中读取下标,从下标来删除对应项 
          //     arr.splice(从哪开始, 删几个, 添加的项1, 添加的项2, 添加的项3, .... );
          //     arr.splice 会改变原数组
        //  将修改后的数组, 转成jsonStr, 存储到本地
        // 重新渲染
        $('.lt_history').on("click",".icon_delete",function () {
          
          // mui.toast("haha");
           var arr = getHistory();
          //  读取下标 
          var index = $(this).data("index");

          // 通过下标删除数组中的对应项 
          arr.splice(index,1);

          // 转成json字符串 存储到本地
          localStorage.setItem("search_list",JSON.stringify(arr));

          // 重新渲染 
          render();
        });

  // (4) 添加搜索历史记录功能 
        // (1) 给搜索按钮添加点击事件
        // (2) 获取输入框的内容, 添加到数组的最前面
        // (3) 将修改后的数组, 存到本地中
        // (4) 重新渲染

      $('.search_btn').click(function () {
        // 获取关键字  
        var key = $(".search_input").val().trim();

        if(key == "") {
          // 提示用户即可 
          mui.toast("请输入搜索关键字");
          return;
        }
        // 取出数组 
        var arr = getHistory();

        // 需求 
        // 1. 如果已经有重复项,删除重复项 
        // 2. 如果长度尝过10,删除最后一项 
        
        // index !=-1  删除重复项 
        var index = arr.indexOf(key);
        if(index !== -1) {
          // 说明有重复项 
          // 删除重复项 
          arr.splice(index,1);
        }

        // 长度不超过10 
        if(arr.length >= 10) {
          arr.pop();
        }

        // 将关键字添加到数组的最前面 
        arr.unshift(key);
        // 将修改后的数组存到本地中 
        localStorage.setItem("search_list",JSON.stringify(arr));

        // 重新渲染页面 
        render();

        // 清空搜索框
        $(".search_input").val("");
      })
})