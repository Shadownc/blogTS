---
title: el-upload二次封装
date: 2021-09-27 22:08:52
categories:
- Vue
tags:
- Vue
---
elementUI el-upload二次封装
<!-- more -->
## 简单使用
``` js
<upload-part
      :action="action"
      :headers="headers"
      listType="picture-card"
      :data="formData"
      name="uploadify"
      :removeFile="removeFile"
      :limit="limit"
      :uploadChange="uploadChange"
      :hideUpload="hideUpload"
    ></upload-part>
    <script>
import uploadPart from "@/components/common/upload.vue";
export default {
  components: {
    uploadPart,
  },
  data() {
    return {
      action: "",//上传接口
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      formData: {
        formId:'xx',
        docId:new Date().getTime()
      },//上传额外参数
      limit: 1,//上传文件数量限制
      hideUpload: false,//超过限制隐藏上传按钮
    };
  },
  methods: {
    uploadChange(file, fileList) {
      if (fileList.length >= this.limit) {
        this.hideUpload = true;
      }
    },
    removeFile(file, fileList) {
       if (fileList.length < this.limit) {
        this.hideUpload = false;
      }
    }
  },
};
</script>
```
## 自定义上传
``` js
<upload-part
      :action="action"
      listType="picture-card"
      name="uploadify"
      :removeFile="removeFile"
      :limit="limit"
      :httpRequest="diyUpload"
      :fileList="fileList"
      :uploadChange="uploadChange"
      :hideUpload="hideUpload"
    ></upload-part>
<script>
  import uploadPart from "@/components/common/upload.vue";
  import api from 'xx/api'
  export default {
      components: {
        uploadPart,
      },
      data() {
        return {
          action: "",
          fileList:[],
          limit: 2,
          hideUpload: false,
        };
      },
      methods: {
        diyUpload(file) {
          const form = new FormData();
          form.append("uploadify", file.file);
          form.append("formId", "xx");
          form.append("docId", new Date().getTime());
          api.upload(form).then((res) => {
            if (res.success) {
              res.data.url = res.data.fullPath;//没有url需要赋值
              this.fileList.push(res.data)
            }
          });
        },
        uploadChange(file, fileList) {
        //自定义上传也可以放在此方法中 就不需要httpRequest了
          if (fileList.length >= this.limit) {
            this.hideUpload = true;
          }
        },
        removeFile(file, fileList) {
          //调用接口删除文件的同时需要把fileList里的也删除
          if (fileList.length < this.limit) {
            this.hideUpload = false;
          }
        },
      },
};
</script>
```
## 使用element 上传组件时界面抖动(百度查到是push导致的，但是我直接赋值好像并未解决，所以推荐css处理)
``` css
/* 推荐，实现简单 */ 
.el-upload-list__item.is-ready, 
.el-upload-list__item.is-uploading { display: none !important; }
```
## 完整代码
``` js
<template>
  <div>
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :data="data"
      :name="name"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :drag="drag"
      :accept="accept"
      :on-preview="handlePictureCardPreview"
      :on-remove="removeFile"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="uploadProgress"
      :on-change="uploadChange"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :list-type="listType"
      :auto-upload="autoUpload"
      :file-list="fileList"
      :http-request="httpRequest"
      :disabled="disabled"
      :limit="limit"
      :on-exceed="onExceed"
      :fileSize="fileSize"
      :class="{ 'icon-hide': hideUpload }"
    >
      <slot>
        <i class="el-icon-plus"></i>
      </slot>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    action: null,
    headers: {
      type: Object,
      default: () => {},
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: null,
    name: {
      type: String,
      default: "file",
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    accept: null,
    listType: null,
    autoUpload: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    httpRequest: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: null,
    uploadChange: null,
    beforeRemove: null,
    removeFile: null,
    uploadSuccess: null,
    uploadError: null,
    uploadProgress: null,
    onExceed: null,
    hideUpload: {
      type: Boolean,
      default: false,
    },
    fileSize: {
      type: Number,
      default: 10,
    },
    fileType: {
      type: String,
      default: "png|jpg|jpeg|gif",
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    beforeUpload(file) {
      const fileName = file.name;
      const ext = fileName
        .substring(fileName.lastIndexOf(".") + 1)
        .toLowerCase();
      if (this.fileType) {
        // 限制文件格式
        if (this.fileType.indexOf(ext) < 0) {
          this.$message.error("文件类型不合法，请上传" + this.fileType);
          return false;
        }
      }
      if (this.fileSize) {
        // 限制文件大小，单位为M
        const size = file.size / 1024 / 1024;
        if (size > this.fileSize) {
          this.$message.error("文件大小限制为" + this.fileSize + "M");
          return false;
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .icon-hide .el-upload {
  display: none;
}
</style>
```
