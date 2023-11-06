<script>


export default {
    name: "FinalResults",
    data() {
        return {

        }
    },
    computed: {
        getArrayCorrectTasks() {
            return this.$store.getters.getArrayCorrectTasks
        },
    },
}

</script>

<template>
    <div class="container text-center py-5">
        <div class="title">Teszt végeredménye</div>
        <div class="d-inline-flex p-4 mb-5 bg-light">
            <div class="h4 m-4 ">

                <div v-for="task in this.$store.state.tasks" :key="task.id">
                    <div v-if="task.type != 'info'">
                        <div>{{ task.id }}. oldal: {{ getArrayCorrectTasks[task.id] }} pont</div>
                    </div>
                </div>
                <br>
                összpontszám: {{ this.$store.state.result }}
            </div>

        </div>
    </div>
</template>
