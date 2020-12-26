//逻辑代码和页面进行分开,导入时也需要在页面代码下面导入,是需要页面先渲染完成

var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: []

    },
    methods: {
        async searchWeather() {
            // 原来需要拼接, 现在使用字符串模板
            // axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
            //     .then(function (response) {
            //         console.log(response)
            //     })
            //     .catch(
            //         function (err) {
            //             console.log(err)
            //         }
            //     )
            const { data: res } = await axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
            this.weatherList = res.data.forecast
        },
        changeCity(city) {
            this.city = city
            this.searchWeather()
        }
    }
})