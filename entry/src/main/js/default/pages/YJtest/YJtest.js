import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        mid:0,
        nid:0,
        trackNumber:"",
        lanjian:"待揽件",
        state:"待揽件",
        //建议大家1.本地数据  2.网络数据
        //为什么要分页？
        // 分页会减少前端加载的负荷，提升页面执行的性能，带来良好的用户体验。
        //100条数据，100条数据一次性加载，会带来浪费。
        //如果从网络请求数据，分页会减轻服务器的压力和传输的压力。
        // 移动端分页 ，加载更多
        // 第几页，每页几条  固定10条，数组的内置的方法
        listdatas:[{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   },{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   },{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   },{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   },{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   },{
                       id:"DF456456456",
                       from:"福州市",
                       to:"泉州",
                   }],
        //第几页
        currentnum:1,
        //每页几条
        fixednum:5,
        //分页的数据结果集:
        pagelists:[],
        text:"加载更多",
        flag:false
    },
    onInit() {
        this.showData(this.currentnum);

    },
    changetrack(e) {
        this.trackNumber=e.value;
    },
    search(){

    },
    search_waitPick(){
        this.lanjian="去揽件";
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getWaitSendExpressByNid",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    nid:this.nid,
                    page_size:5,
                    page_num:1

                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result1:' + data.result);
                console.info('code1:' + data.responseCode);
                var json=JSON.parse(data.result)
                console.info(json.code)
                console.info(json.message)
                var list=json.data.data;
                this.pagelists.push.apply(this.pagelists,list)
                // this.listdatas=json.data.data
                if(json.code==200){
                    prompt.showToast({
                        message: 'hao',
                        duration: 3000,
                    });

                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
        /**/

    },
    search_Picked(){
        this.lanjian="查看详情";
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    mid:this.mid,
                    state:"配送中",
                    page_num:this.currentnum,
                    page_size:5,

                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result1:' + data.result);
                console.info('code1:' + data.responseCode);
                var json=JSON.parse(data.result)
                console.info(json.code)
                console.info(json.message)
                // this.listdatas=json.data.data
                if(json.code==200){
                    prompt.showToast({
                        message: 'hao',
                        duration: 3000,
                    });

                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    search_receipt(){
        this.lanjian="查看详情";
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    mid:this.mid,
                    state:"已送达",
                    page_num:1,
                    page_size:5,

                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result1:' + data.result);
                console.info('code1:' + data.responseCode);
                var json=JSON.parse(data.result)
                console.info(json.code)
                console.info(json.message)
                // this.listdatas=json.data.data
                if(json.code==200){
                    prompt.showToast({
                        message: 'hao',
                        duration: 3000,
                    });

                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },


    loaddata()
    {
        ++this.currentnum;
        this.showData(this.currentnum);
    },
    showData(curnum)
    {
        //36/5=7..1  8页
        //三元运算符
        let  pageSize=this.listdatas.length%this.fixednum==0?
            this.listdatas.length/this.fixednum:Math.floor(this.listdatas.length/this.fixednum)+1;

        if(curnum>pageSize)
        {
            prompt.showToast({
                message:"用户您好，数据已经到底了",
                duration:4000

            })

            this.text="用户您好，数据已经到底了";
            this.flag=true;


        }
        else
        {
            //执行分页  第一个参数:从0开始  第二个参数:不到end  (end-1)
            this.pagelists=this.listdatas.slice(0,curnum*this.fixednum);
        }


    },

    deliSesrch(e){
        console.log(e)
        if(e.target.id==="btu1")
        {
            this.lanjian="点击了按钮1";
        }
    },


}



