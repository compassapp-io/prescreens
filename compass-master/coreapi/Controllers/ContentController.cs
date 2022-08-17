using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentController : ControllerBase
    {
        private Context db;

        public ContentController(Context context)
        {
            this.db = context;
        }

        // GET: /Content
        [HttpGet]
        [Route("")]
        public ActionResult GetContents()
        {
            // Users u = (new SecurityHelper(this)).User;
            // var contents = this.db.Content.Join(
            //     this.db.Media,
            //     con => con.media,
            //     med => med.id,
            //     (con, med) => new
            //     {
            //         id = con.id,
            //         title = con.title,
            //         description = con.description,
            //         userid = con.userid,
            //         mediaid = con.media,
            //         meta = con.meta,
            //         createdAt = con.createdAt,
            //         createdBy = con.createdBy,
            //         updatedBy = con.updatedBy,
            //         updatedAt = con.updatedAt,
            //         url = med.name
            //     }
            // ).ToList();
            try
            {
                var allcontents = this.db.Content.ToList();  //Preload all content in one roundtrip to the database
                var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

                var contents = allcontents.ToList();
                if (contents.Count() > 0)
                {
                    foreach (Content c in contents)
                    {
                        // dynamic mediaInfo = new JArray();
                        List<Media> media;
                        media = new List<Media>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                media.Add(new Media()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta
                                });

                            }
                            if (media.Count() > 0)
                            {
                                c.media = media;
                            }
                            else
                            {
                                c.media = null;
                            }
                        }
                    }
                    return Ok(contents);
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

        // GET: /Content/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult GetContent(int id)
        {
            // SecurityHelper security = new SecurityHelper(this);
            // Users u = security.User;
            // Content content = this.db.Content.Where(u => u.id == id).FirstOrDefault();
            // if (content == null)
            // {
            //     return NotFound();
            // }
            // else
            // {
            //     Media media = this.db.Media.Where(u => u.id == content.media).FirstOrDefault();
            //     if (media == null)
            //     {
            //         return Ok(content);
            //     }
            //     else
            //     {
            //         content.medianame = media.name;
            //         return Ok(content);
            //     }

            // }
            try
            {
                var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

                Content content = this.db.Content.Where(u => u.id == id).FirstOrDefault();
                if (content != null)
                {
                    List<Media> media;
                    media = new List<Media>();
                    if (content.mediaids != null)
                    {
                        var converter = new ExpandoObjectConverter();
                        dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(content.mediaids, converter);
                        for (var i = 0; i < mediaIds.Count; i++)
                        {
                            var mediaid = (int)mediaIds[i].id;
                            var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                            media.Add(new Media()
                            {
                                id = mediaO.id,
                                name = mediaO.name,
                                url = mediaO.url,
                                type = mediaO.type,
                                description = mediaO.description,
                                meta = mediaO.meta
                            });

                        }
                        if (media.Count() > 0)
                        {
                            content.media = media;
                        }
                        else
                        {
                            content.media = null;
                        }
                    }
                    return Ok(content);
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

        // POST: /Content
        [HttpPost]
        public ActionResult PostContent(Content content)
        {
            // Users u = (new SecurityHelper(this)).User;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // List<Media> media;
            // media = new List<Media>();
            // var mediaInfo = JObject.Parse(content.medianame);
            // for (var i = 0; i < mediaInfo["episodes"].Count(); i++)
            // {
            //     var list = new JArray(mediaInfo["episodes"][i]["artist"].ToString());
            //     media.Add(new Media()
            //     {
            //         name = mediaInfo["episodes"][i]["name"].ToString(),
            //         type = content.type,
            //         description = mediaInfo["episodes"][i]["description"].ToString(),
            //         meta = JsonConvert.SerializeObject(list)
            //     });
            // }
            try
            {
                List<Media> media;
                media = new List<Media>();
                List<object> medialist = new List<object>();
                if (content.media != null)
                {
                    for (var i = 0; i < content.media.Count(); i++)
                    {
                        media.Add(new Media()
                        {
                            name = content.media[i].name,
                            url = content.media[i].url,
                            type = content.media[i].type,
                            description = content.media[i].description,
                            meta = content.media[i].meta,
                            createdAt = DateTime.Now,
                            updatedAt = DateTime.Now
                        });
                    }

                    this.db.AddRange(media);
                    this.db.SaveChanges();
                    for (var j = 0; j < media.Count(); j++)
                    {
                        medialist.Add(new { media[j].id });
                    }
                }
                content.mediaids = JsonConvert.SerializeObject(medialist);
                content.createdAt = content.updatedAt = DateTime.Now;
                this.db.Add(content);
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(content);
        }

        /// <summary>
        /// Updates a detail object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        // PUT: /contents/5
        [HttpPut]
        [Route("{id}")]
        public ActionResult PutContent(int id, Content content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Users user = (new SecurityHelper(this)).User;
                var oContent = this.db.Content.Where(d => d.id == id).FirstOrDefault();
                if (oContent != null)
                {
                    List<Media> media;
                    media = new List<Media>();
                    List<object> medialist = new List<object>();
                    if (content.media != null)
                    {
                        for (var i = 0; i < content.media.Count; i++)
                        {
                            media.Add(new Media()
                            {
                                id = content.media[i].id,
                                name = content.media[i].name,
                                url = content.media[i].url,
                                type = content.media[i].type,
                                description = content.media[i].description,
                                meta = content.media[i].meta,
                                updatedBy = user.email,
                                updatedAt = DateTime.Now
                            });
                        }
                        this.db.UpdateRange(media);
                        this.db.SaveChanges();

                        for (var j = 0; j < media.Count(); j++)
                        {
                            medialist.Add(new { media[j].id });
                        }
                    }

                    oContent.parentid = content.parentid;
                    oContent.title = content.title;
                    oContent.description = content.description;
                    oContent.userid = user.id;
                    oContent.mediaids = JsonConvert.SerializeObject(medialist);
                    oContent.meta = content.meta;
                    oContent.updatedAt = DateTime.Now;
                    oContent.displayorder = content.displayorder;
                    oContent.updatedBy = user.email;
                    oContent.createdAt = content.createdAt;
                    oContent.createdBy = content.createdBy;
                    this.db.SaveChanges();
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
            return StatusCode((int)HttpStatusCode.NoContent);
        }

        // DELETE: /Content/5
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteContent(int id)
        {
            // SecurityHelper security = (new SecurityHelper(this));
            Content content = this.db.Content.Where(u => u.id == id).First();

            if (content == null)
            {
                return NotFound();
            }

            try
            {

                this.db.Content.Remove(content);
                this.db.SaveChanges();

                return Ok(content);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // GET: /Content/contentwithsections
        [HttpGet]
        [Route("contentwithsections")]
        public ActionResult GetContentsWithSections()
        {
            try
            {
                var allcontents = this.db.Content.ToList();  //Preload all content in one roundtrip to the database
                var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

                var contents = allcontents.Where(c => c.parentid == 0).ToList();
                if (contents.Count() > 0)
                {
                    foreach (Content c in contents)
                    {
                        List<ContentSubsection> contentSubSections = allcontents.Where(cu => cu.parentid == c.id)
                        .Select(s => new ContentSubsection
                        {
                            id = s.id,
                            title = s.title,
                            description = s.description,
                            mediaids = s.mediaids,
                            media = s.media
                        }).ToList();

                        if (contentSubSections.Count() > 0)
                        {
                            foreach (ContentSubsection cs in contentSubSections)
                            {
                                List<Media> mediaSubSection;
                                mediaSubSection = new List<Media>();
                                if (cs.mediaids != null)
                                {
                                    var converter = new ExpandoObjectConverter();
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (int)mediaIds[i].id;
                                        var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                        mediaSubSection.Add(new Media()
                                        {
                                            id = mediaO.id,
                                            name = mediaO.name,
                                            url = mediaO.url,
                                            type = mediaO.type,
                                            description = mediaO.description,
                                            meta = mediaO.meta
                                        });

                                    }
                                    if (mediaSubSection.Count() > 0)
                                    {
                                        cs.media = mediaSubSection;
                                    }
                                    else
                                    {
                                        cs.media = null;
                                    }
                                }
                            }
                        }
                        // dynamic mediaInfo = new JArray();
                        List<Media> media;
                        media = new List<Media>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                media.Add(new Media()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta
                                });

                            }
                            if (media.Count() > 0)
                            {
                                c.media = media;
                            }
                            else
                            {
                                c.media = null;
                            }
                        }

                        if (contentSubSections.Count() > 0)
                        {
                            c.contentsubsection = contentSubSections;
                        }
                        else
                        {
                            c.contentsubsection = null;
                        }
                    }
                    return Ok(contents);
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

        // GET: /Content/contentwithsectionsbyid/5
        [HttpGet]
        [Route("contentwithsectionsbyid/{id}")]
        public ActionResult GetContentsWithSectionsById(int id)
        {
            try
            {
                var allcontents = this.db.Content.ToList();  //Preload all content in one roundtrip to the database
                var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

                var content = allcontents.Where(c => c.id == id && c.parentid == 0).FirstOrDefault();
                if (content != null)
                {
                    List<ContentSubsection> contentSubSections = allcontents.Where(cu => cu.parentid == content.id)
                    .Select(s => new ContentSubsection
                    {
                        id = s.id,
                        title = s.title,
                        description = s.description,
                        mediaids = s.mediaids,
                        media = s.media
                    }).ToList();

                    if (contentSubSections.Count() > 0)
                    {
                        foreach (ContentSubsection cs in contentSubSections)
                        {
                            List<Media> mediaSubSection;
                            mediaSubSection = new List<Media>();
                            if (cs.mediaids != null)
                            {
                                var converter = new ExpandoObjectConverter();
                                dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                for (var i = 0; i < mediaIds.Count; i++)
                                {
                                    var mediaid = (int)mediaIds[i].id;
                                    var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                    mediaSubSection.Add(new Media()
                                    {
                                        id = mediaO.id,
                                        name = mediaO.name,
                                        url = mediaO.url,
                                        type = mediaO.type,
                                        description = mediaO.description,
                                        meta = mediaO.meta
                                    });

                                }
                                if (mediaSubSection.Count() > 0)
                                {
                                    cs.media = mediaSubSection;
                                }
                                else
                                {
                                    cs.media = null;
                                }
                            }
                        }
                    }
                    // dynamic mediaInfo = new JArray();
                    List<Media> media;
                    media = new List<Media>();
                    if (content.mediaids != null)
                    {
                        var converter = new ExpandoObjectConverter();
                        dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(content.mediaids, converter);
                        for (var i = 0; i < mediaIds.Count; i++)
                        {
                            var mediaid = (int)mediaIds[i].id;
                            var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                            media.Add(new Media()
                            {
                                id = mediaO.id,
                                name = mediaO.name,
                                url = mediaO.url,
                                type = mediaO.type,
                                description = mediaO.description,
                                meta = mediaO.meta
                            });

                        }
                        if (media.Count() > 0)
                        {
                            content.media = media;
                        }
                        else
                        {
                            content.media = null;
                        }
                    }

                    if (contentSubSections.Count() > 0)
                    {
                        content.contentsubsection = contentSubSections;
                    }
                    else
                    {
                        content.contentsubsection = null;
                    }

                    return Ok(content);
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


        // GET: /Content/recommendedcontentswithsections
        [HttpGet]
        [Route("recommendedcontentswithsections")]
        public ActionResult GetRecommendedContentsWithSections()
        {
            try
            {
                var allcontents = this.db.Content.OrderBy(x => x.displayorder).ToList();  //Preload all content in one roundtrip to the database
                var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

                Users user = (new SecurityHelper(this)).User;
                var contents = allcontents.Where(c => c.parentid == 0).ToList();
                var contentConsumptions = this.db.ContentConsumption.Where(u => u.userid == user.id).ToList();
                if (contents.Count() > 0)
                {
                    if (contentConsumptions.Count() > 0)
                    {
                        foreach (ContentConsumption cc in contentConsumptions)
                        {
                            contents.RemoveAll(item => item.id == cc.contentid);
                        }
                    }

                    foreach (Content c in contents)
                    {

                        List<ContentSubsection> contentSubSections = allcontents.Where(cu => cu.parentid == c.id)
                        .Select(s => new ContentSubsection()
                        {
                            id = s.id,
                            title = s.title,
                            description = s.description,
                            mediaids = s.mediaids,
                            media = s.media
                        }).ToList();

                        if (contentSubSections.Count() > 0)
                        {
                            foreach (ContentSubsection cs in contentSubSections)
                            {
                                List<Media> mediaSubSection;
                                mediaSubSection = new List<Media>();
                                if (cs.mediaids != null)
                                {
                                    var converter = new ExpandoObjectConverter();
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (long)mediaIds[i].id;
                                        var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                        mediaSubSection.Add(new Media()
                                        {
                                            id = mediaO.id,
                                            name = mediaO.name,
                                            url = mediaO.url,
                                            type = mediaO.type,
                                            description = mediaO.description,
                                            meta = mediaO.meta
                                        });

                                    }
                                    if (mediaSubSection.Count() > 0)
                                    {
                                        cs.media = mediaSubSection;
                                    }
                                    else
                                    {
                                        cs.media = null;
                                    }
                                }
                            }
                        }
                        // dynamic mediaInfo = new JArray();
                        List<Media> media;
                        media = new List<Media>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();

                                media.Add(new Media()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta
                                });

                            }
                            if (media.Count() > 0)
                            {
                                c.media = media;
                            }
                            else
                            {
                                c.media = null;
                            }
                        }

                        if (contentSubSections.Count() > 0)
                        {
                            c.contentsubsection = contentSubSections;
                        }
                        else
                        {
                            c.contentsubsection = null;
                        }
                    }
                    return Ok(contents);
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