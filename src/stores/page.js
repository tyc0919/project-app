import { defineStore } from 'pinia'

export const usePageStore = defineStore('counter', {
  state: () => ({ page: 'None' }),
  getters: {
    // current: (state) => { return state.page },
  },
  actions: {
    // mainPage() {
    //   this.page = 'main'
    // },
    // signinPage(){
    //   this.page = 'signin'
    // },
    // signupPage(){
    //   this.page = 'signup'
    // },
  }
})

export const usePageStoretest = defineStore('test', {
  state: () => {
    return {
      tabs: []
    }
  },
  getters: {
    out: (state) => {return state.tabs.values}
  },
  actions: {
    pushin(tab){
      if(!this.tabs.includes(tab)){
        this.tabs.push(tab)
      }      
    }
  }
})