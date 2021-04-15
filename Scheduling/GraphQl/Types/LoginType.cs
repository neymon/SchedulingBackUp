using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class LoginType : ObjectGraphType<Login>
    {
        public LoginType()
        {

            Name = "Login";
            Description = "Login info for client";

            Field(l => l.IsValidInfo).Description("Valid login info.");
            Field(l => l.Token).Description("JWT. Returned if 'isValidInfo' = true.");
            Field(l => l.Permissions).Description("User permission. returned if 'isValidInfo' = true.");

        }
    }
}
