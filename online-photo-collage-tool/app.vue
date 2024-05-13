<template>
  <div id="app">
    <h1>Online Photo Collage Tool</h1>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      @vdropzone-file-added="handleFileAdded"
      @vdropzone-success="handleUploadSuccess"
    >
      <p>Drag and drop files here, or click to select files to upload.</p>
    </vue-dropzone>
    <div v-if="uploadedFiles.length > 0">
      <h2>Uploaded Files:</h2>
      <div v-for="(file, index) in uploadedFiles" :key="index">
        <img :src="'http://localhost:5000/uploads/' + file.filename" alt="Uploaded Image" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import vueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'App',
  components: {
    vueDropzone,
  },
  data() {
    return {
      uploadedFiles: [],
    };
  },
  methods: {
    async handleFileAdded(file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.uploadedFiles.push(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    handleUploadSuccess(file, response) {
      console.log('File uploaded successfully:', file, response);
    },
  },
};
</script>

<style>
#dropzone {
  margin: 20px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
}
</style>
