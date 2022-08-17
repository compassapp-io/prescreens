using System;
using System.Collections.Generic;
using System.Data;
using coreapi.Helpers;
using coreapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using coreapi.Models.Responses;
using coreapi.Models.Public;

namespace coreapi.Models
{
    public partial class Context : DbContext
    {

        public Context(DbContextOptions<Context> options) : base(options)
        {
            this.Database.SetCommandTimeout(1000);
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<Assessments> Assessments { get; set; }
        public DbSet<ContentConsumption> ContentConsumption { get; set; }
        public DbSet<ProfileResponse> ProfileResponse { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Mood> Moods { get; set; }

        /// <summary>
        /// Executes a Native SQL query on the target database
        /// </summary>
        /// <param name="query">The SQL query string</param>
        /// <param name="parameters">List of parameters</param>
        /// <typeparam name="T">Generic primitive type T</typeparam>
        /// <returns></returns>
        public T NativeQuery<T>(string query, params object[] parameters)
        //    where T : struct, IComparable, IFormattable, IConvertible, IComparable<T>, IEquatable<T>
        {
            T res;
            using (var command = this.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                if (parameters != null && parameters.Length > 0)
                {
                    var index = 1;
                    foreach (object p in parameters)
                    {
                        command.Parameters.Add(new NpgsqlParameter(index.ToString(), p));
                        index++;
                    }
                }

                if (command.Connection.State == ConnectionState.Closed)
                {
                    command.Connection.Open();
                }

                res = (T)command.ExecuteScalar();
            }

            return res;
        }

        /// <summary>
        /// OnConfiguring Override
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(HelpersCommon.Configuration.GetConnectionString("DefaultConnection"));
            }
        }

        /// <summary>
        /// OnModelCreating override
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.HasPostgresExtension("dblink")
            //     .HasPostgresExtension("pgcrypto")
            //     .HasPostgresExtension("plv8")
            //     .HasPostgresExtension("postgres_fdw")
            //     .HasPostgresExtension("uuid-ossp");

            modelBuilder.Entity<ProfileResponse>(entity =>
            {
                entity.HasNoKey();
            });

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}





