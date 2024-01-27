<script lang="ts">
  import theme_store from "$lib/stores/theme_store";
  //   import { Section, Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Label, Input } from "flowbite-svelte";
  let username: string = "";
  let password: string = "";

  const generateGradientSpectrum = (hue: number) => {
    const shades = 10; // Number of shades in the gradient
    let spectrum = [];

    for (let i = 0; i <= shades; i++) {
      // Adjusting lightness and saturation for a more prominent gradient
      let lightness = 100 - i * 2; // Change the multiplier for a wider range
      let saturation = 50 + i * 5; // Varying the saturation for more vibrant colors
      let hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      spectrum.push(hslToHex(hslColor));
    }

    return spectrum;
  };

  const hslToHex = (hsl: string) => {
    if (hsl.length === 0) return "#000000";

    const match = hsl.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);

    if (match) {
      const [h, s, l] = match.slice(1, 4).map(Number);

      const a = (s * Math.min(l, 100 - l)) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(color).toString(16).padStart(2, "0");
      };

      return `#${f(0)}${f(8)}${f(4)}`;
    } else {
      return "#000000";
    }
  };

  const colorToHue = (color: string) => {
    let color_code: string;
    if (color === "red") color_code = "#ff0000";
    else if (color === "orange") color_code = "#ffa500";
    else if (color === "yellow") color_code = "#ffff00";
    else if (color === "green") color_code = "#008000";
    else if (color === "blue") color_code = "#0000ff";
    else if (color === "indigo") color_code = "#4b0082";
    else if (color === "violet") color_code = "#ee82ee";
    else color_code = "#000000";
    const match = color_code.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

    if (match) {
      const [r, g, b] = match.slice(1, 4).map((x) => parseInt(x, 16));

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      let hue = 0;

      if (max === min) {
        hue = 0;
      } else if (max === r) {
        hue = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        hue = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        hue = 60 * (4 + (r - g) / (max - min));
      }

      return hue;
    } else {
      return 0;
    }
  };

  let gradientCss: string = "";

  //   $: {
  //     let hue = colorToHue($theme_store.accentCurrentColor);
  //     let gradient = generateGradientSpectrum(hue);
  //     gradientCss = `linear-gradient(to right, ${gradient.join(", ")})`;
  //   }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex h-screen overflow-hidden">
  <div
    class="w-1/4 h-full flex flex-col justify-center items-center bg-accent-100 dark:bg-accent-700 bg-opacity-50"
  >
    <div class="w-10/12">
      <h2 class="text-3xl font-semibold mb-4">Login</h2>
      <form class="space-y-6">
        <div>
          <label for="username" class="text-sm font-medium">Username</label>
          <input
            type="text"
            bind:value={username}
            class="w-full p-2 border rounded mt-1"
            placeholder="Username"
          />
        </div>
        <div>
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            type="password"
            bind:value={password}
            class="w-full p-2 border rounded mt-1"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >Log in</button
        >
      </form>
    </div>
  </div>
  <!--   
  <Section name="login">
    <Register href="/">
      <svelte:fragment slot="top">
        <img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" />
        Flowbite
      </svelte:fragment>
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" action="/">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            Change Password
          </h3>
          <Label class="space-y-2">
            <span>Your email</span>
            <Input
              type="email"
              name="email"
              placeholder="name@company.com"
              required
            />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input
              type="password"
              name="password"
              placeholder="•••••"
              required
            />
          </Label>
          <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <a
              href="/"
              class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >Forgot password?</a
            >
          </div>
          <Button type="submit" class="w-full1">Sign in</Button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <a
              href="/"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Sign up</a
            >
          </p>
        </form>
      </div>
    </Register>
  </Section> -->

  <div
    class="w-3/4 h-full bg-cover bg-center typewriter"
    style="background-image: url('https://wallpaperset.com/w/full/3/f/6/31549.jpg');"
  >
    <div class="h-full flex flex-col justify-center items-start p-12">
      <h2
        class="text-4xl font-bold mb-4 typewriter-text text-white
      "
      >
        Welcome to TaskFlow
      </h2>
      <p
        class="text-xl typewriter-text text-white
      "
      >
        Manage your tasks efficiently and effectively.
      </p>
    </div>
  </div>
</div>

<style>
  .typewriter-text {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: typing 4s steps(40, end) forwards;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
</style>
