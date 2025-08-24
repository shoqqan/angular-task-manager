import { Injectable, signal } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user = signal<User | null>(null);
  constructor() {}
}
