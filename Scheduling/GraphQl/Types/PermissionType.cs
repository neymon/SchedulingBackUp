using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class PermissionType : ObjectGraphType<PermissionModel>
    {
        public PermissionType()
        {

            Name = "Permission";
            Description = "Get permissions";

            Field(p => p.Name);
        }
    }
}
