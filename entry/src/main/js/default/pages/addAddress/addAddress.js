import prompt from '@system.prompt';
import router from '@system.router';
export default {
    data: {
        title: "",
        nametext:"",
        teltext:"",
        addtext:""
    },
    onInit() {
        this.title = "";
        this.nametext="";
        this.teltext="";
        this.addtext="";
    },
    back(){
        router.back({
            path: "pages/addressBook/addressBook"
        })
    },
    change(e){
        this.nametext=e.text;
        console.log(this.teltext)
        prompt.showToast({
            message: 'value: ' + e.text+ ', lines: ' + e.lines + ', height: ' + e.height,
            duration: 3000,
        });
    },
    change1(e){
        this.teltext=e.text;
        prompt.showToast({
            message: 'value: ' + e.text + ', lines: ' + e.lines + ', height: ' + e.height,
            duration: 3000,
        });
    },
    change2(e){
        this.addtext=e.text;
        prompt.showToast({
            message: 'value: ' + e.text + ', lines: ' + e.lines + ', height: ' + e.height,
            duration: 3000,
        });
    },
    send(){
        prompt.showToast({
            message: '姓名: '+this.nametext+"电话:"+this.teltext+"地址："+this.addtext,
            duration: 3000,
        });
        router.back({
            path: "pages/addressBook/addressBook"
        })
    }
}
