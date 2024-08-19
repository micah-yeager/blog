// noinspection JSCommentMatchesSignature

import type {
  DescriptionProps,
  LabelProps,
  MenuButtonProps,
  MenuHeadingProps,
  MenuItemsProps,
  MenuProps,
  MenuSectionProps,
  MenuSeparatorProps
} from "@headlessui/react"
import type { ComponentPropsWithoutRef, ElementType } from "react"
import {
  Description,
  Label,
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator
} from "@headlessui/react"
import clsx from "clsx"

import { Button } from "../Button"
import { Link } from "../Link"

/**
 * A dropdown menu.
 *
 * @see Headless UI's {@link Menu}
 */
export function Dropdown(props: MenuProps) {
  return <Menu {...props} />
}

/**
 * A button that toggles a {@link Dropdown}'s {@link DropdownMenu} visibility.
 *
 * @param as - The element type or component to render as. Defaults to
 *   {@link Button}.
 * @see Headless UI's {@link MenuButtonProps}
 */
export function DropdownButton<T extends ElementType = typeof Button>({
  as,
  ...props
}: Omit<MenuButtonProps<T>, "className">) {
  // @ts-expect-error TODO: resolve the `as` property type issue.
  return <MenuButton as={as ?? Button} {...props} />
}

/**
 * The flyout panel for a {@link Dropdown}.
 *
 * @param anchor - The anchor position for the flyout. Defaults to `"bottom"`.
 * @see Headless UI's {@link MenuItems}
 */
export function DropdownMenu({
  anchor = "bottom",
  className,
  ...props
}: Omit<MenuItemsProps, "as">) {
  return (
    <MenuItems
      {...props}
      transition
      anchor={anchor}
      className={clsx(
        className,
        // Anchor positioning
        "[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:-6px] data-[anchor~=end]:[--anchor-offset:6px] sm:data-[anchor~=start]:[--anchor-offset:-4px] sm:data-[anchor~=end]:[--anchor-offset:4px]",
        // Base styles
        "isolate w-max rounded-xl p-1",
        // Invisible border that is only visible in `forced-colors` mode for
        // accessibility purposes
        "outline outline-1 outline-transparent focus:outline-none",
        // Handle scrolling when menu won't fit in viewport
        "overflow-y-auto",
        // Popover background
        "bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75",
        // Shadows
        "shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10",
        // Define grid at the menu level if subgrid is supported
        "supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
        // Transitions
        "transition data-[closed]:data-[leave]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in"
      )}
    />
  )
}

/**
 * Properties for a {@link DropdownItem}.
 *
 * @see {@link HTMLButtonElement}
 * @see {@link Link}
 */
type DropdownItemProps =
  | Omit<ComponentPropsWithoutRef<"button">, "as">
  | ComponentPropsWithoutRef<typeof Link>

/**
 * An item for a {@link DropdownMenu}.
 *
 * @param to - If provided, a {@link Link} will be rendered with the provided
 *   URL. Otherwise, an {@link HTMLButtonElement} will be used instead.
 * @see {@link DropdownItemProps}
 */
export function DropdownItem({ className, ...props }: DropdownItemProps) {
  const classes = clsx(
    className,
    // Base styles
    "group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5",
    // Text styles
    "text-left text-base/6 text-zinc-950 dark:text-white sm:text-sm/6 forced-colors:text-[CanvasText]",
    // Focus
    "data-[focus]:bg-blue-500 data-[focus]:text-white",
    // Disabled state
    "data-[disabled]:opacity-50",
    // Forced colors mode
    "forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]",
    // Use subgrid when available but fallback to an explicit grid layout if not
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    // Icons
    "[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4",
    "[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-white",
    // Avatar
    "[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5"
  )

  return (
    <MenuItem>
      {"to" in props ? (
        <Link {...props} className={classes} />
      ) : (
        <button type="button" {...props} className={classes} />
      )}
    </MenuItem>
  )
}

/**
 * A header for a {@link DropdownMenu}.
 *
 * Note that assistive technologies will not announce child content.
 *
 * @see {@link HTMLDivElement}
 */
export function DropdownHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(className, "col-span-5 px-3.5 pb-1 pt-2.5 sm:px-3")}
    />
  )
}

/**
 * A section wrapper containing grouped {@link DropdownItem}s for a
 * {@link DropdownMenu}.
 *
 * @see Headless UI's {@link MenuSection}
 */
export function DropdownSection({
  className,
  ...props
}: Omit<MenuSectionProps, "as">) {
  return (
    <MenuSection
      {...props}
      className={clsx(
        className,
        // Define grid at the section level instead of the item level if
        // subgrid is supported
        "col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]"
      )}
    />
  )
}

/**
 * A heading for a {@link DropdownSection}.
 *
 * @see Headless UI's {@link MenuHeading}
 */
export function DropdownHeading({
  className,
  ...props
}: Omit<MenuHeadingProps, "as">) {
  return (
    <MenuHeading
      {...props}
      className={clsx(
        className,
        "col-span-full grid grid-cols-[1fr,auto] gap-x-12 px-3.5 pb-1 pt-2 text-sm/5 font-medium text-zinc-500 dark:text-zinc-400 sm:px-3 sm:text-xs/5"
      )}
    />
  )
}

/**
 * A horizontal divider for a {@link DropdownMenu}.
 *
 * @see Headless UI's {@link MenuSeparator}
 */
export function DropdownDivider({
  className,
  ...props
}: Omit<MenuSeparatorProps, "as">) {
  return (
    <MenuSeparator
      {...props}
      className={clsx(
        className,
        "col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 dark:bg-white/10 sm:mx-3 forced-colors:bg-[CanvasText]"
      )}
    />
  )
}

/**
 * A label for a {@link Dropdown}.
 *
 * @see Headless UI's {@link Label}
 */
export function DropdownLabel({ className, ...props }: Omit<LabelProps, "as">) {
  return (
    <Label
      {...props}
      data-slot="label"
      className={clsx(className, "col-start-2 row-start-1")}
      {...props}
    />
  )
}

/**
 * A description for a {@link Dropdown}.
 *
 * @see Headless UI's {@link Description}
 */
export function DropdownDescription({
  className,
  ...props
}: Omit<DescriptionProps, "as">) {
  return (
    <Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        "col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-[focus]:text-white dark:text-zinc-400 sm:text-xs/5 forced-colors:group-data-[focus]:text-[HighlightText]"
      )}
    />
  )
}

/**
 * Properties for the {@link DropdownShortcut} component.
 *
 * @see {@link HTMLElement}
 */
type DropdownShortcutProps = Omit<DescriptionProps<"kbd">, "as"> & {
  keys: string | string[]
}

/**
 * Keyboard shortcut indicator for a {@link DropdownItem}.
 *
 * @param keys - The key combination to display.
 * @see {@link DropdownShortcutProps}
 */
export function DropdownShortcut({
  keys,
  className,
  ...props
}: DropdownShortcutProps) {
  return (
    <Description
      as="kbd"
      {...props}
      className={clsx(
        className,
        "col-start-5 row-start-1 flex justify-self-end"
      )}
    >
      {(Array.isArray(keys) ? keys : keys.split("")).map((char, index) => (
        <kbd
          key={index}
          className={clsx([
            "min-w-[2ch] text-center font-sans capitalize text-zinc-400 group-data-[focus]:text-white forced-colors:group-data-[focus]:text-[HighlightText]",
            // Make sure key names that are longer than one character (like
            // "Tab") have extra space
            index > 0 && char.length > 1 && "pl-1"
          ])}
        >
          {char}
        </kbd>
      ))}
    </Description>
  )
}
