<template>
<div>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
   <div class="acc_sc" style="width:100%;"> 
            <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
              <Button type="info">上传图片</Button>
            </Upload>
               <Input type="text" v-model="data" placeholder="Username" v-if="data!=''" style="float:left;width:200px"></Input>
                         <a v-clipboard:copy="data" v-clipboard:success="onCopy"  disabled
                             v-clipboard:error="onError" href="javascript:;"
                              id="copyBtn" class="link-copy" v-if="data!=''">
                               <Button type="primary" class="btnstyle">复制</Button>
                            </a>
            <div class="clearfix"></div>      
        </div>
          <div class="clearfix"></div>
</div>
</template>

<script>
import { BASICURL } from "@/service/getData";
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "@/libs/tools";
export default {
  name: "Editor",
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      data: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: "html",
      validator: val => {
        return oneOf(val, ["html", "text"]);
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId() {
      return `editor${this._uid}`;
    }
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val);
    },
    aliHandleSuccess(res, file) {
      this.data = BASICURL + res.ret_code;
    },
    onCopy(e) {
      this.$Message.success("复制成功");
    },
    onError(e) {
      this.$Message.error("复制失败");
    }
  },
  mounted() {
    this.editor = new Editor(`#${this.editorId}`);
    this.editor.customConfig.onchange = html => {
      let text = this.editor.txt.text();
      if (this.cache) localStorage.editorCache = html;
      this.$emit("input", this.valueType === "html" ? html : text);
      this.$emit("on-change", html, text);
    };
    this.editor.customConfig.onchangeTimeout = this.changeInterval;
    // create这个方法一定要在所有配置项之后调用
    this.editor.create();
    // 如果本地有存储加载本地存储内容
    let html = this.value || localStorage.editorCache;
    if (html) this.editor.txt.html(html);
  }
};
</script>

<style>
</style>
