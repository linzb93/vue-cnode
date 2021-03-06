import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import CoHeader from '@/views/layout/Header';
import Index from '@/views/index/Index';
import Detail from '@/views/detail/Detail';
import Update from '@/views/detail/Update';
import User from '@/views/user/User';
import Message from '@/views/message/Message';
import Demo from '@/views/demo/Demo';
import { getUnreadMsgCount } from '@/service';
import { ls } from '@/utils/store';
Vue.use(Router);

var router = new Router({
    routes: [
        {
            path: '/',
            components: {
                header: CoHeader,
                main: Index
            },
        },
        {
            path: '/detail/:id',
            components: {
                header: CoHeader,
                main: Detail
            }
        },
        {
            path: '/detail/:id/update',
            components: {
                header: CoHeader,
                main: Update
            }
        },
        {
            path: '/user/:id',
            components: {
                header: CoHeader,
                main: User
            }
        },
        {
            path: '/message',
            components: {
                header: CoHeader,
                main: Message
            }
        },
        {
            path: '/demo',
            components: {
                main: Demo
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (ls.store('token')) {
        getUnreadMsgCount(ls.store('token'))
        .then(res => {
            var hasUnreadMsg = res.data.data > 0;
            store.commit('TOGGLE_UNREAD_MSG_STATE', hasUnreadMsg);
            next();
        });
    } else {
        next();
    }
});

export default router;