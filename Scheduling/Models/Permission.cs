using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public sealed class Permission
    {
        public static readonly Permission CanManageUsers = new Permission("canManageUsers");
        public static readonly Permission IsPartTimer = new Permission("isPartTimer");

        public static List<PermissionModel> GetAllPermissions()
        {
            List<PermissionModel> permissions = new List<PermissionModel>()
            {
                new PermissionModel { Name = CanManageUsers.Value },
                new PermissionModel { Name = IsPartTimer.Value }
            };

            return permissions;
        }

        private Permission(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }
    }
}
