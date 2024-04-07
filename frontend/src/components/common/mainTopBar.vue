<template>
  <div class="maintop">{{classify}}</div>
</template>

<script>
export default {
    name:'mainTopBar',
    props:{
        classify:{
            type:String,
            default(){
                return 'My borrowing'
            }
        }
    }

}
</script>

<style>
.maintop{
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    background-color: lightgreen;
}

</style>