export const selectCurrentUser = state => state.user.user;
export const selectDailyNorma = state => state.user.user.dailyNorma;
export const selectUserCreatedAt = state => state.user.user.createdAt;
export const selectUserName = state => state.user.user.name;
export const selectUserAvatar = state => state.user.user.avatar;
export const selectCountUser = state => state.user.countUser;
export const selectIsLoading = state => state.user.isLoading;
export const selectIsError = state => state.user.IsError;
