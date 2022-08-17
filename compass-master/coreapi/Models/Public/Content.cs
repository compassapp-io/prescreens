using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models
{
    public class Content
    {
        public long id { get; set; }

        [Required(ErrorMessage = "parentid is required.")]
        public long parentid { get; set; }

        // Require that the title is not null.
        // Use custom validation error.
        [Required(ErrorMessage = "Title is required.")]
        public string title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string description { get; set; }

        [Required(ErrorMessage = "Userid is required.")]
        public long userid { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string mediaids { get; set; }

        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        public int? displayorder { get; set; }

        [NotMapped]
        public List<Media> media { get; set; }

        [NotMapped]
        public List<ContentSubsection> contentsubsection { get; set; }

    }
}