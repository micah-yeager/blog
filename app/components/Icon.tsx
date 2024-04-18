import type { IconDefinition as FACoreIconDefinition } from "@fortawesome/fontawesome-svg-core"
import type { IconDefinition as FABrandIconDefinition } from "@fortawesome/free-brands-svg-icons"
import type { IconDefinition as FARegularIconDefinition } from "@fortawesome/free-regular-svg-icons"
import type { IconDefinition as FASolidIconDefinition } from "@fortawesome/free-solid-svg-icons"
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps
} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type HeroIconDefinition = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  } & RefAttributes<SVGSVGElement>
>

export type IconProp =
  | HeroIconDefinition
  | FACoreIconDefinition
  | FABrandIconDefinition
  | FARegularIconDefinition
  | FASolidIconDefinition

export type IconProps = Omit<ComponentPropsWithoutRef<"svg">, "as" | "mask"> & {
  as: IconProp
}

export function Icon({ as, ...rest }: IconProps) {
  // FontAwesome-specific rendering
  if ("icon" in as) {
    return <FontAwesomeIcon {...rest} icon={as} />
  }

  // SVG rendering (including Heroicons)
  const Component = as
  return <Component {...rest} />
}
