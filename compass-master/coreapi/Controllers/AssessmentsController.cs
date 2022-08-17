using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssessmentsController : ControllerBase
    {
        private Context db;

        public AssessmentsController(Context context)
        {
            this.db = context;
        }

        // GET: /Assessments
        [HttpGet]
        [Route("")]
        public ActionResult GetAssessments()
        {
            Users user = (new SecurityHelper(this)).User;
            var assessments = this.db.Assessments.Where(a => a.type == "question").ToList();

            return Ok(assessments);
        }

        // GET: /Assessment/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult GetAssessment(int id)
        {
            SecurityHelper security = new SecurityHelper(this);
            Users user = security.User;
            Assessments assessment = this.db.Assessments.Where(a => a.id == id && a.type == "question").FirstOrDefault();
            if (assessment == null)
            {
                return NotFound();
            }

            return Ok(assessment);
        }

        // POST: /Assessments
        [HttpPost]
        public ActionResult PostAssessments(Assessments assessment)
        {
            Users user = (new SecurityHelper(this)).User;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // dynamic userNameParted = this.SplitFullName(user.Name);

            try
            {
                assessment.createdAt = assessment.updatedAt = DateTime.Now;
                assessment.createdBy = assessment.updatedBy = user.email;
                this.db.Add(assessment);
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(assessment);
        }

        /// <summary>
        /// Updates a detail object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public ActionResult PutDetail(int id, Assessments assessment)
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var oAssessment = this.db.Assessments.Where(d => d.id == id).FirstOrDefault();
                oAssessment.parentid = assessment.parentid;
                oAssessment.description = assessment.description;
                oAssessment.type = assessment.type;
                oAssessment.meta = assessment.meta;
                oAssessment.userid = assessment.userid;
                oAssessment.updatedBy = assessment.updatedBy;
                oAssessment.updatedAt = DateTime.Now;

                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return StatusCode((int)HttpStatusCode.NoContent);
        }

        // DELETE: /Assessment/5
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteContent(int id)
        {
            Users user = (new SecurityHelper(this)).User;
            Assessments assessment = this.db.Assessments.Where(u => u.id == id).First();

            if (assessment == null)
            {
                return NotFound();
            }

            try
            {

                this.db.Assessments.Remove(assessment);
                this.db.SaveChanges();

                return Ok(assessment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}