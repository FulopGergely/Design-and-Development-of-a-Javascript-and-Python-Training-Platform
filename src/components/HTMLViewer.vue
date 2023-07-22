<template>
  <div>
    <!-- A HTML fájl tartalmának megjelenítése a v-html direktívával -->
    <div v-html="htmlContent"></div>
    {{htmlContent}}
    <div>ajaj</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: '',
    };
  },
  mounted() {
    // Betöltjük a HTML fájlt, majd beállítjuk a tartalmat az 'htmlContent' adatba
    this.loadHTMLFile();
  },
  methods: {
    async loadHTMLFile() {
      try {
        const response = await fetch('asd.html');
        this.htmlContent = await response.text();
      } catch (error) {
        console.error('Hiba történt a fájl betöltése közben:', error);
      }
    },
  },
};
</script>
