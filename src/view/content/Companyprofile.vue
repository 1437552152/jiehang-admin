<template>
  <div> 
      <Button type="primary"  @click="reflash">刷新</Button>
     <Button type="primary"    @click="add" style="float:right">增加</Button>
     <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
  </div>
</template>
<script>
import { companylist, companydelete } from "@/service/getData";
export default {
  name: "Companyprofile",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      tableTitle: [
        {
          title: "关键词",
          key: "keywords"
        },
        // {
        //   title: "语言状态",
        //   key: "language",
        //   render(h, params) {
        //     let text = "";
        //     if (params.row.language == "cs") {
        //       text = "捷克语";
        //     } else if (params.row.language == "zh") {
        //       text = "中文";
        //     } else if (params.row.language == "en") {
        //       text = "英语";
        //     } else if (params.row.language == "fr") {
        //       text = "法语";
        //     }
        //     return h("div", text);
        //   }
        // },
        {
          title: "类型",
          key: "type",
          render(h, params) {
            let text = "";
            if (params.row.type == "0") {
              text = "成员介绍";
            } else if (params.row.type == "1") {
              text = "联系我们";
            } else if (params.row.type == "2") {
              text = "关于我们";
            } else if (params.row.type == "3") {
              text = "加入我们";
            } else if (params.row.type == "4") {
              text = "法律声明及隐私权政策";
            }
            return h("div", text);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.Id;
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
                      this.godelete(id);
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
                      const route = {
                        name: "Companydetail",
                        query: {
                          id
                        },
                        meta: {
                          title: `参数-${id}`
                        }
                      };
                      this.$router.push(route);
                    }
                  }
                },
                "修改"
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
      this.getData();
    },
    add() {
      let id = -1;
      const route = {
        name: "Companydetail",
        query: {
          id
        },
        meta: {
          title: `参数-${id}`
        }
      };
      this.$router.push(route);
    },
    getData() {
      companylist().then(res => {
        this.tableData = res.data;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      companydelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData();
        } else {
          this.$Message.error("删除失败");
          this.getData();
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
</style>
