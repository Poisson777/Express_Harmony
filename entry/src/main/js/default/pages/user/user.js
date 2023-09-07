import prompt from '@system.prompt';
import router from '@system.router';

export default {
    data: {
        uid:0,
        title: "",
        companyId:"",
        companyIntro:"",
        companyContact:""
    },
    onInit() {
        console.info("user的uid"+this.uid);
        this.companyId="公司名称:"+"东风快递";
        this.companyIntro="公司简介:"+"我司是物流配送、汽车运输、铁路运输、仓储，跨区域、网络化、信息化、智能化、具有供应链管理能力的综合性物流公司。" +
        "专人全程跟踪,专人信息反馈,全天以24小时竭诚服务,并且保证签收单100%返回。";
        this.companyContact="联系方式:"+"15012312312";
    },
    GotoSend(){

        router.push({
            uri: 'pages/userSend/userSend',
            params: {
                uid:this.uid,
            },
        })
    },
    GotoMail(){
        router.push({
            uri: "pages/user/user",
            params: {

            },
        })
    },
    GotoSearch(){
        router.push({
            uri: "pages/userSearch/userSearch",
            params: {

            },
        })
    },
    GotoUserCenter(){
        router.push({
            uri: "pages/userCenter/userCenter",
            params: {

            },
        })
    }
}
