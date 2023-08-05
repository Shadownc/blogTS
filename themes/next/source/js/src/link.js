link = {
    init: function () {
        var that = this
        //这里设置的是刚才的 linklist.json 文件路径
        $.getJSON('/links/linklist.json', function (data) {
            that.render(data)
        })
    },
    render: function (data) {
        var html,
            nickname,
            avatar,
            site,
            li = ''
        for (var i = 0; i < data.length; i++) {
            nickname = data[i].nickname
            avatar = data[i].avatar
            site = data[i].site
            description = data[i].description || ''
            li += '<div class="card">' +
                '<img class="ava" src="' + avatar + '" />' +
                '<div class="card-header"><div>' +
                ' <a href="' + site + '" target="_blank">' + nickname + '</a></div>' +
                '<div class="info">'+description+'</div></div></div>'
        }
        $('.link-navigation').append(li)
    },
}
link.init()
