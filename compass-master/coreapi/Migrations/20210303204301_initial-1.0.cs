using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "userid",
                table: "Assessments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userid",
                table: "Assessments");
        }
    }
}
