<template>
                <div class="card">
                    <div class="card__title">{{post.title}}</div>
                    <div class="card__subtitle">{{post.text}}</div>
                    <div class="card__datetime">
                        <div class="card__datetime--item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.16" d="M4 8H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8Z" fill="#88A1DE"/>
                                <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 8H20" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 3V5" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 3V5" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>{{post.date.split(" ")[0]}}</span>
                        </div>
                        <div class="card__datetime--item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle opacity="0.16" cx="12" cy="12" r="9" fill="#88A1DE"/>
                                <circle cx="12" cy="12" r="9" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 8V13H16" stroke="#88A1DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>{{post.date.split(" ")[1]}}</span>
                        </div>
                    </div>
                </div>
</template>

<script>
export default{
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.card {
  width: calc((100% - 80px) / 3);
  min-height: 760px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  padding: 4.875rem 2.5rem 4.875rem 1.875rem;
  border-radius: 20px;
  background: #FFF;
  -webkit-transition: background-color 0.3s ease;
  -o-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}

.card:hover {
  background-color: #050F28;
  -webkit-transition: background-color 0.3s ease;
  -o-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}

.card:hover .card__title,
.card:hover .card__subtitle {
  color: #fff;
}

.card__title {
  margin-bottom: 1.875rem;
  font-size: 2.625rem;
  font-weight: 700;
  line-height: 110%;
}

.card__subtitle {
  margin-bottom: auto;
  font-size: 1.125rem;
  line-height: 170%;
}

.card__datetime {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  width: 100%;
}

.card__datetime--item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  gap: 10px;
  color: #88A1DE;
  font-size: 1.25rem;
}
@media (max-width: 1679px){
  .card{
    padding: 3.125rem 1.875rem 3.75rem;
    min-height: 600px;
  }
}
@media (max-width: 1149px){
  .card{
    width: calc((100% - 1.5rem) / 2);
    min-height: 530px;
  }
  .card__title{
    font-size: 2rem;
  }
}
@media (max-width: 767px){
  .card{
    width: 100%;
    padding: 2rem 0.875rem 2rem;
  }
  .card__title{
    font-size: 1.625rem;
    margin-bottom: 1.25rem;
  }
}
</style>