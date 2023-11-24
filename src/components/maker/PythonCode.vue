<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';








const codePY = `
def my_function():
  print("Hello from a function")
#comment
my_function()
`



function codeChange(e) {
    console.log("Code change", e)
}
</script>
<template>
    <div>

        <div class="m-5 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
            <code-editor :hljs="hljs" :code="codePY" lang="python" @edit="codeChange($event)">
            </code-editor>
        </div>
        <Button class="mb-5 ml-5">Futtatás</Button>


    </div>
</template>