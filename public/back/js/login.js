$(function () {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      // 校验用户名 
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          //长度不能为空 
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度在2-6位之间",
          },
          callback: {
            message: "用户名不存在"
          }

        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: "密码不能为空"
          },
          //长度不能为空 
          stringLength: {
            min: 6,
            max: 12,
            message: "用户名长度在6-12位之间",
          },
          // 专门用于配置回调的函数说明
          callback: {
            message: "密码错误"
          }

        }
      }
    }

  });
})




$(function () {
   /*
    * 通过submit按钮提交表单 可以让表单校验插件进行校验  
    * (1) 校验通过,默认提交表单 ->跳转页面
    *   需要再校验通过后 阻止默认的提交 ,表单校验插件本身就会阻止默认的提交
    * (2) 校验失败,阻止默认提交 
    * 
    *  思路: 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
    **/

  $('#form').on('success.form.bv',function (e) {
    //  阻止表单默认事件  
    e.preventDefault();
    // 通过ajax进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      //通过表单序列化快速获取表单值
      data: $('#form').serialize(),
      success: function (info) {
        // console.log(info);
        if(info.success) {
          // 登录成功,跳转到登录页  
          location.href = "index.html";
        }
        //登录失败
          //error 1000 用户名错误  1001 密码错误
        if(info.error === 1000) {
          // 用户名错误
           // 将表单用户名校验状态从成功更新成失败, 并且给用户提示
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");

        }
        if(info.error === 1001) {
          //密码错误 
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
                 
      }
    })
  });


});

$(function () {
  //  添加重置功能 
  // validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
   //  调用插件的方法进行重置 
    // 1. true, 表示将表单内容和校验状态都重置
    // 2. false, 只重置校验状态
    
  $('[type="reset"]').click(function () {
   
    $('#form').data("bootstrapValidator").resetForm();
  })


});


