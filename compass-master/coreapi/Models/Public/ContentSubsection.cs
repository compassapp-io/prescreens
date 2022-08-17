using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace coreapi.Models
{
    public class ContentSubsection
    {
        public long id { get; set; }
        public string title { get; set; }
        public string description { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string mediaids { get; set; }

        [NotMapped]
        public List<Media> media { get; set; }
    }
}