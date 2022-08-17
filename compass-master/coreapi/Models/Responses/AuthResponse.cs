using System;

namespace coreapi.Models.Responses
{
    public class AuthResponse
    {
        public long userid { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public Boolean? admin { get; set; }
        public string photourl { get; set; }
        public DateTime createdtime { get; set; }
        public string token { get; set; }
        public bool incompleteProfile { get; set; }
        public bool firstAssessmentCompleted { get; set; }
        public DateTime? lastMoodDate { get; set; }
    }
}
