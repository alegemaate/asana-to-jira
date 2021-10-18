import { shallowMount } from "@vue/test-utils";
import Converter from "@/components/Converter.vue";

describe("Converter.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Converter, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
