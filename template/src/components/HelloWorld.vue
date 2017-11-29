<template>
<div>
  <div class="nav">
    <span>门岗进出管理</span>
    <span class="time">{{time}}</span>
  </div>
  <div class="content">
    <div><img src="../assets/tsl.jpeg"></div>
    <div class="info">
      <ul>
        <li>
          <span>ID卡号</span>
          <input :disabled="idcardDisabled" ref="idcard" v-model="idcard">
          <!--button class="btn" style="width: 50px;font-size: 14px;height: 25px;line-height: 25px;margin-left: 10px;" @click="start">发卡</button>
          <span class="tips0">（注意：点击发卡开始入园）</span-->
          <!--span class="tips">点击发卡开始入园</span-->
        </li>
        <li>
          <span>车牌号</span>
          <input v-model="carNo" ref="carNo">
        </li>
        <li>
          <span>车型</span>
          <select v-model="carType">
            <option v-for="item in carTypes" :key="item.value" :value="item.value">{{item.text}}</option>  
          </select>
        </li>
        <li>
          <span>停车费</span>
          <span style="width: 150px;display:inline-block;">¥ {{carCost}}</span>
        </li>
        <li>
          <span>补缴</span>
          <span style="display:inline-block;width:180px;">
            <input style="width:100px;" id="overloadCost" type="number" v-model="overloadCost"> 元
          </span>
          <span class="title">入园时间</span>
          <span style="width: 150px;display:inline-block;">{{inTime}}</span>
        </li>
        <li>
          <span>合计</span>
          <span style="font-weight:bold;font-size:20px;color:red;display:inline-block;width:150px;">¥ {{totalCost}}</span>
          <span class="title" style="margin-left: 30px;">出园时间</span>
          <span>{{outTime}}</span>
        </li>
        <li class="status">
          <span>{{statusText}}</span>
          <button class="btn" :disabled="btnDisabled" @click="start">{{statusBtn}}</button>
        </li>
      </ul>
    </div>
  </div>
  <div class="recent">
    <div class="title">最近入园车辆</div>
    <table>
      <thead>
        <tr>
          <th>ID卡号</th>
          <th>车牌号</th>
          <th>入园时间</th>
          <th>出园时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1243242-123148</td>
          <td>蒙A88888</td>
          <td>2017-11-14 14:21:30</td>
          <td>-</td>
          <td>已入园</td>
          <td><a href="javascript: void(0)">管理</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      time: '',
      inTime: '-',
      outTime: '-',
      carTypes: [
        {value: 1, text: '半挂车'},
        {value: 2, text: '全挂车'},
      ],
      carType: 1,
      costConfig: {
        'v1': 60.0,
        'v2': 80.0
      },
      overloadCost: 0,
      idcard: '',
      currentIdCard: '',
      idcardDisabled: true,
      carNo: '',
      currentCarNo: '',
      status: 0,
      btnDisabled: false,
      preBtnStatus: ''
    }
  },
  created () {
    this.time = new Date().Format("yyyy-MM-dd hh:mm:ss")
    this._time = setInterval(() => {
      this.time = new Date().Format("yyyy-MM-dd hh:mm:ss")
    }, 1000)  
    window.abc = this
  },
  computed: {
    carCost () {
      return this.costConfig['v'+this.carType]
    },
    totalCost () {
      return (this.carCost - 0) + (this.overloadCost - 0)
    },
    statusText () {
      switch (this.status) {
        case 0:
          return '空闲'
        case 2:
          return '自动缴费中'
        case 3:
          return '待现金支付'
        case 4:
          return '已入园'
        case 5:
          return '代缴超载费'
        case 6:
          return '已出园'
        case 1:
          if (!this.currentIdCard ||this.currentIdCard.length != 8) {
            return 'ID卡号错误'
          }
          if (!this.currentCarNo || this.currentCarNo.length < 1) {
            return '车牌号缺失'
          }
          if (this.currentCarNo.length != 7) {
            return '车牌号不正确'
          }
          break
        default: 
          return '异常'
      }
    },
    statusBtn () {
      switch (this.status) {
        case 1:
          this.preBtnStatus = '补充信息'
          break
        case 2:
          this.preBtnStatus = '支付中'
          break
        case 3:
          this.preBtnStatus = '已现金支付'
          break
        case 4:
          this.preBtnStatus = '出园'
          break
        case 5:
          this.preBtnStatus = '已缴差额'
          break
        default:
          this.preBtnStatus = '发卡'
      } 
      return this.preBtnStatus
    }
  },
  methods: {
    reset () {
      this.inTime = '-'
      this.outTime = '-'
      this.carType = 1
      this.overloadCost = 0
      this.carNo = ''
      this.idcard = ''
      this.status = 0
      this.btnDisabled = false
      this.preBtnStatus = ''
    },
    start () {
      this.reset()
      this.idcardDisabled = false
      this.$nextTick(() => {
        this.$refs.idcard.focus()
      })
    },
    idcardChange (val) {
      if (!val || val.length != 8) {
        return
      }
      this.idcardDisabled = true
      this.status = 1
      if (this.currentIdCard == val) {
        this.autoCost()
        return
      }
      this.currentIdCard = val
      this.autoCost()
    },
    carNoChange (val) {
      if (this.status > 1 && this.status != 3) {
        this.carNo = this.currentCarNo
        this.$refs.carNo.blur()
        return
      }
      if (!val || val.length != 7) {
        return
      }
      this.currentCarNo = val
      this.autoCost()
      this.$refs.carNo.blur()
    },
    autoCost () {
      if (this.status != 1) {
        return
      }
      if (!this.currentIdCard || this.currentIdCard.length != 8 
          || !this.currentCarNo || this.currentCarNo.length != 7) {
        return
      }
      this.status = 2
      setTimeout(() => {
        this.status = 3
      }, 3000)
    },
    statusChange (val) {
      switch (val) {
        case 1:
        case 2:
          this.btnDisabled = true
          break
        default:
          this.btnDisabled = false
          break
      }
    }
  },
  desroyed () {
    clearInterval(this._time)
  },
  watch: {
    idcard (val) {
      this.idcardChange(val)
    },
    carNo (val) {
      this.carNoChange(val)
    },
    status (val) {
      this.statusChange(val)
    }
  }
}
</script>
<style>
.nav {
  background: #495060;
  height: 60px;
  line-height: 60px;
  color: #fff;
  padding: 0 20px;
  font-size: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,.7);
  margin-bottom: 3px;
}
.nav .time {
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-left: 10px;
}
.tips {
  font-size: 14px;
}
.tips0 {
  color: green;
  font-size: 16px; 
  font-weight: bold;
  display: inline-block;
  margin-left: 20px;
}
.content {
  display: flex;
}
.content img {
  width: 450px;
}
.content .info {
  padding: 20px 20px 20px 0;
  flex: 1;
}
.content .info li {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.content .info li>span:nth-child(1), .info .title {
  display: inline-block;
  width: 80px;
}
.info input {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 10px;
}
.info select {
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  width: 80px;
  font-size: 13px;
}
.info .status {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
.info .status>span:nth-child(1) {
  color: green;
  font-size: 25px;
  font-weight: bold;
  width: 200px !important;
}
.btn {
  font-size: 16px;
  border: none;
  background: red;
  color: #fff;
  padding: 0px 10px;
  height: 30px;
  line-height: 30px;
  width: 100px;
  border-radius: 3px;
  cursor: pointer;
}
.btn:disabled {
  background: #900909;
  color: #ccc;
}
.recent {
  margin-top: 50px;
  font-size: 14px;
}
.recent .title {
  margin: 0 0 10px 20px;
  font-weight: bold;
  font-size: 90%;
  color: #999;
}
.recent table {
  width: 100%;
}
.recent td {
  min-width: 150px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
</style>
