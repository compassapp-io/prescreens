using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private Context db;

        public ProfileController(Context context)
        {
            this.db = context;
        }

        /// <summary>
        /// Gets a specific content consumption object
        /// </summary>
        /// <param name="date"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("contentconsumptionbymedia/{date}")]
        public ActionResult GetContentConsumptionByDate(string date)
        {

            Users user = (new SecurityHelper(this)).User;
            try
            {
                var consumptionData = this.db.ProfileResponse.FromSqlRaw("SELECT * FROM public.getprofiledata({0}, {1});", date, user.id).ToList();

                if (consumptionData == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(consumptionData);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            // Users user = (new SecurityHelper(this)).User;
            // List<ContentConsumption> contentConsumption = new List<ContentConsumption>();
            // List<Content> content = new List<Content>();
            // var contentConsumptionList = this.db.ContentConsumption.Where(u => u.userid == userid).ToList();
            // if (contentConsumptionList == null)
            // {
            //     return NotFound();
            // }
            // else
            // {
            //     foreach (var item in contentConsumptionList)
            //     {
            //         if (item.createdAt.ToString("yyyy-MM-dd") == date)
            //         {
            //             contentConsumption.Add(item);
            //         }
            //     }
            //     var contentIdsList = contentConsumption.GroupBy(u => u.contentid).Select(g => g.Key).ToList();

            //     content = this.db.Content.Where(u => contentIdsList.Contains(u.id));

            // Media media = this.db.Media.Where(u => u.id == contentconsumption.mediaid).FirstOrDefault();
            // if (media == null)
            // {
            //     return Ok(contentconsumption);
            // }
            // else
            // {
            //     // contentconsumption.medianame = media.name;
            //     return Ok(contentconsumption);
            // }
        }

    }
}