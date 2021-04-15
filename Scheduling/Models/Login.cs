using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class Login
    {
        public bool IsValidInfo { get; set; }
        public string Token { get; set; }
        public List<string> Permissions { get; set; }

        public Login()
        {
            IsValidInfo = false;
            Token = "";
            Permissions = new List<string>();
        }
    }
}
