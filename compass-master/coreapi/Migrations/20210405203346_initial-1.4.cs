using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Media",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "contentid",
                table: "ContentConsumption",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "contentid",
                table: "ContentConsumption");
        }
    }
}
