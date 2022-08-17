using System;
using System.Linq;
using coreapi.Models;
using coreapi.Models.Public;
using Microsoft.AspNetCore.Mvc;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoodController : ControllerBase
    {

        private Context db;

        public MoodController(Context context)
        {
            this.db = context;
        }

        [HttpPost]
        public IActionResult Post(AddMoodModel addMood)
        {
            if (addMood.UserId <= 0 || addMood.Value <=0)
            {
                return BadRequest();
            }

            var user = db.Users.Where(u => u.id == addMood.UserId).FirstOrDefault();

            if (user != null)
            {
                db.Moods.Add(new Mood
                {
                    UserId = addMood.UserId,
                    Value = addMood.Value,
                    CreateAt = DateTime.UtcNow
                });

                db.SaveChanges();
                return Ok();
            }

            return NotFound();

        }
    }

    public class AddMoodModel
    {
        public long UserId { get; set; }
        public int Value { get; set; }
    }
}
