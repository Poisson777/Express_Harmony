import router from '@system.router';
export default {
    data: {
        title: "",
        text:""
    },
    onInit() {
        this.title = "Hello World";
        this.text="该app为福州大学2022级研究生专硕工程训练课程团队项目，用户端writed by 黄镔，" +
        "快递员端writed by 杨杰，管理员端writed by 黄志杰。目的为了实现快递系统。web端writed by" +
        "张富源、黄海彬、蔡倩倩。后端writed by 潘增滢、苏杰阳。"
    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
}
