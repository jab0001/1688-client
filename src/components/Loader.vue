<template>
  <div class="loader">
    <div class="loader__inner"></div>
  </div>
</template>
<script>
export default {
  name: 'Loader',
};
</script>
<style>
.loader {
  width: 100%;
  height: 100%;
  background: rgba(63, 63, 63, 0.164);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 999999999999999999;
  user-select: none;
}

.loader__inner {
  display: inline-block;
  width: 150px;
  height: 150px;
}
.loader__inner:after {
  content: " ";
  display: block;
  width: 150px;
  height: 150px;
  margin: 8px;
  border-radius: 50%;
  border: 14px solid #ffea00;
    border-top-color: rgb(255, 234, 0);
    border-right-color: rgb(255, 234, 0);
    border-bottom-color: rgb(255, 234, 0);
    border-left-color: rgb(255, 234, 0);
  border-color: #ffea00 transparent #ffea00 transparent;
  -webkit-animation: lds-dual-ring 1.2s linear infinite;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
