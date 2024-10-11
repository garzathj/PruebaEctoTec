using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PruebaEctoTec.Server.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace PruebaEctoTec.Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private IConfiguration _config;
        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost, Route("Login")]
        public ActionResult Login([FromBody] LoginRequestDTO loginRequest)
        {
            if (loginRequest.Username == "admin" && loginRequest.Password == "1")
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTKey"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);
                return Ok(new AuthenticatedResponseDTO { Token = token });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
