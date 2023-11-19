<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/lib/common';






const codeJS = `const baseValue = prompt('Enter the base of a triangle: ');
const heightValue = prompt('Enter the height of a triangle: ');

// calculate the area
const areaValue = (baseValue * heightValue) / 2;`;

const codePY = `# Python Program to calculate the square root

# Note: change this value for a different result
num = 8 

# To take the input from the user
#num = float(input('Enter a number: '))`



function codeChange(e) {
    console.log("Code change", e)
}


onMounted(() => {

});



</script>
<template>
    <div>
        asdd
        <div class="p-3 bg-gray-100 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">

            <code-editor :hljs="hljs" :code="codePY" lang="python" @edit="codeChange($event)">
            </code-editor>
        </div>
        <div>asd</div>

        <div class="p-3 bg-gray-100 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
            <code-editor :hljs="hljs" :code="codeJS" lang="javascript" @edit="codeChange($event)">
            </code-editor>
        </div>










        <highlightjs language="js" code="# Python Program to calculate the square root

# Note: change this value for a different result
num = 8 

# To take the input from the user
#num = float(input('Enter a number: '))

num_sqrt = num ** 0.5
print('The square root of %0.3f is %0.3f'%(num ,num_sqrt))" />
    </div>
</template>