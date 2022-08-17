using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models.Responses
{
    public class ContentConsumptionWithSubsection
    {
        public long id { get; set; }
        public string title { get; set; }
        public string description { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string mediaids { get; set; }

        [NotMapped]
        public List<MediaConsumption> media { get; set; }
    }
}