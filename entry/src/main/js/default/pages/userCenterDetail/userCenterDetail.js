import router from '@system.router';
export default {
    data: {
        uid:0,
        title: "",
        id:"",
        userName:"",
        realName:"",
        info:"",
        email:"",
        face:"",
        weburl:"http://175.27.240.185:8080/img/",
        imageurl:"",
        phone:"",
    },
    onInit() {
        this.imageurl=this.weburl+this.face;
//        this.title = "Hello World";
//        this.realName="真实姓名";
//        this.userName="哈哈大王";
//        this.id="12312312321";
//        this.info="个人简介";
//        this.mail="111111111@qq.com";
    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
    GotoModify(){
        router.push({
            uri: "pages/userModify/userModify",
            params: {
                uid:this.uid,
                userName:this.userName,
                realName:this.realName,
                email:this.email,
                info:this.info,
                id:this.id,
                face:this.face,
                phone:this.phone,
            },
        })
    }
}
