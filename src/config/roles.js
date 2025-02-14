const allRoles = {
  driver: ['viewRoute', 'viewScheduledBus', 'updateLocation', 'viewAssignedBus'],
  manager: ['manageDrivers', 'viewDriver', 'manageRoutes', 'viewRoute', 'manageScheduleBus', 'viewScheduledBus'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export default {
  roles,
  roleRights,
};
