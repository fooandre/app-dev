import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
	interface State {
		[key: string]: any;
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
