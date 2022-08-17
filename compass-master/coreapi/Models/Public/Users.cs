using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace coreapi.Models
{
    public class Users
    {
        public long id { get; set; }

        // Require that the name is not null.
        // Use custom validation error.
        [Required(ErrorMessage = "Name is required.")]
        public string name { get; set; }
        public string email { get; set; }
        // The JSON column
        [Column(TypeName = "jsonb")]
        public string meta { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        public string googleuid { get; set; }
        public string appleuid { get; set; }
        public Boolean? admin { get; set; }
        public string auth0Id { get; set; }
    }
}