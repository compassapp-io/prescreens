using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using coreapi.Helpers;
using coreapi.Models;
using coreapi.Middlewares;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace coreapi
{
    public class Startup
    {
        /// <summary>
        /// Allow origin readonly string
        /// </summary>
        readonly string AllowOrigins = "_allowOrigins";

        /// <summary>
        /// Constructor default
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Injected configuration
        /// </summary>
        /// <value></value>
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Ignore default JSON serializer used in ASP.NET Core 3.0 and the above version.
            services.AddControllersWithViews()
                 .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


            // Ignore Default Case Senstivity in api response
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            // Add Cors
            services.AddCors(options =>
            {
                options.AddPolicy(AllowOrigins, builder =>
                 {
                     builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                 });
            });

            // Register DB Context
            services.AddDbContext<Context>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
            );

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(name: "v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Compass API",
                    Version = "v1",
                    Description = "Compass API",
                });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    // Description = "JWT Authorization header using the Bearer scheme."
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                 Type = ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                            }
                        },
                     new string[] {}

                     }
                });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Compass API");
            });

            app.UseRouting();

            app.UseCors(AllowOrigins);

            app.UseHttpsRedirection();
            app.UseAuth();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
