using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using coreapi.Models.Responses;
using Newtonsoft.Json.Linq;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private Context db;

        public AuthController(Context context)
        {
            this.db = context;
        }

        // GET: /Auth
        [HttpGet]
        [Route("admin/{email}/{password}")]
        public IActionResult Get(string email, string password)
        {
            Users user = new Users();
            Boolean isValidPassword = false;
            var userQ = this.db.Users.Where(u => u.email.Trim().ToLower() == email.Trim().ToLower() && u.admin == true).FirstOrDefault();
            if (userQ != null)
            {
                dynamic passwordQ = JObject.Parse(userQ.meta)["password"];
                if (passwordQ.Value == password)
                {
                    user = userQ;
                    isValidPassword = true;
                }
                if (user.email != null && isValidPassword)
                {
                    AuthResponse response = new AuthResponse();
                    response.userid = user.id;
                    response.email = user.email;
                    response.name = user.name;
                    response.admin = user.admin;
                    response.token = SecurityHelper.GenerateJsonWebToken(user);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return NotFound();
            }
        }

        // POST: /Auth
        [HttpPost]
        public IActionResult Post(Users user)
        {
            dynamic metaN = JObject.Parse(user.meta);
            Users userO = new Users();
            if (metaN != null && metaN.auth0 != null)
            {
                string auth0Id = metaN.auth0.sub.ToString();
                userO = this.db.Users.Where(u => u.auth0Id == auth0Id).FirstOrDefault();

                if (userO == null)
                {
                    user.createdAt = user.updatedAt = DateTime.Now;
                    user.createdBy = user.updatedBy = user.email;
                    user.auth0Id = auth0Id;

                    this.db.Add(user);
                    this.db.SaveChanges();
                    AuthResponse response = new AuthResponse();
                    response.userid = user.id;
                    response.email = user.email;
                    response.name = user.name;
                    response.admin = false;

                    response.incompleteProfile = string.IsNullOrWhiteSpace(response.name) || response.name == response.email;

                    response.token = SecurityHelper.GenerateJsonWebToken(user);

                    return Ok(response);
                }
                else
                {
                    AuthResponse response = new AuthResponse();

                    var firstAssessmentCompleted= db.Assessments.Any(a => a.type == "response" && a.updatedBy==userO.email);
                    var lastMoodDate = db.Moods.Where(x => x.UserId == userO.id).OrderByDescending(x => x.CreateAt).FirstOrDefault()?.CreateAt; ;

                    response.userid = userO.id;
                    response.email = userO.email;
                    response.name = userO.name;
                    response.admin = userO.admin;
                    response.incompleteProfile = string.IsNullOrWhiteSpace(response.name) || response.name == response.email;
                    response.token = SecurityHelper.GenerateJsonWebToken(userO);

                    response.firstAssessmentCompleted = firstAssessmentCompleted;

                    response.lastMoodDate = lastMoodDate;

                    return Ok(response);
                }
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpPut]
        public IActionResult Put(UpdateProfile updateProfileModel)
        {
            if(updateProfileModel.id <=0 || string.IsNullOrWhiteSpace(updateProfileModel.name))
            {
                return BadRequest();
            }

            var user = db.Users.Where(u => u.id == updateProfileModel.id).FirstOrDefault();

            if (user != null)
            {
                dynamic metaN = JObject.Parse(user.meta);
                metaN.auth0.name = updateProfileModel.name;
                user.name = updateProfileModel.name;
                user.meta = Newtonsoft.Json.JsonConvert.SerializeObject(metaN);
                user.updatedAt = DateTime.Now;
                db.SaveChanges();
                return Ok();
            }
            return NotFound();

        }
    }
    public class UpdateProfile
    {
        public long id { get; set; }
        public string name { get; set; }
    }
}