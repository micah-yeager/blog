// noinspection JSCommentMatchesSignature

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon"
import MoonIcon from "@heroicons/react/24/outline/MoonIcon"
import SunIcon from "@heroicons/react/24/outline/SunIcon"
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon"
import clsx from "clsx"
import type { CSSProperties, ComponentPropsWithoutRef, ElementRef } from "react"
import { Fragment, useEffect, useRef, useState } from "react"
import type { LinkProps } from "react-router"
import { Link, NavLink, useLocation } from "react-router"
import { clamp } from "@utils/numbers"
import { Container } from "../Container"
import { Icon } from "../Icon"

/**
 * A navigation item for the {@link MobileNavigation} menu.
 *
 * @see {@link LinkProps}
 */
function MobileNavItem({
  className,
  children,
  ...rest
}: Omit<LinkProps, "prefetch">) {
  return (
    <li>
      <PopoverButton
        {...rest}
        as={Link}
        prefetch="intent"
        className={clsx("block py-2", className)}
      >
        {children}
      </PopoverButton>
    </li>
  )
}

/**
 * The mobile navigation menu.
 *
 * @see {@link Popover}
 */
function MobileNavigation(props: ComponentPropsWithoutRef<typeof Popover>) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <Icon
          as={ChevronDownIcon}
          className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
        />
      </PopoverButton>
      <Transition>
        {/* backdrop overlay */}
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>

        {/* menu */}
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            {/* header */}
            <div className="flex flex-row-reverse items-center justify-between">
              {/* close button */}
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <Icon
                  as={XMarkIcon}
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                />
              </PopoverButton>

              {/* title */}
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>

            {/* links */}
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem to="/about">About</MobileNavItem>
                <MobileNavItem to="/posts">Posts</MobileNavItem>
                <MobileNavItem to="/projects">Projects</MobileNavItem>
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}

/**
 * A navigation item for the {@link DesktopNavigation} menu.
 *
 * @see {@link LinkProps}
 */
function NavItem({
  className,
  children,
  ...rest
}: Omit<LinkProps, "prefetch">) {
  return (
    <li>
      <NavLink
        {...rest}
        prefetch="intent"
        className={({ isActive, isTransitioning, isPending }) =>
          clsx(
            "relative block px-3 py-2 transition",
            className,
            isActive || isTransitioning || isPending
              ? "text-primary-500 dark:text-primary-400"
              : "hover:text-primary-500 dark:hover:text-primary-400",
          )
        }
      >
        {({ isActive, isTransitioning, isPending }) => (
          <>
            {children}
            {(isActive || isTransitioning || isPending) && (
              <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/40 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0" />
            )}
          </>
        )}
      </NavLink>
    </li>
  )
}

/**
 * The desktop navigation menu.
 *
 * @see {@link HTMLElement}
 */
function DesktopNavigation(props: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem to="/about">About</NavItem>
        <NavItem to="/posts">Posts</NavItem>
        <NavItem to="/projects">Projects</NavItem>
      </ul>
    </nav>
  )
}

/** A button to toggle the dark / light theme. */
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {
    // Get the user's preferred color scheme from local storage, if present.
    const storedData = localStorage.getItem("darkMode")
    if (storedData !== null) {
      const storedValue = JSON.parse(storedData)
      // If this is a valid value, use it.
      if (typeof storedValue === "boolean") {
        return setDarkMode(Boolean(JSON.parse(storedData)))
      }
      // Otherwise, remove the associated key from storage.
      localStorage.removeItem("darkMode")
    }

    // If nothing was stored, fall back to OS preference.
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
  }, [])

  useEffect(() => {
    // Add or remove `dark` class on-demand.
    // Use this method instead of a React state or context to avoid
    // a flash of light mode on page load.
    if (darkMode && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", JSON.stringify(true))
    } else if (
      !darkMode &&
      document.documentElement.classList.contains("dark")
    ) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", JSON.stringify(false))
    }
  }, [darkMode])

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setDarkMode(!darkMode)}
    >
      <Icon
        as={SunIcon}
        className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-primary-50 [@media(prefers-color-scheme:dark)]:stroke-primary-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-primary-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-primary-600"
      />
      <Icon
        as={MoonIcon}
        className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-primary-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-primary-500"
      />
    </button>
  )
}

/**
 * A container for the avatar image.
 *
 * @see {@link HTMLDivElement}
 */
function AvatarContainer({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10",
      )}
      {...props}
    />
  )
}

/**
 * Properties for the {@link Avatar} component.
 *
 * @see {@link Link}
 */
type AvatarProps = Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & {
  /** Whether to display a larger avatar. */
  large?: boolean
}

/**
 * An avatar that serves as a link to the site index page.
 *
 * @param large - Whether to display a larger avatar.
 * @see {@link AvatarProps}
 */
function Avatar({ large = false, className, ...props }: AvatarProps) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      {...props}
    >
      <img
        src="/images/me-standing.jpeg"
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9",
        )}
      />
    </Link>
  )
}

/** The page header. Contains the avatar, navigation, and theme toggle. */
export function Header() {
  const isHomePage = useLocation().pathname === "/"

  const headerRef = useRef<ElementRef<"div">>(null)
  const avatarRef = useRef<ElementRef<"div">>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    // How far the user needs to scroll down before the header starts being
    // hidden.
    const downDelay = avatarRef.current?.offsetTop ?? 0
    // How far the user needs to scroll up before the header is displayed again.
    const upDelay = 64

    // Alias frequently-used, deeply-nested functions for brevity.
    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    // Update avatar and header positioning based on scroll position. Uses CSS
    // variables to avoid layout thrashing.
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO: refactor to reduce complexity
    function updateHeaderStyles() {
      if (!headerRef.current) return

      // get current scroll position
      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      // start as a sticky header
      if (isInitial.current) {
        setProperty("--header-position", "sticky")
      }

      setProperty("--content-offset", `${downDelay}px`)

      // if the page just loaded, or if the user hasn't scrolled far enough yet
      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`)
        setProperty("--header-mb", `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty("--header-height", `${offset}px`)
        setProperty("--header-mb", `${height - offset}px`)
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`)
        setProperty("--header-mb", `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed")
        removeProperty("--header-top")
        removeProperty("--avatar-top")
      } else {
        removeProperty("--header-inner-position")
        setProperty("--header-top", "0px")
        setProperty("--avatar-top", "0px")
      }
    }

    // Scale avatar as the user scrolls down the page.
    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty("--avatar-border-transform", borderTransform)
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0")
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener("scroll", updateStyles, { passive: true })
    window.addEventListener("resize", updateStyles)

    return () => {
      window.removeEventListener("scroll", updateStyles)
      window.removeEventListener("resize", updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="pointer-events-none relative z-10 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {/* avatar */}
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position: "var(--header-position)" as CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as CSSProperties["position"],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}

        {/* top menu */}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position: "var(--header-position)" as CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              {/* avatar */}
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>

              {/* navigation */}
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>

              {/* theme toggle */}
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      )}
    </>
  )
}
