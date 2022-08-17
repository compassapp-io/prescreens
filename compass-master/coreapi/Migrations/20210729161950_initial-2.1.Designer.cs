﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using coreapi.Models;

namespace coreapi.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20210729161950_initial-2.1")]
    partial class initial21
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("coreapi.Models.Assessments", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<long?>("parentid")
                        .HasColumnType("bigint");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.Property<long?>("userid")
                        .HasColumnType("bigint");

                    b.HasKey("id");

                    b.ToTable("Assessments");
                });

            modelBuilder.Entity("coreapi.Models.Category", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("displayorder")
                        .HasColumnType("integer");

                    b.Property<string>("followedby")
                        .HasColumnType("jsonb");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<string>("subsectionids")
                        .HasColumnType("jsonb");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("coreapi.Models.Content", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("displayorder")
                        .HasColumnType("integer");

                    b.Property<string>("mediaids")
                        .HasColumnType("jsonb");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<long>("parentid")
                        .HasColumnType("bigint");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.Property<long>("userid")
                        .HasColumnType("bigint");

                    b.HasKey("id");

                    b.ToTable("Content");
                });

            modelBuilder.Entity("coreapi.Models.ContentConsumption", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("consumptionlength")
                        .HasColumnType("double precision");

                    b.Property<long>("contentid")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<long>("mediaid")
                        .HasColumnType("bigint");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<double>("totallength")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.Property<long>("userid")
                        .HasColumnType("bigint");

                    b.HasKey("id");

                    b.ToTable("ContentConsumption");
                });

            modelBuilder.Entity("coreapi.Models.Media", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .HasColumnType("text");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("coreapi.Models.Responses.ProfileResponse", b =>
                {
                    b.Property<double?>("consumptionlength")
                        .HasColumnType("double precision");

                    b.Property<string>("content_description")
                        .HasColumnType("text");

                    b.Property<long>("content_id")
                        .HasColumnType("bigint");

                    b.Property<string>("content_title")
                        .HasColumnType("text");

                    b.Property<string>("media_description")
                        .HasColumnType("text");

                    b.Property<string>("media_details")
                        .HasColumnType("jsonb");

                    b.Property<long>("media_id")
                        .HasColumnType("bigint");

                    b.Property<string>("media_name")
                        .HasColumnType("text");

                    b.Property<string>("media_type")
                        .HasColumnType("text");

                    b.Property<double?>("totallength")
                        .HasColumnType("double precision");

                    b.Property<long>("userid")
                        .HasColumnType("bigint");

                    b.ToTable("ProfileResponse");
                });

            modelBuilder.Entity("coreapi.Models.Users", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<bool?>("admin")
                        .HasColumnType("boolean");

                    b.Property<string>("appleuid")
                        .HasColumnType("text");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("createdBy")
                        .HasColumnType("text");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("googleuid")
                        .HasColumnType("text");

                    b.Property<string>("meta")
                        .HasColumnType("jsonb");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("updatedBy")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
