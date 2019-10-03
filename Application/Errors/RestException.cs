using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        
        public RestException(HttpStatusCode statusCode, object errors = null)
        {
            Code = statusCode;
            Errors = errors;
        }

        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}