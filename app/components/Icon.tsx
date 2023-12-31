import type { IconDefinition as FACoreIconDefinition } from "@fortawesome/fontawesome-svg-core"
import type { IconDefinition as FABrandIconDefinition } from "@fortawesome/free-brands-svg-icons"
import type { IconDefinition as FASolidIconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react"

type HeroIconDefinition = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  } & RefAttributes<SVGSVGElement>
>

export type IconProp =
  | HeroIconDefinition
  | FACoreIconDefinition
  | FASolidIconDefinition
  | FABrandIconDefinition
export type IconProps = ComponentPropsWithoutRef<ElementType> & {
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
