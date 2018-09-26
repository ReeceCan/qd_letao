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
            message: "用户名不存在"
          }

        }
      }
    }

  });
})