import router from '@system.router'
import prompt from '@system.prompt';
import http from '@ohos.net.http';

export default {
    data: {
        title: "",
        listdatas: [{
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张三",
                        post: "扫地",
                        age: "23"
                    }, {
                        name: "张4",
                        post: "扫地",
                        age: "23"
                    },],
        //第几页
        currentnum: 1,
        //每页几条
        fixednum: 5,
        //分页的数据结果集:
        pagelists: [],
        text: "加载更多",
        flag: false
    },
    onInit() {
        this.listdatas = new Array();
        this.title = "Hello World";
        let httpRequest = http.createHttp();
        httpRequest.on('headerReceive', (err, data) => {
        });
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/admin/getExpressmanList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    page_num: 1,
                    page_size: 100,
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
                console.info('cookies:' + data.cookies); //
                var json = JSON.parse(data.result)
                console.info(json.code)
                if (json.code == 200) {
                    console.info("成功")
                    console.info(JSON.stringify(json))
                    var mydata = json.data.data;
                    console.info(mydata)
                    for (var i = 0;i < mydata.length; i++) {
                        this.listdatas.push({
                            post: "快递员",
                            age: 23,
                            name: mydata[i].real_name
                        })
                    }
                    this.showData(this.currentnum);
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );

    },
    to_sent() {
        router.push({
            uri: 'pages/manage/manage',
            params: {},
        });
    },
    loaddata() {
        ++this.currentnum;
        this.showData(this.currentnum);
    },
    showData(curnum) {
        //36/5=7..1  8页
        //三元运算符
        let pageSize = this.listdatas.length % this.fixednum == 0 ?
            this.listdatas.length / this.fixednum : Math.floor(this.listdatas.length / this.fixednum) + 1;

        if (curnum > pageSize) {
            prompt.showToast({
                message: "数据已经到底了",
                duration: 4000
            })

            this.text = "数据已经到底了";
            this.flag = true;


        }
        else {
            //执行分页  第一个参数:从0开始  第二个参数:不到end  (end-1)
            this.pagelists = this.listdatas;
        }
        console.log(JSON.stringify(this.pagelists))
    }
}
