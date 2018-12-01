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
    v-model="UPModal" title="展示留言信息"
   @on-ok="okUP"  @on-cancel="cancel">
        <ul>
            <li><span>姓名:</span>{{goData.username}}</li>
            <li><span>手机号:</span>{{goData.phone}}</li>
            <li><span>QQ:</span>{{goData.QQ}}</li>    
            <li><span>邮箱:</span>{{goData.email}}</li> 
            <li><span>留言内容:</span>{{goData.content}}</li>   
                   
        </ul>
    </Modal>

     <Modal
    v-model="huifuModal" title="回复留言"
   @on-ok="ok"  @on-cancel="cancel">
        <ul>
            <li><span>姓名:</span>{{goData.username}}</li>
            <li><span>手机号:</span>{{goData.phone}}</li>
            <li><span>QQ:</span>{{goData.QQ}}</li>    
            <li><span>邮箱:</span>{{goData.email}}</li> 
            <li><span>留言内容:</span>{{goData.content}}</li>   
            <form style="margin-top:20px;">
               <Input v-model="article" type="textarea" :autosize="{minRows:5,maxRows:8}" placeholder="请填写回复内容..."/>
            </form>          
        </ul>
    </Modal>
  </div>
</template>
<script>
import { messagelist, messagedelete, messageupdate } from "@/service/getData";
export default {
  name: "message",
  data() {
    return {
      hf: false,
      article: "",
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      goData: {},
      UPModal: false,
      huifuModal: false,
      tableTitle: [
        {
          title: "姓名",
          key: "username"
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
          title: "留言内容",
          key: "content"
        },
         {
          title: "回复内容",
          key: "article"
        },
        {
          title: "回复状态",
          key: "status",
          render: (h, params) => {
            const status = params.row.status;
            let text = "";
            if (status == "0") {
              text = "未回复";
            } else if (status == "1") {
              text = "已回复";
            }
            return h("div", {}, text);
          }
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
                      const status = params.row.status;

                      that.UPModal = true;

                      that.goShow(row);
                    }
                  }
                },
                "查看"
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
                       const status = params.row.status;
                      if (status =='1') {
                        this.$Message.error("您已经回复了");
                      } else {
                        that.huifuModal = true;
                        that.id = params.row.Id;
                        console.log(that.id);
                        that.goShow(row);
                      }
                    }
                  }
                },
                "我要回复"
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
    ok() {
      let params = [];
      params["Id"] = this.id;
      params["article"] = this.article;
      messageupdate(params).then(res => {
        if (res.status == 200) {
          this.$Message.success("回复成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("回复失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },

    cancel() {
      this.UPModal = false;
      this.huifuModal = false;
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
      messagelist(obj).then(res => {
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
      messagedelete({ Id: id }).then(res => {
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
ul,
li {
  list-style: none;
}
li {
  margin-top: 20px;
  font-size: 16px;
}
li span {
  color: red;
  margin-right: 5px;
  font-weight: bold;
}
ul {
  margin-left: 40px;
}
</style>
