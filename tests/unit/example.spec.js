import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import Signup from "../src/pages/GeneralViews/SignUp";
import routes from "@/routes.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("SignUp", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { 
      localVue,
      router
    })

    router.push("/nested-route")
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(SignUp).exists()).toBe(true)
  })
})
