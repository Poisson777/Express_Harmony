import router from '@system.router';
export default {
    data: {
        title: "",
        address:[{name:"名字",tel:"12345123452",add:"福建省福州市XXXXXX"},
                 {name:"名字2",tel:"12543543542",add:"福建省福州市XXXXXX"}]
    },
    onInit() {

    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
    GotoAdd(){
        console.log(11111);
        router.push({
            uri: "pages/addAddress/addAddress",
            params: {

            },
        })
    }
}
