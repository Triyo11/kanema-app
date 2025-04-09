import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import SimpleCard from "../SimpleCard.vue";

describe("SimpleCard.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SimpleCard, {
      props: {
        movies: [
          {
            id: 1,
            title: "Test Title",
            overview: "Test Description",
            poster_path: "test-poster-path",
          },
        ],
      },
    });
  });

  it("renders an image with the correct src from poster_path", () => {
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(
      "https://image.tmdb.org/t/p/w500test-poster-path"
    );
  });

  it("displays title and overview on mouse hover", async () => {
    const card = wrapper.find(".simple-card");
    await card.trigger("mouseover");

    const title = wrapper.find(".title-card");
    const overview = wrapper.find(".overview-card");

    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Test Title");

    expect(overview.exists()).toBe(true);
    expect(overview.text()).toBe("Test Description");
  });

  it("does not display title and overview when not hovering", () => {
    const title = wrapper.find(".title-card");
    const overview = wrapper.find(".overview-card");

    expect(title.exists()).toBe(false);
    expect(overview.exists()).toBe(false);
  });
});
