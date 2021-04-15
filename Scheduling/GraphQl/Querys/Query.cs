using GraphQL;
using GraphQL.Types;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using Scheduling.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Querys
{
    public class Query : ObjectGraphType
    {
        public Query(DataBaseService db)
        {

            Name = "Query";

            Field<LoginType>(
                "loginInfo",
                arguments: null,
                resolve: context =>
                {
                    Login login = new Login();

                    login.Permissions = new List<string> { "Test" };
                    return login;
                }
            ).AuthorizeWith(Permission.CanManageUsers.Value);

            Field<ListGraphType<PermissionType>>(
                "permissionList",
                arguments: null,
                resolve: context =>
                {
                    return Permission.GetAllPermissions();
                }
            ).AuthorizeWith("Authenticated");

        }
    }
}
