<template>
  <!-- 年报表 -->
  <div class="yearReportList2">
    <p class="first-box-title" style="background-color:#ab7cd1">年报表</p>
    <div class="box-icon">
      <div class="box-icon-dataRing">
        <span>选择日期</span>
        <!-- 日期选择 -->
        <el-date-picker
          format="yyyy年"
          value-format="yyyy-"
          size="small"
          v-model="yearReportDate"
          type="year"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="box-icon-elButton">
        <el-button
          @click="yearReportView"
          size="medium"
          class="elButton"
          type="primary"
        >&nbsp;&nbsp;查看&nbsp;&nbsp;</el-button>
        <el-button
          @click="yearReportDownload"
          size="medium"
          class="elButton"
          type="info"
        >&nbsp;&nbsp;下载&nbsp;&nbsp;</el-button>
        <el-button @click="yearReportPrint" size="medium" class="elButton" type="info">在线打印</el-button>

        <!-- 查看弹窗 -->
        <el-dialog class="dialog-table" :title="dialogTitle" :visible.sync="dialogTableVisible">
          <!-- 弹出列表 -->
          <el-table border :data="dialogYearData">
            <el-table-column align="center" property="eidDescription" label="项目名称"></el-table-column>
            <el-table-column align="center" property="ncount" label="接入设备"></el-table-column>
            <el-table-column align="center" property="ecount" label="设备总数"></el-table-column>
            <el-table-column align="center" property="alerm1" label="报警类型(1)"></el-table-column>
            <el-table-column align="center" property="alermCount1" label="报警次数(1)"></el-table-column>
            <el-table-column align="center" property="alerm2" label="报警类型(2)"></el-table-column>
            <el-table-column align="center" property="alermCount2" label="报警次数(2)"></el-table-column>
            <el-table-column align="center" property="alerm3" label="报警类型(3)"></el-table-column>
            <el-table-column align="center" property="alermCount3" label="报警次数(3)"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 日期选择值
      yearReportDate: "",
      // 禁选日期
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      // 对话框标题
      dialogTitle: "",
      // 弹出dialog列表
      dialogYearData: [],
      // 是否可见
      dialogTableVisible: false
    };
  },
  methods: {
    // 跳转判断
    judge() {
      if (!this.yearReportDate) {
        this.$alert("请先选择日期", "您没有选择日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        return true;
      }
    },
    // 查看
    yearReportView() {
      if (!this.judge()) {
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yDateStart = this.yearReportDate + "01-01";
        const yDateEnd = this.yearReportDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = yDateStart;
        yearSendData.endDate = yDateEnd;
        yearSendData.cycle = 6;
        // 发送请求
        this.$http
          .post("report/reportByDate", yearSendData)
          .then(response => {
            let resData = response.data.data;
            let dialogData = {};
            dialogData.eidDescription = resData.eidDescription;
            dialogData.ncount = resData.ncount;
            dialogData.ecount = resData.ecount;
            dialogData.alerm1 = resData.countResults[0].type;
            dialogData.alermCount1 = resData.countResults[0].count;
            dialogData.alerm2 = resData.countResults[1].type;
            dialogData.alermCount2 = resData.countResults[1].count;
            dialogData.alerm3 = resData.countResults[2].type;
            dialogData.alermCount3 = resData.countResults[2].count;
            // 弹出框的数据
            let xx = [];
            xx.push(dialogData);
            this.dialogYearData = xx;
            this.dialogTitle =
              yDateStart +
              " 至 " +
              yDateEnd +
              handleValue[0] +
              handleValue[1] +
              " 年报表";
            this.dialogTableVisible = true;
          })
          .catch(err => {
            console.log("err", err);
            this.$alert("请求失败", "列表获取失败", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    // 下载
    yearReportDownload() {
      if (!this.judge()) {
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yDateStart = this.yearReportDate + "01-01";
        const yDateEnd = this.yearReportDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需要数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = yDateStart;
        yearSendData.endDate = yDateEnd;
        yearSendData.cycle = 6;
        // 发送请求
        this.$http
          .post("report/exportByDate", yearSendData)
          .then(response => {
            console.log("response", response);
          })
          .catch(err => {
            console.log("err", err);
            this.$alert("请求失败", "列表获取失败", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    // 在线打印
    async yearReportPrint() {
      if (!this.judge()) {
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yDateStart = this.yearReportDate + "01-01";
        const yDateEnd = this.yearReportDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = yDateStart;
        yearSendData.endDate = yDateEnd;
        yearSendData.cycle = 6;
        // 发送请求
        await this.$http
          .post("report/reportByDate", yearSendData)
          .then(response => {
            if (response.data.code == 0) {
              let resData = response.data.data;
              let dialogData = {};
              dialogData.eidDescription = resData.eidDescription;
              dialogData.ncount = resData.ncount;
              dialogData.ecount = resData.ecount;
              dialogData.alerm1 = resData.countResults[0].type;
              dialogData.alermCount1 = resData.countResults[0].count;
              dialogData.alerm2 = resData.countResults[1].type;
              dialogData.alermCount2 = resData.countResults[1].count;
              dialogData.alerm3 = resData.countResults[2].type;
              dialogData.alermCount3 = resData.countResults[2].count;
              // 弹出框标题
              this.$store.state.dayPrintTitle =
                yDateStart +
                " 至 " +
                yDateEnd +
                handleValue[0] +
                handleValue[1] +
                " 年报表";
              let dayPrint = [];
              dayPrint.push(dialogData);
              this.$store.state.dayPrint = dayPrint;
              sessionStorage.setItem(
                "title",
                JSON.stringify(this.$store.state.dayPrintTitle)
              );
              sessionStorage.setItem(
                "dialogData",
                JSON.stringify(this.$store.state.dayPrint)
              );
              this.$router.push({ path: "/reportPrint" });
            }
          })
          .catch(err => {
            this.$alert("请求失败", "打印请求失败", {
              confirmButtonText: "确定"
            });
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/6.systemReport/reportIcon";
</style>
<style lang="less">
.yearReportList2 {
  .dialog-table {
    .el-dialog__header {
      background-color: rgb(250, 236, 216);
    }
    .el-table {
      th {
        background-color: rgb(225, 243, 216); //#f0f9eb;
      }
    }
  }
}
</style>
