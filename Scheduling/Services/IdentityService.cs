using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Scheduling.Services
{
    public interface IIdentityService
    {
        Task<Login> Authenticate(string email, string password);
    }
    public class IdentityService : IIdentityService
    {
        readonly DataBaseService db;
        readonly IConfiguration Configuration;
        public IdentityService(DataBaseService db, IConfiguration configuration)
        {
            this.db = db;
            Configuration = configuration;
        }
        public async Task<Login> Authenticate(string email, string password)
        {
            UserModel user = await db.GetUser(email);

            if (user != null && user.Password == Hashing.GetHashString(password + user.Salt))
                return GenerateAccessToken(email, user.Id.ToString(), user.Info.Permissions);

            Login login = new Login();
            login.Permissions = new List<string>() { "XYZ" };
            return login;

        }
        private Login GenerateAccessToken(string email, string userId, List<string> permisson)
        {
            Login login = new Login();

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("SecretKey").Value));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", userId),
                new Claim("Email", email),
            };

            claims = claims.Concat(permisson.Select(role => new Claim("permissions", role))).ToList();

            JwtSecurityToken token = new JwtSecurityToken(
                "issuer",
                "audience",
                claims,
                expires: DateTime.Now.AddDays(90),
                signingCredentials: signingCredentials
            );

            login.Token = new JwtSecurityTokenHandler().WriteToken(token);
            login.Permissions = permisson;
            login.IsValidInfo = true;

            return login;
        }
    }
}
