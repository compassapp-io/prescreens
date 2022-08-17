using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models
{
    public class ContentConsumption
    {
        public long id { get; set; }

        [Required(ErrorMessage = "MediaId is required.")]
        public long mediaid { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public long userid { get; set; }

        [Required(ErrorMessage = "ContentId is required.")]
        public long contentid { get; set; }
        public double totallength { get; set; }
        public double consumptionlength { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }

        [NotMapped]
        public string medianame { get; set; }
    }
}