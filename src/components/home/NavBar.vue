<script>

export default {
    data() {
        return {
            items: [
                {
                    label: 'Bejelentkezés'
                },
                {
                    label: 'Teszt',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Tesztjeim',
                    icon: 'pi pi-book'
                },
                {
                    label: 'Teszt létrehozása',
                    icon: 'pi pi-plus',
                },
                {
                    label: 'Eredmények',
                    icon: 'pi pi-chart-bar',
                },
                {
                    label: 'Megosztás',
                    icon: 'pi pi-share-alt',
                }
            ]
        }
    },
    components: {

    },


}
</script>

<template>
    <router-view />
    <Menubar :model="items">
        <template #start>
            <Avatar style="margin-right: 2rem" size="large" shape="circle">
                <i class="pi pi-user" style="font-size: 2rem"></i>
            </Avatar>
        </template>
        <template #item="{ item, props }">
            <router-link to="/" v-ripple v-bind="props.action">
                <span style="margin-right: 5px" :class="item.icon" />
                <span>{{ item.label }}</span>
            </router-link>
        </template>
        <template #end>
            <div>
                <a href="https://github.com/FulopGergely/szakdolgozat/tree/CreateQuiz">
                    <img src="@/assets/github.svg" style="height: 30px" alt="GitHub">
                </a>

            </div>
        </template>
    </Menubar>
</template>

<style scoped>
.asd {
    margin-right: 0;
}
</style>
