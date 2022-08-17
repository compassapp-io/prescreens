using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using coreapi.Models.Responses;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentConsumptionController : ControllerBase
    {
        private Context db;

        public ContentConsumptionController(Context context)
        {
            this.db = context;
        }

        // GET: /ContentConsumption
        [HttpGet]
        [Route("")]
        public ActionResult GetContentConsumption()
        {
            Users user = (new SecurityHelper(this)).User;
            var contentsconsumption = this.db.ContentConsumption.Join(
                this.db.Media,
                con => con.mediaid,
                med => med.id,
                (concs, med) => new
                {
                    id = concs.id,
                    mediaid = concs.mediaid,
                    userid = concs.userid,
                    contentid = concs.contentid,
                    totallength = concs.totallength,
                    consumptionlength = concs.consumptionlength,
                    meta = med.meta,
                    medianame = med.name,
                    mediaurl = med.url,
                    type = med.type,
                    description = med.description
                }
            ).Where(c => c.userid == user.id).ToList();

            return Ok(contentsconsumption);
        }

        // GET: /ContentConsumption/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult GetContentConsumption(int id)
        {
            SecurityHelper security = new SecurityHelper(this);
            Users user = security.User;
            ContentConsumption contentconsumption = this.db.ContentConsumption.Where(c => c.id == id && c.userid == user.id).FirstOrDefault();
            if (contentconsumption == null)
            {
                return NotFound();
            }
            else
            {
                Media media = this.db.Media.Where(u => u.id == contentconsumption.mediaid).FirstOrDefault();
                if (media == null)
                {
                    return Ok(contentconsumption);
                }
                else
                {
                    contentconsumption.medianame = media.name;
                    return Ok(contentconsumption);
                }

            }
        }

        // POST: /ContentConsumption
        [HttpPost]
        public ActionResult PostContentConsumption(ContentConsumption contentconsumption)
        {
            Users user = (new SecurityHelper(this)).User;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // dynamic userNameParted = this.SplitFullName(user.Name);

            try
            {
                contentconsumption.userid = user.id;
                contentconsumption.createdAt = contentconsumption.updatedAt = DateTime.Now;
                this.db.Add(contentconsumption);
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(contentconsumption);
        }

        /// <summary>
        /// Updates a detail object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        // PUT: /ContentConsumption/5
        [HttpPut]
        [Route("{id}")]
        public ActionResult PutContentConsumption(int id, ContentConsumption contentconsumption)
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var oContentConsumption = this.db.ContentConsumption.Where(d => d.id == id).FirstOrDefault();
                if (oContentConsumption != null)
                {
                    oContentConsumption.mediaid = contentconsumption.mediaid;
                    oContentConsumption.userid = user.id;
                    oContentConsumption.contentid = contentconsumption.contentid;
                    oContentConsumption.totallength = contentconsumption.totallength;
                    oContentConsumption.consumptionlength = contentconsumption.consumptionlength;
                    oContentConsumption.meta = contentconsumption.meta;
                    oContentConsumption.updatedBy = contentconsumption.updatedBy;
                    oContentConsumption.updatedAt = DateTime.Now;

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

        // DELETE: /ContentConsumption/5
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteContentConsumption(int id)
        {
            SecurityHelper security = (new SecurityHelper(this));
            Users user = security.User;
            ContentConsumption contentconsumption = this.db.ContentConsumption.Where(c => c.id == id && c.userid == user.id).First();

            if (contentconsumption == null)
            {
                return NotFound();
            }

            try
            {

                this.db.ContentConsumption.Remove(contentconsumption);
                this.db.SaveChanges();

                return Ok(contentconsumption);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Gets a specific content consumption object
        /// </summary>
        /// <param name="mediaid"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("contentconsumptionbymedia/{mediaid}")]
        public ActionResult GetContentConsumptionByMedia(int mediaid)
        {
            Users user = (new SecurityHelper(this)).User;
            ContentConsumption contentconsumption = this.db.ContentConsumption.Where(u => u.mediaid == mediaid && u.userid == user.id).FirstOrDefault();
            if (contentconsumption == null)
            {
                return NotFound();
            }
            else
            {
                Media media = this.db.Media.Where(u => u.id == contentconsumption.mediaid).FirstOrDefault();
                if (media == null)
                {
                    return Ok(contentconsumption);
                }
                else
                {
                    contentconsumption.medianame = media.name;
                    return Ok(contentconsumption);
                }

            }

        }

        /// <summary>
        /// Gets a specific content consumption object
        /// </summary>
        /// <param name="contentid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("contentconsumptionbycontent/{contentid}")]
        public ActionResult GetContentConsumptionByContent(int contentid)
        {
            Users user = (new SecurityHelper(this)).User;
            var contentList = new List<ContentResponse>();
            var contentConsumptions = this.db.ContentConsumption.Where(u => u.contentid == contentid && u.userid == user.id).ToList();
            if (contentConsumptions.Count() == 0)
            {
                return NotFound();
            }
            else
            {
                foreach (ContentConsumption contentconsumption in contentConsumptions)
                {
                    var isContent = contentList.Find(c => c.id == contentconsumption.contentid);
                    if (isContent == null)
                    {
                        var contents = this.db.Content.Where(c => c.id == contentconsumption.contentid && c.parentid == 0).FirstOrDefault();
                        contentList.Add(new ContentResponse()
                        {
                            id = contents.id,
                            parentid = contents.parentid,
                            title = contents.title,
                            description = contents.description,
                            userid = contents.userid,
                            mediaids = contents.mediaids,
                            meta = contents.meta,
                            createdAt = contents.createdAt,
                            createdBy = contents.createdBy,
                            updatedAt = contents.updatedAt,
                            updatedBy = contents.updatedBy,
                        });
                    }
                }

                if (contentList.Count() > 0)
                {
                    foreach (ContentResponse c in contentList)
                    {
                        List<ContentConsumptionWithSubsection> contentConsumptionWithSubsection = this.db.Content.Where(cu => cu.parentid == c.id)
                        .Select(s => new ContentConsumptionWithSubsection
                        {
                            id = s.id,
                            title = s.title,
                            description = s.description,
                            mediaids = s.mediaids
                        }).ToList();

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            foreach (ContentConsumptionWithSubsection cs in contentConsumptionWithSubsection)
                            {
                                List<MediaConsumption> mediaSubSection;
                                mediaSubSection = new List<MediaConsumption>();
                                if (cs.mediaids != null)
                                {
                                    var converter = new ExpandoObjectConverter();
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (int)mediaIds[i].id;
                                        var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                        var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                        mediaSubSection.Add(new MediaConsumption()
                                        {
                                            id = mediaO.id,
                                            name = mediaO.name,
                                            url = mediaO.url,
                                            type = mediaO.type,
                                            description = mediaO.description,
                                            meta = mediaO.meta,
                                            totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                            consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                            createdBy = mediaO.createdBy,
                                            createdAt = mediaO.createdAt,
                                            updatedBy = mediaO.updatedBy,
                                            updatedAt = mediaO.updatedAt
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
                        List<MediaConsumption> media;
                        media = new List<MediaConsumption>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                media.Add(new MediaConsumption()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta,
                                    totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                    consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                    createdBy = mediaO.createdBy,
                                    createdAt = mediaO.createdAt,
                                    updatedBy = mediaO.updatedBy,
                                    updatedAt = mediaO.updatedAt
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

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            c.contentsubsection = contentConsumptionWithSubsection;
                        }
                        else
                        {
                            c.contentsubsection = null;
                        }
                    }
                }
                else
                {
                    return NotFound();
                }

                return Ok(contentList[0]);
            }

        }

        /// <summary>
        /// Gets a specific content consumption object
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("contentconsumptionwithsection")]
        public ActionResult GetContentConsumptionWithSection()
        {
            var allcontents = this.db.Content.OrderBy(x=>x.displayorder).ToList();  //Preload all content in one roundtrip to the database
            var allmedia = this.db.Media.ToList();  //Preload all media in one roundtrip to the database

            Users user = (new SecurityHelper(this)).User;
            var contentList = new List<ContentResponse>();
            var contentConsumptions = this.db.ContentConsumption.Where(u => u.userid == user.id).ToList();
            if (contentConsumptions.Count() == 0)
            {
                return NotFound();
            }
            else
            {
                foreach (ContentConsumption contentconsumption in contentConsumptions)
                {
                    var isContent = contentList.Find(c => c.id == contentconsumption.contentid);
                    if (isContent == null)
                    {
                        var contents = allcontents.Where(c => c.id == contentconsumption.contentid && c.parentid == 0).FirstOrDefault();
                        contentList.Add(new ContentResponse()
                        {
                            id = contents.id,
                            parentid = contents.parentid,
                            title = contents.title,
                            description = contents.description,
                            userid = contents.userid,
                            mediaids = contents.mediaids,
                            meta = contents.meta,
                            createdAt = contents.createdAt,
                            createdBy = contents.createdBy,
                            updatedAt = contents.updatedAt,
                            updatedBy = contents.updatedBy,
                            displayorder = contents.displayorder,
                        });
                    }
                }

                if (contentList.Count() > 0)
                {
                    foreach (ContentResponse c in contentList)
                    {
                        List<ContentConsumptionWithSubsection> contentConsumptionWithSubsection = allcontents.Where(cu => cu.parentid == c.id)
                        .Select(s => new ContentConsumptionWithSubsection
                        {
                            id = s.id,
                            title = s.title,
                            description = s.description,
                            mediaids = s.mediaids
                        }).ToList();

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            foreach (ContentConsumptionWithSubsection cs in contentConsumptionWithSubsection)
                            {
                                List<MediaConsumption> mediaSubSection;
                                mediaSubSection = new List<MediaConsumption>();
                                if (cs.mediaids != null)
                                {
                                    var converter = new ExpandoObjectConverter();
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (int)mediaIds[i].id;
                                        var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();
                                        var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                        mediaSubSection.Add(new MediaConsumption()
                                        {
                                            id = mediaO.id,
                                            name = mediaO.name,
                                            url = mediaO.url,
                                            type = mediaO.type,
                                            description = mediaO.description,
                                            meta = mediaO.meta,
                                            totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                            consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                            createdBy = mediaO.createdBy,
                                            createdAt = mediaO.createdAt,
                                            updatedBy = mediaO.updatedBy,
                                            updatedAt = mediaO.updatedAt
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
                        List<MediaConsumption> media;
                        media = new List<MediaConsumption>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = allmedia.Where(u => u.id == mediaid).FirstOrDefault();
                                var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                media.Add(new MediaConsumption()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta,
                                    totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                    consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                    createdBy = mediaO.createdBy,
                                    createdAt = mediaO.createdAt,
                                    updatedBy = mediaO.updatedBy,
                                    updatedAt = mediaO.updatedAt
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

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            c.contentsubsection = contentConsumptionWithSubsection;
                        }
                        else
                        {
                            c.contentsubsection = null;
                        }
                    }
                }
                else
                {
                    return NotFound();
                }

                return Ok(contentList.OrderBy(o=>o.displayorder));
            }
        }


        /// <summary>
        /// Gets all contents with consumption object
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("allcontentsconsumptionwithsection")]
        public ActionResult GetAllContentsConsumptionWithSection()
        {
            Users user = (new SecurityHelper(this)).User;
            var contentList = new List<ContentResponse>();
            var contents = this.db.Content.Where(c => c.parentid == 0).ToList();
            var contentConsumptions = this.db.ContentConsumption.Where(u => u.userid == user.id).ToList();
            if (contentConsumptions.Count() == 0)
            {
                return NotFound();
            }
            else
            {
                foreach (Content content in contents)
                {
                    contentList.Add(new ContentResponse()
                    {
                        id = content.id,
                        parentid = content.parentid,
                        title = content.title,
                        description = content.description,
                        userid = content.userid,
                        mediaids = content.mediaids,
                        meta = content.meta,
                        createdAt = content.createdAt,
                        createdBy = content.createdBy,
                        updatedAt = content.updatedAt,
                        updatedBy = content.updatedBy,
                    });
                }

                if (contentList.Count() > 0)
                {
                    foreach (ContentResponse c in contentList)
                    {
                        List<ContentConsumptionWithSubsection> contentConsumptionWithSubsection = this.db.Content.Where(cu => cu.parentid == c.id)
                        .Select(s => new ContentConsumptionWithSubsection
                        {
                            id = s.id,
                            title = s.title,
                            description = s.description,
                            mediaids = s.mediaids
                        }).ToList();

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            foreach (ContentConsumptionWithSubsection cs in contentConsumptionWithSubsection)
                            {
                                List<MediaConsumption> mediaSubSection;
                                mediaSubSection = new List<MediaConsumption>();
                                if (cs.mediaids != null)
                                {
                                    var converter = new ExpandoObjectConverter();
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (int)mediaIds[i].id;
                                        var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                        var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                        mediaSubSection.Add(new MediaConsumption()
                                        {
                                            id = mediaO.id,
                                            name = mediaO.name,
                                            url = mediaO.url,
                                            type = mediaO.type,
                                            description = mediaO.description,
                                            meta = mediaO.meta,
                                            totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                            consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                            createdBy = mediaO.createdBy,
                                            createdAt = mediaO.createdAt,
                                            updatedBy = mediaO.updatedBy,
                                            updatedAt = mediaO.updatedAt
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
                        List<MediaConsumption> media;
                        media = new List<MediaConsumption>();
                        if (c.mediaids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(c.mediaids, converter);
                            for (var i = 0; i < mediaIds.Count; i++)
                            {
                                var mediaid = (int)mediaIds[i].id;
                                var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                var contentConsumptionO = contentConsumptions.Find(cc => cc.mediaid == mediaid);

                                media.Add(new MediaConsumption()
                                {
                                    id = mediaO.id,
                                    name = mediaO.name,
                                    url = mediaO.url,
                                    type = mediaO.type,
                                    description = mediaO.description,
                                    meta = mediaO.meta,
                                    totallength = contentConsumptionO == null ? null : (double?)contentConsumptionO.totallength,
                                    consumptionlength = contentConsumptionO == null ? null : (double?)contentConsumptionO.consumptionlength,
                                    createdBy = mediaO.createdBy,
                                    createdAt = mediaO.createdAt,
                                    updatedBy = mediaO.updatedBy,
                                    updatedAt = mediaO.updatedAt
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

                        if (contentConsumptionWithSubsection.Count() > 0)
                        {
                            c.contentsubsection = contentConsumptionWithSubsection;
                        }
                        else
                        {
                            c.contentsubsection = null;
                        }
                    }
                }
                else
                {
                    return NotFound();
                }

                return Ok(contentList);
            }
        }


        /// <summary>
        /// Gets all contents with consumption object
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("allcategoriesconsumptionwithsection")]
        public ActionResult GetAllCategoriesConsumptionWithSection()
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var categoryList = new List<CategoryResponse>();
                var categories = this.db.Category.ToList();

                if (categories.Count() > 0)
                {

                    foreach (Category category in categories)
                    {
                        categoryList.Add(new CategoryResponse()
                        {
                            id = category.id,
                            title = category.title,
                            description = category.description,
                            subsectionids = category.subsectionids,
                            meta = category.meta,
                            createdAt = category.createdAt,
                            createdBy = category.createdBy,
                            updatedAt = category.updatedAt,
                            updatedBy = category.updatedBy,
                            displayorder = category.displayorder,
                            followedby = category.followedby
                        });
                    }

                    if (categoryList.Count() > 0)
                    {

                        foreach (CategoryResponse cr in categoryList)
                        {
                            List<ContentConsumptionWithSubsection> contentSubSections;
                            contentSubSections = new List<ContentConsumptionWithSubsection>();
                            if (cr.subsectionids != null)
                            {
                                var converter = new ExpandoObjectConverter();
                                dynamic subsectionIds = JsonConvert.DeserializeObject<dynamic>(cr.subsectionids, converter);
                                for (var i = 0; i < subsectionIds.Count; i++)
                                {
                                    var subsectionid = (int)subsectionIds[i].id;
                                    var subsectionO = this.db.Content.Where(u => u.id == subsectionid && u.parentid != 0).FirstOrDefault();

                                    contentSubSections.Add(new ContentConsumptionWithSubsection()
                                    {
                                        id = subsectionO.id,
                                        title = subsectionO.title,
                                        description = subsectionO.description,
                                        mediaids = subsectionO.mediaids
                                    });

                                }

                                if (contentSubSections.Count() > 0)
                                {
                                    foreach (ContentConsumptionWithSubsection cs in contentSubSections)
                                    {
                                        List<MediaConsumption> mediaSubSection;
                                        mediaSubSection = new List<MediaConsumption>();
                                        if (cs.mediaids != null)
                                        {
                                            dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                            for (var i = 0; i < mediaIds.Count; i++)
                                            {
                                                var mediaid = (int)mediaIds[i].id;
                                                var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                                var contentConsumption = this.db.ContentConsumption.Where(cc => cc.mediaid == mediaid && cc.userid == user.id).FirstOrDefault();

                                                mediaSubSection.Add(new MediaConsumption()
                                                {
                                                    id = mediaO.id,
                                                    name = mediaO.name,
                                                    url = mediaO.url,
                                                    type = mediaO.type,
                                                    description = mediaO.description,
                                                    meta = mediaO.meta,
                                                    totallength = contentConsumption == null ? null : (double?)contentConsumption.totallength,
                                                    consumptionlength = contentConsumption == null ? null : (double?)contentConsumption.consumptionlength,
                                                    createdAt = mediaO.createdAt,
                                                    updatedAt = mediaO.updatedAt
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
                            }

                            if (contentSubSections.Count() > 0)
                            {
                                cr.contentsubsection = contentSubSections;
                            }
                            else
                            {
                                cr.contentsubsection = null;
                            }
                        }
                        return Ok(categoryList);
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


        /// <summary>
        /// Gets all contents with consumption object
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("categoryconsumptionwithsectionbyid/{id}")]
        public ActionResult GetCategoryConsumptionWithSectionById(int id)
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var categoryList = new CategoryResponse();
                var category = this.db.Category.Where(c => c.id == id).FirstOrDefault();

                if (category != null)
                {
                    categoryList.id = category.id;
                    categoryList.title = category.title;
                    categoryList.description = category.description;
                    categoryList.subsectionids = category.subsectionids;
                    categoryList.meta = category.meta;
                    categoryList.createdAt = category.createdAt;
                    categoryList.createdBy = category.createdBy;
                    categoryList.updatedAt = category.updatedAt;
                    categoryList.updatedBy = category.updatedBy;
                    categoryList.displayorder = category.displayorder;
                    categoryList.followedby = category.followedby;

                    if (categoryList != null)
                    {

                        List<ContentConsumptionWithSubsection> contentSubSections;
                        contentSubSections = new List<ContentConsumptionWithSubsection>();
                        if (categoryList.subsectionids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic subsectionIds = JsonConvert.DeserializeObject<dynamic>(categoryList.subsectionids, converter);
                            for (var i = 0; i < subsectionIds.Count; i++)
                            {
                                var subsectionid = (int)subsectionIds[i].id;
                                var subsectionO = this.db.Content.Where(u => u.id == subsectionid && u.parentid != 0).FirstOrDefault();

                                contentSubSections.Add(new ContentConsumptionWithSubsection()
                                {
                                    id = subsectionO.id,
                                    title = subsectionO.title,
                                    description = subsectionO.description,
                                    mediaids = subsectionO.mediaids
                                });

                            }

                            if (contentSubSections.Count() > 0)
                            {
                                foreach (ContentConsumptionWithSubsection cs in contentSubSections)
                                {
                                    List<MediaConsumption> mediaSubSection;
                                    mediaSubSection = new List<MediaConsumption>();
                                    if (cs.mediaids != null)
                                    {
                                        dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                        for (var i = 0; i < mediaIds.Count; i++)
                                        {
                                            var mediaid = (int)mediaIds[i].id;
                                            var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();
                                            var contentConsumption = this.db.ContentConsumption.Where(cc => cc.mediaid == mediaid && cc.userid == user.id).FirstOrDefault();

                                            mediaSubSection.Add(new MediaConsumption()
                                            {
                                                id = mediaO.id,
                                                name = mediaO.name,
                                                url = mediaO.url,
                                                type = mediaO.type,
                                                description = mediaO.description,
                                                meta = mediaO.meta,
                                                totallength = contentConsumption == null ? null : (double?)contentConsumption.totallength,
                                                consumptionlength = contentConsumption == null ? null : (double?)contentConsumption.consumptionlength,
                                                createdAt = mediaO.createdAt,
                                                updatedAt = mediaO.updatedAt
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
                        }

                        if (contentSubSections.Count() > 0)
                        {
                            categoryList.contentsubsection = contentSubSections;
                        }
                        else
                        {
                            categoryList.contentsubsection = null;
                        }
                        return Ok(categoryList);
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