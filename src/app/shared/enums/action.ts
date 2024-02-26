export enum Action {
  OVERVIEW = 'Overview',
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete',
  LOGOUT = 'Logout',
  SETTINGS = 'Settings',
  ACCOUNT = 'Account',
  FILES = 'Files',
}

export function toAction(action: string): Action {
  switch (action) {
    case 'overview':
    case 'Overview':
      return Action.OVERVIEW;
    case 'add':
    case 'Add':
      return Action.ADD;
    case 'edit':
    case 'Edit':
      return Action.EDIT;
    case 'delete':
    case 'Delete':
      return Action.DELETE;
    case 'logout':
    case 'Logout':
      return Action.LOGOUT;
    case 'account':
    case 'Account':
      return Action.ACCOUNT;
    case 'files':
    case 'Files':
      return Action.FILES;
  }
}
