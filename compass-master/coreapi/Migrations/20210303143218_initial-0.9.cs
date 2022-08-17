using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial09 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "question",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "response",
                table: "Assessments");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Assessments",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Assessments");

            migrationBuilder.AddColumn<string>(
                name: "question",
                table: "Assessments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "response",
                table: "Assessments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
