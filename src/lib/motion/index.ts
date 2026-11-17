/**
 * Motion layer public API (hareket-tasarimcisi). Spec: docs/tasarim/hareket.md.
 * Server-safe exports only; the runtime is started by <MotionRoot /> (src/components/motion).
 */
export { DURATION, EASE, STAGGER, DISTANCE, LIMITS, RECOLOR, BUDGET, TRANSITION, HERO_INTRO, type RecolorZoneKind } from "./tokens";
export {
  MOTION_PRIMITIVES,
  MOTION_POINTS,
  MOTION_PARTS,
  motion,
  motionPart,
  primitiveOf,
  primitivesOf,
  type MotionId,
  type MotionPart,
  type MotionPointId,
  type MotionPrimitive,
} from "./ids";
export { motionBootScript } from "./boot";
export { motionAllowed, motionExit, motionScrollTo, railScroll, scrollBehavior, whenHeroIntroDone, type ExitKind } from "./helpers";
export { SVG_BEHAVIOURS, SVG_PARTS, svgInteract, svgPart, type SvgBehaviour, type SvgPart } from "./svg-interact";
