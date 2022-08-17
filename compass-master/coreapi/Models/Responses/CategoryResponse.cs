using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models.Responses
{
    public class CategoryResponse
    {
        public long id { get; set; }

        // Require that the title is not null.
        // Use custom validation error.
        [Required(ErrorMessage = "Title is required.")]
        public string title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string description { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string subsectionids { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        public int? displayorder { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string followedby { get; set; }

        [NotMapped]
        public List<ContentConsumptionWithSubsection> contentsubsection { get; set; }

    }
}