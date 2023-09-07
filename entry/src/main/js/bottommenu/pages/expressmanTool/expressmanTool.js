import router from '@system.router';
export default {
    data: {
        mid:0,
        title: "你好",
        menus:[{menu:"首页","path":"common/images/邮件1.png","path1":"common/images/邮件2.png"},
               {menu:"服务","path":"common/images/搜索1.png","path1":"common/images/搜索2.png"},
               {menu:"个人中心","path":"common/images/个人中心1.png","path1":"common/images/个人中心2.png"}],
        props: ['cD','uD']
    },
    onInit() {
    },
    GotoPages(index,u){
        this.mid=this.uD;

        if(index==0)
        {
            router.push({
                uri: 'pages/deliveryman/deliveryman',
                params: {
                    mid:this.mid,
                },
            })
        }
        else if(index==1)
        {
            router.push({
                uri: 'pages/deliverymanServe/deliverymanServe',
                params: {
                    mid:this.mid,
                },
            })
        }
        else
        {
            router.push({
                uri: "pages/deliverymanCenter/deliverymanCenter",
                params: {
                    mid:this.mid,
                },
            })
        }
    }
}
