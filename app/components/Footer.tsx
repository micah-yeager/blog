import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { Link } from "@remix-run/react"
import clsx from "clsx"

import { FULL_NAME } from "../constants"
import { ContainerInner, ContainerOuter } from "./Container"

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="transition hover:text-primary-500 dark:hover:text-primary-400"
    >
      {children}
    </Link>
  )
}

function Background<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T
}) {
  const Component = as ?? "div"

  return (
    <Component
      {...rest}
      className={clsx(
        "rounded-full bg-zinc-50/75 drop-shadow-2xl dark:bg-zinc-900/75",
        className
      )}
    />
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {/* site links */}
              <Background className="flex flex-wrap justify-center gap-x-6 gap-y-1 px-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to="/projects">Projects</NavLink>
              </Background>

              {/* copyright */}
              <Background
                as="p"
                className="px-3 text-sm text-zinc-600 dark:text-zinc-400"
              >
                &copy; {new Date().getFullYear()} {FULL_NAME}. All rights
                reserved.
              </Background>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
