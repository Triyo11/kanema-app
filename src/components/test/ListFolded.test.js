import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ListFolded from "../ListFolded.vue";
import SimpleCard from "../SimpleCard.vue";

vi.mock("../SimpleCard.vue", () => ({
  default: {
    name: "SimpleCard",
    props: ["movies"],
    template:
      '<div class="simple-card">{{ movies.length }} movie rendered</div>',
  },
}));

describe("ListFolded.vue", () => {
  let wrapper;
  const mockMovies = [
    {
      id: 1,
      title: "Test Title 1",
      overview: "Test Description 1",
      poster_path: "test-poster-path-1",
    },
    {
      id: 2,
      title: "Test Title 2",
      overview: "Test Description 2",
      poster_path: "test-poster-path-2",
    },
  ];

  beforeEach(() => {
    wrapper = mount(ListFolded, {
      props: {
        titleList: "Test Title List",
        movies: mockMovies,
      },
    });
  });

  it("renders the title", () => {
    const title = wrapper.find("h2");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Test Title List");
  });

  it("renders the correct number of SimpleCard components", () => {
    const simpleCards = wrapper.findAllComponents(SimpleCard);
    expect(simpleCards.length).toBe(1); // Only one SimpleCard component is rendered
    expect(simpleCards[0].props("movies")).toEqual(mockMovies); // Verify the movies prop
  });

  it("renders SimpleCard with the correct movies props", () => {
    const simpleCard = wrapper.findComponent(SimpleCard);
    const filteredMovies = mockMovies
      .filter((movie) => movie.poster_path)
      .splice(0, 10);

    expect(simpleCard.exists()).toBe(true);
    expect(simpleCard.props("movies")).toEqual(filteredMovies);
  });

  it("handles the scroll event correctly", async () => {
    const scrollContainer = wrapper.vm.$refs.scrollContainer;
    expect(scrollContainer).toBeTruthy(); // Memastikan scrollContainer ada

    // Simulate a wheel event
    const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
    scrollContainer.dispatchEvent(wheelEvent);

    await wrapper.vm.$nextTick(); // Wait for Vue to process the event

    // Ensure the scrollLeft value has changed
    expect(scrollContainer.scrollLeft).toBeGreaterThan(0);
  });
});
