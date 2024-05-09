<template>
  <footer class="footer px-4 mx-2">
    <div class="copyright text-center text-lg-right text-muted">
      © {{ year }}
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
.copyright {
  width: 100%;
  text-align: center !important;
}
</style>
