import { createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'
import MainDefault from './components/MainDefault.vue'
import MainWorks from './components/MainWorks.vue'
import MainSocial from './components/MainSocial.vue'
import Event from './components/Event.vue'
import EventBody from './components/EventBody.vue'
import EventBudget from './components/EventBudget.vue'
import WorkSection from './components/WorkSection.vue' 
import WorksPage from './components/WorksPage.vue' 
import UserProfile from './components/UserProfile.vue'
import EventOverview from './components/EventOverview.vue'
import Social from './components/Social.vue'
import SocialPage from './components/SocialPage.vue'

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
                component: EventBody,
                children: [
                    {
                        path: '',
                        name: 'event-works',
                        component: WorksPage
                    },
                    {
                        path: 'works/:WorkId',
                        name: 'event-work-detail',
                        component: WorkSection
                    }
                ]
            },
            {
                path: 'budget',
                name: 'budget',
                component: EventBudget,
            }
            ,  {
                path: 'overview',
                name: 'overview',
                component: EventOverview,
            }
        ]
    },
    {
        path: '/UserProfile',
        name: 'user-profile',
        component: UserProfile
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
    {
        path: '/posts',
        component: Social,
        children:[
            {
                path: ':PostId',
                name:'post',
                component: SocialPage
            },
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router