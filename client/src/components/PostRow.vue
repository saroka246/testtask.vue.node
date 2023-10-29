<template>
    <div class="main__container">
        <PostCard v-for="post in posts" :post="post" ></PostCard>    
    </div>
</template>
<script>
import PostCard from '@/components/PostCard';

export default{
    props: {
        posts:{
            type: Array,
            required: true,
        }
    },
    components: {
        PostCard
    }
}
</script>
<style scoped>
.main__container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  row-gap: 3.75rem;
  margin-top: 4rem;
}
@media( max-width: 1679px){
    .main__container{
        row-gap: 2rem;
    }
    
}
</style>