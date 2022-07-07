$(function () {
    var form = layui.form
    var layer = layui.layer

    // 自定义校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            methods: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)

            }
        })
    }


    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 获取表单数据 $this表示当前表单
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                return layer.msg('更新用户信息成功！')

                // 调用父页面的方法，重新渲染用户头像和用户信息
                // 需要手动刷新才能显示更换的头像
                window.parent.getUserInfo()

            }
        })
    })
})