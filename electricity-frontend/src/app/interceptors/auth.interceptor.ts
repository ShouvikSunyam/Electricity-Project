// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   // Don't add token to login requests
//   if (req.url.includes('/auth/login')) {
//     return next(req);
//   }
//   const userStr = localStorage.getItem('currentUser');
//   if (!userStr) {
//     return next(req);
//   }
//   try {
//     const user = JSON.parse(userStr);
//     if (!user.token) {
//       return next(req);
//     }
//     const clonedReq = req.clone();
//     return next(clonedReq);
//   } catch (error) {
//     return next(req);
//   }
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Don't add token to login requests
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const platformId = inject(PLATFORM_ID);

  // Guard against SSR - localStorage is only available in the browser
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const userStr = localStorage.getItem('currentUser');
  if (!userStr) {
    return next(req);
  }

  try {
    const user = JSON.parse(userStr);
    if (!user.token) {
      return next(req);
    }
    const clonedReq = req.clone();
    return next(clonedReq);
  } catch (error) {
    return next(req);
  }
};
