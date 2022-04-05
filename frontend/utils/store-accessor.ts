import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import UserStoreModule from "@/store/users";

export let userStore: UserStoreModule;

export function initialiseStores(store: Store<any>): void {
    userStore = getModule(UserStoreModule, store);
}
