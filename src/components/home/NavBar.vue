<script>

export default {
    data() {
        return {
            items: [
                {
                    label: 'Bejelentkezés',
                },
                {
                    label: 'Teszt',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Features',
                    icon: 'pi pi-star'
                },
                {
                    label: 'Projects',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Core',
                            icon: 'pi pi-bolt',
                            shortcut: '⌘+S'
                        },
                        {
                            label: 'Blocks',
                            icon: 'pi pi-server',
                            shortcut: '⌘+B'
                        },
                        {
                            label: 'UI Kit',
                            icon: 'pi pi-pencil',
                            shortcut: '⌘+U'
                        },
                        {
                            separator: true
                        },
                        {
                            label: 'Templates',
                            icon: 'pi pi-palette',
                            items: [
                                {
                                    label: 'Apollo',
                                    icon: 'pi pi-palette',
                                    badge: 2
                                },
                                {
                                    label: 'Ultima',
                                    icon: 'pi pi-palette',
                                    badge: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Contact',
                    icon: 'pi pi-envelope',
                    badge: 3
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
            <Avatar class="mr-2" size="large" shape="circle"><i class="pi pi-user" style="font-size: 2rem"></i></Avatar>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
            </div>
        </template>
    </Menubar>
</template>