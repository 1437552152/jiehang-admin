<template>
  <div> 
      <Button type="primary"  @click="reflash">刷新</Button>
     <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
      <Row class="pageWrapper" >
        <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
      </Row>
        <Modal
    v-model="UPModal" title="展示报名列表"
   @on-ok="okUP"  @on-cancel="cancel">
        <ul>
            <li><span>学生姓名:</span>{{goData.studentName}}</li>
            <li><span>手机号:</span>{{goData.phone}}</li>
            <li><span>QQ:</span>{{goData.QQ}}</li>
            <li><span>毕业类型:</span>{{goData.biyeType}}</li>
            <li><span>所在城市:</span>{{goData.city}}</li>
            <li><span>邮箱:</span>{{goData.email}}</li>
            <li><span>考试语言:</span>{{goData.language}}</li>
            <li><span>语言分数:</span>{{goData.langscore}}</li>
            <li><span>主修课程:</span>{{goData.major}}</li>
            <li><span>想去的国家:</span>{{goData.wantCountry}}</li>
            <li><span>想去的学校:</span>{{goData.wantSchool}}</li>
            <li><span>想学的专业:</span>{{goData.wantmajor}}</li>
            <li><span>微信号:</span>{{goData.wechat}}</li>
            <li><span>学历:</span>{{goData.xueli}}</li>
        </ul>
    </Modal>
  </div>
</template>
<script>
import { reportlist, reportdelete } from "@/service/getData";
export default {
  name: "report",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      goData:{},
      addModal: false,
      UPModal: false,
      tableTitle: [
        {
          title: "姓名",
          key: "studentName"
        },
        {
          title: "手机",
          key: "phone"
        },
        {
          title: "电子邮箱",
          key: "email"
        },
        {
          title: "QQ号",
          key: "QQ"
        },
        {
          title: "所在城市",
          key: "city"
        },
        {
          title: "留言时间",
          key: "reportTime"
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.Id;
            const row = params.row;
            let that = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      that.godelete(id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      that.UPModal = true;
                      that.goShow(row);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    reflash() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    okUP() {
      this.UPModal = false;
    },
    cancel() {
      this.UPModal = false;
    },
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    getData(obj) {
      reportlist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    goShow(object) {
      this.goData = object;
    },

    godelete(id) {
      reportdelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
  }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
ul,li{list-style: none;}
li{
  margin-top: 20px;
  font-size: 16px;
}
li span{color: red;margin-right:5px;font-weight: bold}
ul{margin-left: 40px;}
</style>
