import router from '@system.router';
export default {
    data: {
        title: "",
        text:"",
    },
    onInit() {
        this.title = "Hello World";
    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
}
