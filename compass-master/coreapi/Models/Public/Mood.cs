using System;
namespace coreapi.Models.Public
{
    public class Mood
    {
        public long Id { get; set; }
        public int Value { get; set; }
        public long UserId { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
