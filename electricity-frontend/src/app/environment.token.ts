import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  apiBaseUrl: string;
}

// This is the token you will inject
export const ENVIRONMENT = new InjectionToken<Environment>('environment');
