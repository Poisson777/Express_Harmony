export default {
    data: {
        currentdata:0,
        title: "",
        menus:[{menu:"我要寄件","path":"common/images/邮件1.png","path1":"common/images/邮件2.png"},
               {menu:"快件查询","path":"common/images/搜索1.png","path1":"common/images/搜索2.png"},
               {menu:"个人中心","path":"common/images/个人中心1.png","path1":"common/images/个人中心2.png"}]
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    changemenu(index){
        this.currentdata=index;
        this.$element('swiper').swipeTo({index:index});
    }
}
