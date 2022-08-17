using System;
using System.Collections.Generic;
using System.Net;
using coreapi.Helpers;
using coreapi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;

namespace coreapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private Context db;

        public CategoryController(Context context)
        {
            this.db = context;
        }

        // GET: /Category
        [HttpGet]
        [Route("")]
        public ActionResult GetCategory()
        {
            try
            {

                var categories = this.db.Category.ToList();

                if (categories.Count() > 0)
                {
                    foreach (var c in categories)
                    {
                        List<ContentSubsection> contentSubSections;
                        contentSubSections = new List<ContentSubsection>();
                        if (c.subsectionids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic subsectionIds = JsonConvert.DeserializeObject<dynamic>(c.subsectionids, converter);
                            for (var i = 0; i < subsectionIds.Count; i++)
                            {
                                var subsectionid = (int)subsectionIds[i].id;
                                var subsectionO = this.db.Content.Where(u => u.id == subsectionid && u.parentid != 0).FirstOrDefault();

                                contentSubSections.Add(new ContentSubsection()
                                {
                                    id = subsectionO.id,
                                    title = subsectionO.title,
                                    description = subsectionO.description,
                                    mediaids = subsectionO.mediaids,
                                    media = subsectionO.media
                                });

                            }

                            if (contentSubSections.Count() > 0)
                            {
                                foreach (ContentSubsection cs in contentSubSections)
                                {
                                    List<Media> mediaSubSection;
                                    mediaSubSection = new List<Media>();
                                    if (cs.mediaids != null)
                                    {
                                        dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                        for (var i = 0; i < mediaIds.Count; i++)
                                        {
                                            var mediaid = (int)mediaIds[i].id;
                                            var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();

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
                    return Ok(categories);
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

        // GET: /Category/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult GetCategory(int id)
        {
            try
            {
                var category = this.db.Category.Where(c => c.id == id).FirstOrDefault();

                if (category != null)
                {
                    List<ContentSubsection> contentSubSections;
                    contentSubSections = new List<ContentSubsection>();
                    if (category.subsectionids != null)
                    {
                        var converter = new ExpandoObjectConverter();
                        dynamic subsectionIds = JsonConvert.DeserializeObject<dynamic>(category.subsectionids, converter);
                        for (var i = 0; i < subsectionIds.Count; i++)
                        {
                            var subsectionid = (int)subsectionIds[i].id;
                            var subsectionO = this.db.Content.Where(u => u.id == subsectionid && u.parentid != 0).FirstOrDefault();

                            contentSubSections.Add(new ContentSubsection()
                            {
                                id = subsectionO.id,
                                title = subsectionO.title,
                                description = subsectionO.description,
                                mediaids = subsectionO.mediaids,
                                media = subsectionO.media
                            });

                        }

                        if (contentSubSections.Count() > 0)
                        {
                            foreach (ContentSubsection cs in contentSubSections)
                            {
                                List<Media> mediaSubSection;
                                mediaSubSection = new List<Media>();
                                if (cs.mediaids != null)
                                {
                                    dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                    for (var i = 0; i < mediaIds.Count; i++)
                                    {
                                        var mediaid = (int)mediaIds[i].id;
                                        var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();

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
                    }

                    if (contentSubSections.Count() > 0)
                    {
                        category.contentsubsection = contentSubSections;
                    }
                    else
                    {
                        category.contentsubsection = null;
                    }
                    return Ok(category);
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

        // POST: /Category
        [HttpPost]
        public ActionResult PostCategory(Category category)
        {
            Users user = (new SecurityHelper(this)).User;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                category.createdAt = category.updatedAt = DateTime.Now;
                category.createdBy = category.updatedBy = user.email;

                this.db.Add(category);
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(category);
        }

        /// <summary>
        /// Updates a detail object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        // PUT: /Category/5
        [HttpPut]
        [Route("{id}")]
        public ActionResult PutCategory(int id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Users user = (new SecurityHelper(this)).User;
                var oCategory = this.db.Category.Where(c => c.id == id).FirstOrDefault();
                oCategory.title = category.title;
                oCategory.description = category.description;
                oCategory.subsectionids = category.subsectionids;
                oCategory.meta = category.meta;
                oCategory.displayorder = category.displayorder;
                oCategory.followedby = category.followedby;
                oCategory.createdAt = category.createdAt;
                oCategory.createdBy = category.createdBy;
                oCategory.updatedAt = DateTime.Now;
                oCategory.updatedBy = user.email;

                this.db.Update(oCategory);
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return StatusCode((int)HttpStatusCode.NoContent);
        }

        // DELETE: /Category/5
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteCategory(int id)
        {
            SecurityHelper security = (new SecurityHelper(this));
            Category category = this.db.Category.Where(c => c.id == id).First();

            if (category == null)
            {
                return NotFound();
            }

            try
            {

                this.db.Category.Remove(category);
                this.db.SaveChanges();

                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: /Category/
        [HttpGet]
        [Route("getfollowedcategories")]
        public ActionResult GetFollowedCategory()
        {
            try
            {
                Users user = (new SecurityHelper(this)).User;
                var categories = this.db.Category.ToList();

                if (categories.Count() > 0)
                {
                    List<Category> followedCategories = new List<Category>();
                    foreach (Category c in categories)
                    {
                        if (c.followedby != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic userIds = JsonConvert.DeserializeObject<dynamic>(c.followedby, converter);
                            for (var i = 0; i < userIds.Count; i++)
                            {
                                var userid = userIds[i].userid == null || userIds[i].userid.Value == null ? 0 : (long)userIds[i].userid.Value;
                                if (user.id == userid)
                                {
                                    followedCategories.Add(new Category()
                                    {
                                        id = c.id,
                                        title = c.title,
                                        description = c.description,
                                        subsectionids = c.subsectionids,
                                        meta = c.meta,
                                        createdAt = c.createdAt,
                                        createdBy = c.createdBy,
                                        updatedAt = c.updatedAt,
                                        updatedBy = c.updatedBy,
                                        displayorder = c.displayorder,
                                        contentsubsection = c.contentsubsection,
                                        followedby = c.followedby
                                    });
                                }
                            }
                        }
                    }

                    foreach (Category fc in followedCategories)
                    {
                        List<ContentSubsection> contentSubSections;
                        contentSubSections = new List<ContentSubsection>();
                        if (fc.subsectionids != null)
                        {
                            var converter = new ExpandoObjectConverter();
                            dynamic subsectionIds = JsonConvert.DeserializeObject<dynamic>(fc.subsectionids, converter);
                            for (var i = 0; i < subsectionIds.Count; i++)
                            {
                                var subsectionid = (int)subsectionIds[i].id;
                                var subsectionO = this.db.Content.Where(u => u.id == subsectionid && u.parentid != 0).FirstOrDefault();

                                contentSubSections.Add(new ContentSubsection()
                                {
                                    id = subsectionO.id,
                                    title = subsectionO.title,
                                    description = subsectionO.description,
                                    mediaids = subsectionO.mediaids,
                                    media = subsectionO.media
                                });

                            }

                            if (contentSubSections.Count() > 0)
                            {
                                foreach (ContentSubsection cs in contentSubSections)
                                {
                                    List<Media> mediaSubSection;
                                    mediaSubSection = new List<Media>();
                                    if (cs.mediaids != null)
                                    {
                                        dynamic mediaIds = JsonConvert.DeserializeObject<dynamic>(cs.mediaids, converter);
                                        for (var i = 0; i < mediaIds.Count; i++)
                                        {
                                            var mediaid = (int)mediaIds[i].id;
                                            var mediaO = this.db.Media.Where(u => u.id == mediaid).FirstOrDefault();

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
                        }

                        if (contentSubSections.Count() > 0)
                        {
                            fc.contentsubsection = contentSubSections;
                        }
                        else
                        {
                            fc.contentsubsection = null;
                        }
                    }
                    return Ok(followedCategories);
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