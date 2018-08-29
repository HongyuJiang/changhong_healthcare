<template>
  <div id="insitution_name" class="value-indicator">
      <h3> {{ checkedNames }} </h3>
  </div>
</template>

<script>
export default {
  name: 'fixed-attrs',
  data() {
    return {
      checkedNames: '四川省卫生与计划生育委员会'
    };
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.value-indicator{

    border-top: 3px solid #F0B04D;
    position: absolute;
    width:51%;
    height: 3%;
    background: rgba(255,255,255,0.1)
}


.value-indicator h3{

    color: #fff;
    margin: 0px;
    font-weight: 100
}

#insitution_name{

    top:50px;
    left:50px;
    padding: 12px;

}
</style>
