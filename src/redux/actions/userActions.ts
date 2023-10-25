// actions/userActions.ts
export const setHideScreen = (type: boolean) => {
  return {
    type: 'hide',
    payload: type,
  };
};
