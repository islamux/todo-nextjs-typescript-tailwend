
# Tailwind CSS Classes Used in Your Project

This document breaks down the Tailwind CSS classes used in your Next.js application. Each section corresponds to a file in your project and explains the classes used within it.

## `src/app/page.tsx`

This is the main page of your application.

- `min-h-screen`: Sets the minimum height of the element to 100% of the viewport height. This is used to make the main container cover the entire screen.
- `bg-gradient-to-br`: Creates a background gradient that flows from top-left to bottom-right.
- `from-blue-50`: Sets the starting color of the gradient to a very light blue.
- `to-indigo-100`: Sets the ending color of the gradient to a light indigo.
- `py-12`: Adds padding to the top and bottom of the element (y-axis). `12` corresponds to `3rem` or `48px`.

## `src/app/components/TodoApp.tsx`

This component is the main container for your todo application.

- `max-w-2xl`: Sets the maximum width of the element to `42rem` or `672px`. This is used to constrain the width of the todo app on larger screens.
- `mx-auto`: Centers the element horizontally by setting the left and right margins to `auto`.
- `p-6`: Adds padding of `1.5rem` or `24px` to all sides of the element.
- `bg-white`: Sets the background color to white.
- `rounded-xl`: Applies a large border radius, making the corners of the element extra rounded.
- `shadow-lg`: Applies a large box shadow to the element, giving it a "lifted" appearance.
- `mt-8`: Adds a top margin of `2rem` or `32px`.
- `text-3xl`: Sets the font size to `1.875rem` or `30px`.
- `font-bold`: Sets the font weight to bold.
- `text-center`: Centers the text horizontally.
- `mb-8`: Adds a bottom margin of `2rem` or `32px`.
- `text-gray-800`: Sets the text color to a dark gray.
- `mb-6`: Adds a bottom margin of `1.5rem` or `24px`.
- `text-lg`: Sets the font size to `1.125rem` or `18px`.
- `text-gray-500`: Sets the text color to a medium gray.
- `py-8`: Adds padding to the top and bottom of the element (y-axis). `8` corresponds to `2rem` or `32px`.
- `border`: Adds a `1px` solid border to all sides of the element.
- `rounded-lg`: Applies a medium border radius, making the corners of the element rounded.
- `overflow-hidden`: Hides any content that overflows the element's bounds.

## `src/app/components/TodoInput.tsx`

This component is for adding new todos.

- `flex`: Sets the display property to `flex`, which allows for flexible box layout.
- `gap-2`: Adds a gap of `0.5rem` or `8px` between flex items.
- `mb-6`: Adds a bottom margin of `1.5rem` or `24px`.
- `flex-1`: Allows the input field to grow and take up any available space in the flex container.
- `px-3`: Adds padding to the left and right of the element (x-axis). `3` corresponds to `0.75rem` or `12px`.
- `py-3`: Adds padding to the top and bottom of the element (y-axis). `3` corresponds to `0.75rem` or `12px`.
- `border-gray-300`: Sets the border color to a light gray.
- `focus-within:outline-none`: Removes the default outline when a child element is focused.
- `focus:ring-2`: Adds a `2px` ring around the element when it is focused.
- `focus:border-transparent`: Makes the border transparent when the element is focused (to be used with the ring).
- `px-5`: Adds padding to the left and right of the element (x-axis). `5` corresponds to `1.25rem` or `20px`.
- `bg-blue-600`: Sets the background color to a medium blue.
- `text-white`: Sets the text color to white.
- `hover:bg-blue-700`: Changes the background color to a darker blue when the element is hovered.
- `transition-colors`: Adds a smooth transition effect to color changes.
- `font-medium`: Sets the font weight to medium.

## `src/app/components/Todoitems.tsx`

This component represents a single todo item.

- `flex`: Sets the display property to `flex`.
- `items-center`: Aligns flex items to the center of the container's cross axis.
- `justify-between`: Distributes flex items evenly with the first item at the start and the last item at the end.
- `p-3`: Adds padding of `0.75rem` or `12px` to all sides of the element.
- `border-b`: Adds a `1px` solid border to the bottom of the element.
- `border-r-gray-200`: This class seems to have a typo. It should likely be `border-b-gray-200` to set the bottom border color. `border-r-gray-200` would set the right border color.
- `hover:bg-gray-50`: Changes the background color to a very light gray when the element is hovered.
- `space-x-3`: Adds a horizontal margin between flex items. `3` corresponds to `0.75rem` or `12px`.
- `h-5`: Sets the height of the element to `1.25rem` or `20px`.
- `w-5`: Sets the width of the element to `1.25rem` or `20px`.
- `text-blue-600`: Sets the text color to a medium blue.
- `rounded`: Applies a small border radius.
- `focus:ring-blue-500`: Adds a `2px` blue ring around the element when it is focused.
- `line-through`: Adds a line through the text.
- `text-gray-500`: Sets the text color to a medium gray.
- `text-gray-800`: Sets the text color to a dark gray.
- `text-red-500`: Sets the text color to a medium red.
- `hover:text-red-700`: Changes the text color to a darker red when the element is hovered.
- `font-bold`: Sets the font weight to bold.
- `text-xl`: Sets the font size to `1.25rem` or `20px`.
- `px-2`: Adds padding to the left and right of the element (x-axis). `2` corresponds to `0.5rem` or `8px`.

## `src/app/components/TodoStats.tsx`

This component displays statistics about the todos.

- `mt-4`: Adds a top margin of `1rem` or `16px`.
- `p-3`: Adds padding of `0.75rem` or `12px` to all sides of the element.
- `bg-gray-50`: Sets the background color to a very light gray.
- `rounded-lg`: Applies a medium border radius.
- `text-sm`: Sets the font size to `0.875rem` or `14px`.
- `text-gray-600`: Sets the text color to a medium-dark gray.
- `flex`: Sets the display property to `flex`.
- `justify-between`: Distributes flex items evenly with the first item at the start and the last item at the end.

## `src/app/layout.tsx`

This is the root layout for your application.

- `antialiased`: Applies font smoothing to make text look sharper.
