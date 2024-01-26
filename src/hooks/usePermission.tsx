import { PermissionEnums } from '~/enums/permission'
import { useUserSelector } from '~/store/hooks'

const usePermission = () => {
  const { user, userPermissions } = useUserSelector()

  if (user?.userType !== 'User') {
    return {
      isFormManagement: true,
      isCalenderManagement: true,
      isContactManagement: true,
      isLibraryManagement: true,
      isBluePrintManagement: true,
      isDeviceManagement: true,
      isUserGroupManagement: true,
      isSettingsManagement: true
    }
  }

  const permissionKeys = userPermissions?.map((item) => item.key)

  const isFormManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_FORMS_HUB)
  const isCalenderManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_CALENDAR)
  const isContactManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_CONTACTS)
  const isLibraryManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_LIBRARY)
  const isBluePrintManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_BLUEPRINTS_HUB)
  const isDeviceManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_DEVICE_MANAGEMENT)
  const isUserGroupManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_USERS_GROUPS)
  const isSettingsManagement = permissionKeys.includes(PermissionEnums.MANAGEMENT_SETTINGS)

  return {
    isFormManagement,
    isCalenderManagement,
    isContactManagement,
    isLibraryManagement,
    isBluePrintManagement,
    isDeviceManagement,
    isUserGroupManagement,
    isSettingsManagement
  }
}

export default usePermission
