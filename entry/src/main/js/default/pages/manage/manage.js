import router from '@system.router'
//uid 是用户id
export default {
    data: {
        title: "",
    },
    onInit() {
        this.title = "Hello World";
    },
    to_center(){
        router.replace({
        uri: 'pages/manage_center/manage_center',
        params: {

        },
    });
    },
    to_be_delivered(){
        router.push({
            uri: 'pages/to_be_send/to_be_send',
            params: {

            },
        });
    },
    help_send(){
        router.push({
            uri: 'pages/send/send',
            params: {
                type:"admin",
                nid:this.nid
            },
        });
    },
    search_storehouse(){
        router.push({
            uri: 'pages/storemanage/storemanage',
            params: {
            nid:this.nid
            },
        });
    }
}
