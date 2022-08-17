// using System;
// using coreapi.Models;
// using System.Linq;
// using Microsoft.AspNetCore.Mvc;
// using coreapi.Models.Responses;

// namespace coreapi.Helpers
// {
//     public class UserHelper
//     {

//         private Context db;

//         public UserHelper(Context context)
//         {
//             this.db = context;
//         }

//         /// <summary>
//         /// Generates a JSON Web Token for the user explicitly passed as a parameter
//         /// </summary>
//         /// <param name="user">The User object</param>
//         /// <returns></returns>
//         public static Users CheckUser(AuthRequest authReq)
//         {
//             try
//             {
//                 var userO = this.db.Users.Where(u => u.email == authReq.email).FirstOrDefault();
//                 if (userO == null)
//                 {
//                     user.createdAt = new DateTime();
//                     user.updatedAt = new DateTime();
//                     user.createdBy = user.email;
//                     user.updatedBy = user.email;

//                     this.db.Add(user);
//                     this.db.SaveChanges();
//                 }
//                 else
//                 {
//                     userO.name = user.name;
//                     userO.meta = user.meta;
//                     this.db.Users.Update(userO);
//                     this.db.SaveChanges();
//                 }
//             }
//             catch (Exception)
//             {
//                 return null;
//             }

//             return Ok(user);
//         }

//     }
// }