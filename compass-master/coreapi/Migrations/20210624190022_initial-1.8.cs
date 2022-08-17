using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial18 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "parentid",
                table: "Content",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "ProfileResponse",
                columns: table => new
                {
                    content_id = table.Column<long>(nullable: false),
                    content_title = table.Column<string>(nullable: true),
                    content_description = table.Column<string>(nullable: true),
                    media_id = table.Column<long>(nullable: false),
                    media_name = table.Column<string>(nullable: true),
                    media_type = table.Column<string>(nullable: true),
                    media_description = table.Column<string>(nullable: true),
                    userid = table.Column<long>(nullable: false),
                    totallength = table.Column<double>(nullable: true),
                    consumptionlength = table.Column<double>(nullable: true),
                    media_details = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileResponse");

            migrationBuilder.DropColumn(
                name: "parentid",
                table: "Content");
        }
    }
}
