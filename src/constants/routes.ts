export const ROUTES = {
  home: '/',
  practice: '/practice',
  results: '/results',
} as const;

export type RouteKey = keyof typeof ROUTES;
