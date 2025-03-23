const a = createRoute({
  getParentRoute: () => rootRoute,
  path: '/a',
  component: A
});

const test = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/test',
  component: lazyRouteComponent(() => import('@/pages/test/page'))
});

export default [a, test];
