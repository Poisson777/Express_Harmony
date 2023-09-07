import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        mid:0,
        page_num:0,
        page_size:5,

        data:[],
        data1:[],
        data2:[],
        data3:[],
        Province:"",
        City:"",
        Area:"",
        ProvinceText:"",
        CityText:"",
        AreaText:"",
        Ppid:0,
        Ccid:0,
        Acid:0,
    },
    onInit() {
        this.ProvinceText="省";
        this.CityText="市";
        this.AreaText="区";
        this.getProvinceList();

    },
    to_search(){
        router.push({
            uri: 'pages/deliverymanServe/deliverymanServe',
            params: {
                mid:this.mid,
                location:this.Province+this.City+this.Area
            },
        });
    },
    to_center(){
        router.push({
            uri: 'pages/deliverymanCenter/deliverymanCenter',
            params: {
                mid:this.mid,

            },
        });
    },
    to_door(){
        router.push({
            uri: 'pages/deliverymanDoor/deliverymanDoor',
            params: {
                mid:this.mid,
                location:this.Province+this.City+this.Area

            },
        });
    },
    onMenuSelected(e) {
        var index=e.value;
        this.Ppid=this.data1[index].Id;
        this.Province=this.data1[index].Name;
        this.ProvinceText=this.Province;
        this.Cpid=0;
        this.City="";
        this.CityText="市";
        this.data2=new Array();
        this.Area="";
        this.Apid=0;
        this.AreaText="区";
        this.data3=new Array();;
        this.getCityList();
        prompt.showToast({
            message: e.value
        })
    },
    onMenuSelected2(e) {
        var index=e.value;
        this.Cpid=this.data2[index].Id;
        this.City=this.data2[index].Name;
        this.CityText=this.City;
        this.Area="";
        this.Apid=0;
        this.AreaText="区";
        this.data3=new Array();
        console.info("data3:"+this.data3);
        this.getAreaList();
        prompt.showToast({
            message: e.value
        })
    },
    onMenuSelected3(e) {
        console.info(111111);
        var index=e.value;
        this.Apid=this.data3[index].Id;
        this.Area=this.data3[index].Name;
        this.AreaText=this.Area;
        prompt.showToast({
            message: e.value
        })
    },
    showMenu() {
        this.$element("apiMenu1").show({x:20,y:170});
    },
    showMenu2() {
        this.$element("apiMenu2").show({x:20,y:170});
    },
    showMenu3() {
        this.$element("apiMenu3").show({x:20,y:170});
    },
    getAreaList(){
        let httpRequest3 = http.createHttp();
        console.info("hhh" + JSON.stringify(httpRequest3))
        httpRequest3.on('headerReceive', (err, data) => {
            if (!err) {
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
            } else {
                console.info('error:' + JSON.stringify(err));
            }
        });
        console.info("hhh2" + JSON.stringify(httpRequest3))
        httpRequest3.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/global/getAreaList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    pid:this.Cpid,
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                // data.header为http响应头，可根据业务需要进行解析
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
                var json=JSON.parse(data.result)
                this.data3=json.data;
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest3.destroy();
            }
        })
    },
    getCityList(){
        let httpRequest1 = http.createHttp();
        console.info("hhh" + JSON.stringify(httpRequest1))
        httpRequest1.on('headerReceive', (err, data) => {
            if (!err) {
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
            } else {
                console.info('error:' + JSON.stringify(err));
            }
        });
        console.info("hhh2" + JSON.stringify(httpRequest1))
        httpRequest1.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/global/getCityList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    pid:this.Ppid,
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                // data.header为http响应头，可根据业务需要进行解析
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
                var json=JSON.parse(data.result)
                this.data2=json.data;
                console.info("dizhi:"+this.data2[0].Name)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest1.destroy();
            }
        })
    },
    getProvinceList(){
        let httpRequest = http.createHttp();
        console.info("hhh" + JSON.stringify(httpRequest))
        httpRequest.on('headerReceive', (err, data) => {
            if (!err) {
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
            } else {
                console.info('error:' + JSON.stringify(err));
            }
        });
        console.info("hhh2" + JSON.stringify(httpRequest))
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/global/getProvinceList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {

                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                // data.header为http响应头，可根据业务需要进行解析
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
                var json=JSON.parse(data.result)
                this.data1=json.data;
                console.info("dizhi:"+this.data1[0].Name)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        })
    }



}
