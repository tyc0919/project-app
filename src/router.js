import { createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'
import MainDefault from './components/MainDefault.vue'
import MainWorks from './components/MainWorks.vue'
import MainSocial from './components/MainSocial.vue'
import Event from './components/Event.vue'
import EventBody from './components/EventBody.vue'
import EventBudget from './components/EventBudget.vue'

const routes = [
    {
        path: '/', //will probably add username here
        component: Main,
        name: 'main',
        children: [
            {
                path: '',
                name: 'main-default',
                component: MainDefault,
            },
            {
                path: 'works',
                name: 'main-works',
                component: MainWorks,
            },
            {
                path: 'social',
                name: 'main-social',
                component: MainSocial,
            }
        ]
    },
    {
        path: '/events/:EventId', //Change 1 to EventId
        component: Event,
        children: [
            {
                path: '',
                name: 'event-default',
                component: EventBody
            },
            {
                path: 'budget',
                name: 'budget',
                component: EventBudget,
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router