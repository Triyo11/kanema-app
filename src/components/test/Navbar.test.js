import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar.vue";

vi.mock('@clerk/vue', () => ({
  SignedIn: {
    template: '<div><slot /></div>'
  },
  SignedOut: {
    template: '<div><slot /></div>'
  },
  SignInButton: {
    template: '<button class="sign-in-button">Sign In</button>'
  },
  UserButton: {
    template: '<button class="profile-button">UserButton</button>'
  },
  useUser: () => ({
    user: { value: { firstName: 'John' } }
  })
}));

describe("Navbar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar);
  });

  it("renders the logo", () => {
    const logo = wrapper.find(".logo");
    expect(logo.exists()).toBe(true);
  });

  it("renders sign in button if not signed", () => {
    const signInButton = wrapper.find(".sign-in-button");
    expect(signInButton.exists()).toBe(true);
  });

  it("renders user name when signed in", () => {
    const userName = wrapper.find("p");
    expect(userName.exists()).toBe(true);
    expect(userName.text()).toBe("John");
  });

  it("renders user button if signed in", () => {
    const userButton = wrapper.find(".profile-button");
    expect(userButton.exists()).toBe(true);
  });
});

