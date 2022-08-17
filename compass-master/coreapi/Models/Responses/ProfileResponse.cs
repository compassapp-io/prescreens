using System.ComponentModel.DataAnnotations.Schema;


namespace coreapi.Models.Responses
{
    public class ProfileResponse
    {
        public long content_id { get; set; }
        public string content_title { get; set; }
        public string content_description { get; set; }
        public long media_id { get; set; }
        public string media_name { get; set; }
        public string media_type { get; set; }
        public string media_description { get; set; }
        public long userid { get; set; }
        public double? totallength { get; set; }
        public double? consumptionlength { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string media_details { get; set; }

    }
}