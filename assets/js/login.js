$(function () {
    // 点击去注册账号的连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    // 从layui中获取layer对象
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的时确认密码的内容
            // 还需拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            // 进行等于判断
            if (pwd !== value) {
                return "两次密码不一致"
            }
            // 判断失败，return提示消息
        }
    })

    // 监听注册表的提交事件
    // 绑定提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 模拟人的点击行为
                $('#link_login').click()
            })
    })


    // 监听登录表单的提交事件
    $('#from_login').submit(function (e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);

                // 跳转到后台主页
                // location.href = './login.html'
            }
        })
    })
})

