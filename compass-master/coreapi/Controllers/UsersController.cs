using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using Newtonsoft.Json;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {

        private Context db;

        public UsersController(Context context)
        {
            this.db = context;
        }

        // GET: api/Users
        [HttpGet]
        [Route("")]
        public ActionResult Getusers()
        {
            // Users u = (new SecurityHelper(this)).User;
            var users = this.db.Users;


            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult GetUser(int id)
        {
            // SecurityHelper security = new SecurityHelper(this);
            // Users u = security.User;
            Users user = this.db.Users.Where(u => u.id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/Users
        [Route("")]
        [HttpPost]
        public ActionResult PostUser(Users user)
        {
            // Users u = (new SecurityHelper(this)).User;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // dynamic userNameParted = this.SplitFullName(user.Name);

            try
            {
                var userO = this.db.Users.Where(u => u.email == user.email).FirstOrDefault();
                if (userO == null)
                {
                    user.createdAt = user.updatedAt = DateTime.Now;
                    user.createdBy = user.updatedBy = user.email;

                    this.db.Add(user);
                    this.db.SaveChanges();
                }
                else
                {
                    userO.name = user.name;
                    userO.meta = user.meta;
                    userO.updatedAt = DateTime.Now;
                    this.db.Users.Update(userO);
                    this.db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(user);
        }

        // DELETE: api/Users/5
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteUser(int id)
        {
            // SecurityHelper security = (new SecurityHelper(this));
            Users user = this.db.Users.Where(u => u.id == id).First();

            if (user == null)
            {
                return NotFound();
            }

            try
            {

                this.db.Users.Remove(user);
                this.db.SaveChanges();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}