using System;
using coreapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace coreapi.Helpers
{
    public class SecurityHelper
    {
        /// <summary>
        /// Private field to hold the current user
        /// </summary>
        private Users _currentUser;

        /// <summary>
        /// Get the current User.
        /// </summary>
        public Users User
        {
            get { return _currentUser; }
        }

        /// <summary>
        /// Returns the UserId from the current user object.
        /// </summary>
        /// <value>Integer UserId value</value>
        public long UserId
        {
            get { return _currentUser.id; }
        }

        /// <summary>
        /// Server's private key for encryption and decryption.
        /// </summary>
        const string serverKey = "1xDYc2972xDeY108HolyNombre108C8dQPOFdq";


        /// <summary>
        /// Security Helper is initialized with the API Controller as context so that the logged in user can be inferred.
        /// </summary>
        /// <param name="controller">Instance  of the calling API controller</param>
        public SecurityHelper(ControllerBase controller)
        {
            var context = controller.HttpContext;
            this._currentUser = context.Items.ContainsKey("User") ? (Users)context.Items["User"] : null;
            if (this._currentUser == null)
            {
                throw new Exception("Security Context initialized without a logged in user");
            }
        }



        /// <summary>
        /// Figures out if the user is an Admin
        /// </summary>
        /// <returns></returns>
        // public bool IsAdmin()
        // {
        //     return this.User.Role == "Admin";
        // }

        /// <summary>
        /// Generates a JSON Web Token for the user in the current security context
        /// </summary>
        /// <returns></returns>
        public string GenerateJsonWebToken()
        {
            return GenerateJsonWebToken(this.User);
        }

        /// <summary>
        /// Generates a JSON Web Token for the user explicitly passed as a parameter
        /// </summary>
        /// <param name="user">The User object</param>
        /// <returns></returns>
        public static string GenerateJsonWebToken(Users user)
        {
            return CryptoHelper.Encrypt(JsonConvert.SerializeObject(user), serverKey);
        }

        /// <summary>
        /// Converts the string token into a User object
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static Users GetUserFromToken(string token)
        {
            return JsonConvert.DeserializeObject<Users>(CryptoHelper.Decrypt(token, serverKey));
        }
    }
}
