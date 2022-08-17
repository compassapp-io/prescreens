using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Dynamic;
using Newtonsoft.Json.Linq;
using coreapi.Models.Responses;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private Context db;

        public SearchController(Context context)
        {
            this.db = context;
        }
        [HttpGet]
        [Route("")]
        public ActionResult<IEnumerable<Command>> GetContents(string searchString)
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var contents = this.db.Content.ToList();
                if (contents.Count() > 0)
                {
                    List<MediaConsumption> mediaConsumption = new List<MediaConsumption>();
                    foreach (Content c in contents)
                    {
                        // dynamic mediaInfo = new JArray();   
                        // List<Content> contentLists = new List<Content>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = this.db.Media.Where(u => u.id == mediaid && (u.name.ToLower().Contains(searchString.Trim().ToLower()) || u.description.ToLower().Contains(searchString.Trim().ToLower()))).FirstOrDefault();

                                if (mediaO != null)
                                {
                                    var contentconsumption = this.db.ContentConsumption.Where(cc => cc.mediaid == mediaO.id && cc.userid == user.id).FirstOrDefault();

                                    mediaConsumption.Add(new MediaConsumption()
                                    {
                                        id = mediaO.id,
                                        name = mediaO.name,
                                        url = mediaO.url,
                                        type = mediaO.type,
                                        description = mediaO.description,
                                        meta = mediaO.meta,
                                        totallength = contentconsumption == null ? null : (double?)contentconsumption.totallength,
                                        consumptionlength = contentconsumption == null ? null : (double?)contentconsumption.consumptionlength
                                    });
                                }

                            }
                        }
                    }
                    if (mediaConsumption.Count() > 0)
                    {
                        var uniqueMediaConsumption = mediaConsumption.GroupBy(m => m.id).Select(y => y.First()).ToList();
                        return Ok(uniqueMediaConsumption);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }

}