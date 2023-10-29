<template>
    <div id="modal" :class="{ active: showModal }">
        <div class="modal__container">
            <h2>Новая запись</h2>
            <form action="" @submit.prevent="createPost">
                <button type="button" class="close" @click="$emit('close')" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <path d="M11.0834 11.0835L26.9167 26.9168M11.0834 26.9168L26.9167 11.0835" stroke="#050F28" stroke-width="3.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="form__item" id="title">
                    <label for="">Заголовок</label>
                    <input 
                        name="title"
                        type="text" 
                        required 
                        v-bind:value="title" 
                        @input="title = 
                        $event.target.value"
                        >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle opacity="0.16" cx="12" cy="12" r="9" fill="#FF832A"/>
                            <circle cx="12" cy="12" r="9" stroke="#FF832A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="12" y="16" width="0.01" height="0.01" stroke="#FF832A" stroke-width="3" stroke-linejoin="round"/>
                            <path d="M12 12L12 8" stroke="#FF832A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Не должно быть больше 200 символов
                    </span>
                </div>
                <div class="form__item" id="date">
                    <label for="">Дата</label>
                    <input 
                        name="date"
                        type="text" 
                        required 
                        v-maska 
                        data-maska="##-##-#### ##:##" 
                        placeholder="22-10-2023 10:00" 
                        v-bind:value="date" 
                        @input="date = $event.target.value"
                    >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle opacity="0.16" cx="12" cy="12" r="9" fill="#FF832A"/>
                            <circle cx="12" cy="12" r="9" stroke="#FF832A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="12" y="16" width="0.01" height="0.01" stroke="#FF832A" stroke-width="3" stroke-linejoin="round"/>
                            <path d="M12 12L12 8" stroke="#FF832A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Неверная дата
                    </span>
                </div>
                <div class="form__item form__item--wide" id="text">
                    <label for="">Заметка</label>
                    <textarea name="text" id="" cols="30" rows="5" v-bind:value="text" @input="text = $event.target.value"></textarea>
                </div>
                <button type="submit">Поделиться наболевшим</button>
            </form>
        </div>
    </div>
</template>
<script>
import { vMaska } from "maska";
import axios from 'axios';

export default{
    props: {
        showModal: {
            type: Boolean,
            default: false,
            required: true,
        }
    },
    directives: { 
        maska: vMaska
    },
    data(){
        return{
            title: '',
            text: '',
            date: '',
        }
    },
    methods: {
        async createPost(){
            try {
                const res = await axios.post(`http://localhost:8081/api/notes`, {
                    title: this.title,
                    text: this.text,
                    date: this.date,
                });
                if(res.data.error){
                    document.querySelector(`#${res.data.error}`).classList.add('error');
                    setTimeout( () => {
                        document.querySelector(`#${res.data.error}`).classList.remove('error');
                    }, 2000)
                    return;
                } else {
                    this.title = '';
                    this.text = '';
                    this.date = '';
                    this.$emit('close');
                    this.$emit('createPost');
                }
                
            } catch (error) {
                alert('error')
            }
        }
    }
}
</script>
<style>
#modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(5, 15, 40, 0.8);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: none;
}
#modal.active{
    display: flex;
}
.modal__container{
    display: flex;
    flex-direction: column;
    border-radius: 40px;
    background:#FFF;
    width: 1214px;
    padding: 2.75rem 3.75rem 3.5rem;
    position: relative;
}
.modal__container .close{
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-color: transparent;
}
#modal h2{
    color: #000;
    font-size: 2.125rem;
    font-weight: 700;
    line-height: 110%;
}
.form__item{
    display: flex;
    flex-direction: column;
    width: calc((100% - 2.125rem) / 2);
    gap: 4px;
    position: relative;
}
.form__item--wide{
    width: 100%;
}
#modal form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 2.5rem;
    row-gap: 1.25rem;
}
.form__item label{
    font-size: 1.125rem;
    line-height: 110%;
}
.form__item input{
    width: 100%;
    height: 80px;
    background-color: #F6F6F6;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 1.25rem;
}
.form__item.error input{
    border-color: #FF832A;
}
.form__item.error span{
    opacity: 1;
}
.form__item span{
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FF832A;
    font-size: 1.125rem;
    opacity: 0;
}
.form__item textarea{
    width: 100%;
    background-color: #F6F6F6;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 1.875rem 1rem;
    font-size: 1.25rem;
    height: 166px;
}
#modal form button[type="submit"]{
    padding: 0 120px;
    justify-content: center;
    align-items: center;
    border-radius: 65px;
    background: #050F28;
    height: 97px;
    color: #fff;
    font-size: 1.125rem;
    text-transform: uppercase;
    font-weight: 700;
    width: calc((100% - 2.125rem) / 2);
}
@media (max-width: 1279px){
    .modal__container{
        width: calc(100% - 4rem);
    }
}
@media(max-width: 1149px){
    #modal form button[type="submit"]{
        width: auto;
    }
    .modal__container{
        width: calc(100% - 4rem);
    }
}
@media(max-width: 992px){
    .form__item{
        width: 100%;
    }
    .modal__container{
        width: calc(100% - 2rem);
        max-height: calc(100% - 2rem);
        padding: 1.5rem;
    }
    #modal form button[type="submit"]{
        height: 60px;
        width: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal__container .close{
        top: 1.5rem;
        right: 1.5rem;
    }
}
@media (max-width: 767px){
    .modal__container{
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
    }    
}
</style>