using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models.Responses
{
    public class MediaConsumption
    {
        public long id { get; set; }

        // Require that the name is not null.
        // Use custom validation error.
        [Required(ErrorMessage = "Name is required.")]
        public string name { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string url { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        public string type { get; set; }
        public string description { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public double? totallength { get; set; }
        public double? consumptionlength { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
    }
}