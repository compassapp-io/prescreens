using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models
{
    public class Assessments
    {
        public long id { get; set; }

        public long? parentid { get; set; }

        // Require that the Question is not null.
        // Use custom validation error.
        [Required(ErrorMessage = "Description is required.")]
        public string description { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        public string type { get; set; }
        public long? userid { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }

        // public DateTime today { get; set; }
    }
}