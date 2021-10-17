import { Component } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

interface route {
	path: string;
	name: string;
	component: Component;
}

const routes: route[] = [
	// {
	// 	path: "/",
	// 	name: "Home",
	// 	component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
	// meta: { title: 'App - component' }
	// }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
