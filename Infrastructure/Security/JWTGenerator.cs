using System;
using System.Collections.Generic;
using System.Security.Claims;
using Application.Interfaces;
using Domain;

namespace Infrastructure.Security
{
    public class JWTGenerator : IJWTGenerator
    {
        public string CreateToken(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}