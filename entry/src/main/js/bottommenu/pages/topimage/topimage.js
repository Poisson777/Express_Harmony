export default {
    data: {
        frames: [
            {
                src: "common/images/轮播图2.png",
                duration:'10000s',
            },
            {
                src: "common/images/轮播图1.png",
                duration:'10000s',
            },
        ],
    },
    onCreate(){
        this.$refs.animator.start();
    },
    onInit() {

    }
}
