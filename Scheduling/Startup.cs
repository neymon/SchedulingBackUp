using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Scheduling.GraphQl.Mutations;
using Scheduling.GraphQl.Querys;
using Scheduling.GraphQl.Schemas;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using Scheduling.Services;
using System.Text;

namespace Scheduling
{
    
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = "audience",
                    ValidIssuer = "issuer",
                    RequireSignedTokens = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("SecretKey").Value))
                };

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
            });


            services.AddGraphQL(options =>
            {
                options.EnableMetrics = true;
            })
               .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
               .AddSystemTextJson()
               .AddGraphQLAuthorization(options =>
               {
                   options.AddPolicy(Permission.CanManageUsers.Value, p => p.RequireClaim("permissions", Permission.CanManageUsers.Value));
                   options.AddPolicy(Permission.IsPartTimer.Value, p => p.RequireClaim("permissions", Permission.IsPartTimer.Value));
                   options.AddPolicy("Authenticated", p => p.RequireAuthenticatedUser());
               });


            services.AddSingleton<DataBaseService>();
            services.AddSingleton<IdentityService>();

            services.AddSingleton<Query>();
            services.AddSingleton<Mutation>();
            services.AddSingleton<PermissionType>();
            services.AddSingleton<LoginType>();

            services.AddSingleton<ISchema, LoginSchema>();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            app.UseRouting();

            app.UseGraphQL<ISchema>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
