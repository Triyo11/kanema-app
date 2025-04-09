import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import HeroCard from "../HeroCard.vue";

describe("HeroCard.vue", () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();
    wrapper = mount(HeroCard, {
      props: {
        movies: [
          {
            id: 1,
            title: "Test Title 1",
            release_date: "2023-01-01",
            overview: "Test Description 1",
            backdrop_path: "test-backdrop-path-1",
            poster_path: "test-poster-path-1",
          },
          {
            id: 2,
            title: "Test Title 2",
            release_date: "2023-01-01",
            overview: "Test Description 2",
            backdrop_path: "test-backdrop-path-2",
            poster_path: "test-poster-path-2",
          },
        ],
      },
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("displays the movie title correctly", () => {
    expect(wrapper.text()).toContain("Test Title 1");
  });

  it("displays the movie overview correctly", () => {
    expect(wrapper.text()).toContain("Test Description");
  });

  it("renders the poster image with the correct path", () => {
    const posterImg = wrapper.find(".image-poster");
    expect(posterImg.attributes("src")).toBe(
      "https://image.tmdb.org/t/p/w500test-poster-path-1"
    );
  });

  it("renders the backdrop image with the correct path", () => {
    const backdropImg = wrapper.find(".image-backdrop");
    expect(backdropImg.attributes("src")).toBe(
      "https://image.tmdb.org/t/p/w500test-backdrop-path-1"
    );
  });

  it("auto-slide changes the currentIndex after 5 seconds", async () => {
    const initialIndex = wrapper.vm.currentIndex;
    expect(initialIndex).toBe(0);

    // Simulate 5 seconds passing
    vi.advanceTimersByTime(5000);

    // Check if currentIndex has updated
    expect(wrapper.vm.currentIndex).toBe(1);

    // Simulate another 5 seconds passing
    vi.advanceTimersByTime(5000);

    // Check if currentIndex loops back to 0
    expect(wrapper.vm.currentIndex).toBe(0);
  });

  it("stops auto-slide on mouseenter and resumes on mouseleave", async () => {
    const initialIndex = wrapper.vm.currentIndex;
    expect(initialIndex).toBe(0);

    // Trigger mouseenter to stop auto-slide
    await wrapper.trigger("mouseenter");
    vi.advanceTimersByTime(5000);

    // Ensure currentIndex does not change
    expect(wrapper.vm.currentIndex).toBe(0);

    // Trigger mouseleave to resume auto-slide
    await wrapper.trigger("mouseleave");
    vi.advanceTimersByTime(5000);

    // Ensure currentIndex updates after resuming
    expect(wrapper.vm.currentIndex).toBe(1);
  });

  it("progress bar resets on mouseleave", async () => {
    wrapper.vm.progress = 50;

    // Trigger mouseleave
    await wrapper.trigger("mouseleave");

    // Check if progress resets to 0
    expect(wrapper.vm.progress).toBe(0);
  });
});
