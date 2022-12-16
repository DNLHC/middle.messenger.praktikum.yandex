import { Emitter } from 'src/core/emitter';

export enum ChatEvents {
  SELECT = 'chat:select',
  DELETE = 'chat:delete',
  NEW_MESSAGE = 'chat:new-message',
}

export enum UserEvents {
  SUBMIT = 'user:submit',
  SIGN_IN = 'user:sign-in',
  SIGN_OUT = 'user:sign-out',
}

export const emitter = new Emitter();
