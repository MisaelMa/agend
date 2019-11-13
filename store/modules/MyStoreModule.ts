import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
    name: 'MyStoreModule',
    namespaced: false,
    stateFactory: false,
})
export default class MyStoreModule extends VuexModule {
    public test: string = 'initial'

    @Mutation
    public setTest(val: string) {
        this.test = val
    }
}