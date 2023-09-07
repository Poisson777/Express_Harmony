import router from '@system.router';
export default {
    data: {
        uid:0,
        title: "你好",
        menus:[{menu:"我要寄件","path":"common/images/邮件1.png","path1":"common/images/邮件2.png"},
               {menu:"快件查询","path":"common/images/搜索1.png","path1":"common/images/搜索2.png"},
               {menu:"个人中心","path":"common/images/个人中心1.png","path1":"common/images/个人中心2.png"}],
        props: ['cD','uD']
    },
    onInit() {
    },
    GotoPages(index,u){
        this.uid=this.uD;
        console.info("导航栏1的uid"+this.uid);
        console.info("cd++"+this.cD)
        console.info("导航栏2的uid"+this.uid);
        if(index==0)
        {
            router.push({
                uri: 'pages/user/user',
                params: {
                    uid:this.uid,
                },
            })
        }
        else if(index==1)
        {
            router.push({
                uri: 'pages/userSearch/userSearch',
                params: {
                    uid:this.uid,
                },
            })
        }
        else
        {
            router.push({
                uri: "pages/userCenter/userCenter",
                params: {
                    uid:this.uid,
                },
            })
        }
    }
}
