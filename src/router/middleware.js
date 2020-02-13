
// const middware = {
//   checkRole({ store, next, to }) {
//     if (to.meta.role) {
//       const routeRole = to.meta.role;
//       const userRole = store.getters['auth/userRole'];
//       const hasFunction = routeRole.includes(userRole);
//       if (!hasFunction) {
//         next({
//           path: '/unauthorized'
//         });
//       } else {
//         next();
//       }
//     }
//   },
//   checkDashboard({ next }, res) {
//     if (res.data.result.role === 'admin') {
//       next({
//         path: '/admin'
//       });
//     } else {
//       next({
//         path: '/users'
//       });
//     }
//   }
// };

export const registerMiddleware = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    if (to.meta.middleware) {
      if (to.meta.middleware.guest) {
        if (store.getters['auth/isLogedIn']) {
          next({
            path: '/'
          });
        } else {
          next();
        }
      } else if (to.meta.middleware.auth) {
        if (!store.getters['auth/isLogedIn']) {
          next({
            name: 'login',
            query: {
              next: to.path
            }
          });
        } else {
          // // console.log('ro')
          // next();
          const res = await store.dispatch('auth/userDetail');
          if (!res) {
            store.dispatch('auth/logout').then(() => {
              next({
                name: 'login'
              });
            });
          } else {
            // middware.checkRole({ store, to, next });
            next()
          }
        }
      }
    } else {
      next();
    }
  });
};
