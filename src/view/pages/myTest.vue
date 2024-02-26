<script setup>
//components
import NavBar from '@/components/home/NavBar.vue'
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';

import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/display/placeholder.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/theme/dracula.css";

const initPyCode = `def my_function(x):\n return x`

const cmOptions = {
    mode: "text/x-python", // Language mode
    theme: "dracula", // Theme
};

</script>
<template>
    <NavBar></NavBar>
    <div class="layout-main-container">myTest</div>

    <Codemirror class="CodeMirror" v-model:value="initPyCode" :options="cmOptions" border placeholder="test placeholder"
        :height="200" @change="change" />
</template>

<style scoped>
.CodeMirror {
    font-family: Arial, monospace;
    font-size: 20px;
}
</style>
