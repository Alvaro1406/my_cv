// Import the 'ref' function from the 'vue' library to create a ref to hold the window size
import { ref, type Ref } from "vue";

// Import the 'useWindowSize' function from the '@vueuse/core' library to get the window size
import { useWindowSize } from "@vueuse/core";

// Get the window size
const { width, height } = useWindowSize();

/**
 * Get the screen size and return the screen size as a ref.
 *
 * @returns {Object} An object containing a ref to the screen size.
 */
export function useScreenSize() {
  // Create a ref to hold the screen size
  // The screen size is an object with 'width' and 'height' properties
  const size = ref({
    width: width.value,
    height: height.value,
  });

  // Create a ref to hold the screen size category
  // The screen size category is a string with one of the following values: 'lg', 'md', 'sm', 'tb', or 'xs'
  const screen = ref();

  // Determine the screen size category based on the window width
  switch (true) {
    case size.value.width >= 1800:
      screen.value = "2xl";
      break;
    case size.value.width >= 1440:
      screen.value = "xl";
      break;
    case size.value.width >= 1280:
      screen.value = "lg";
      break;
    case size.value.width >= 1024:
      screen.value = "md";
      break;
    case size.value.width >= 768:
      screen.value = "sm";
      break;
    case size.value.width >= 560:
      screen.value = "tb";
      break;
    case size.value.width >= 320:
      screen.value = "xs";
      break;
  }

  // Return the screen size ref
  // The screen size ref contains the screen size category
  return {
    screen,
  };
}

/**
 * Check if the screen is a mobile screen.
 *
 * @returns {boolean} True if the screen width is less than or equal to 768 pixels, false otherwise.
 */
export function isMobile() {
  // Create a ref to hold the screen size
  // The screen size is an object with 'width' and 'height' properties
  // The screen size ref is created using the 'ref' function from the 'vue' library
  const size = ref({
    width: width.value,
    height: height.value,
  });

  // Return true if the screen width is less than or equal to 768 pixels, false otherwise
  return size.value.width <= 768;
}

/**
 * Check if the screen is a tablet screen.
 *
 * @returns {boolean} True if the screen width is less than or equal to 1020 pixels, false otherwise.
 */
export function isTablet() {
  // Create a ref to hold the screen size
  // The screen size is an object with 'width' and 'height' properties
  // The screen size ref is created using the 'ref' function from the 'vue' library
  const size = ref({
    width: width.value,
    height: height.value,
  });

  // Return true if the screen width is less than or equal to 1020 pixels, false otherwise
  return size.value.width <= 1024;
}

/**
 * Check if the screen is a resolution 1020 to 1536.
 *
 * @returns {boolean} True if the screen width is less than or equal to 1020 pixels, false otherwise.
 */
export function isOldPc() {
  // Create a ref to hold the screen size
  // The screen size is an object with 'width' and 'height' properties
  // The screen size ref is created using the 'ref' function from the 'vue' library
  const size = ref({
    width: width.value,
    height: height.value,
  });

  // Return true if the screen width is less than or equal to 1440 pixels and greater than or equal to 1024 pixels, false otherwise
  return size.value.width <= 1440 && size.value.width >= 1024;
}
