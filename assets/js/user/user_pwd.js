$(function () {
    var form = layui.form
    var layer = layui.layer

    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        // value在新密码框中填写的值
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })


    // 发起ajax请求重置密码
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // h获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 将jquery元素转换为原生dom元素
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
}) 